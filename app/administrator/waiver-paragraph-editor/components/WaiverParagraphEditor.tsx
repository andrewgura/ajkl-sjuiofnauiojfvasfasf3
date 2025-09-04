"use client"

import React, { useState, useTransition, useCallback } from 'react';
import toast from 'react-hot-toast';
import FilterSidebar from './FilterSidebar';
import ParagraphListPanel from './ParagraphListPanel';
import ParagraphForm from './ParagraphForm';
import { fetchParagraphsForCategory, saveParagraphChanges } from '@/lib/actions/waiver-paragraphs/waiver-actions';
import { filterParagraphsForSet, findParagraphForEdit } from '@/lib/actions/waiver-paragraphs/waiver-client-utils';
import { FilterCategory, ParagraphSet, Paragraph, ParagraphEditState, FilterSubCategory } from '@/lib/actions/waiver-paragraphs/waiver-types';

interface OptimizedWaiverData {
    filterCategories: FilterCategory[];
}

interface WaiverParagraphEditorProps {
    allWaiverData: OptimizedWaiverData;
}

export const WaiverParagraphEditor: React.FC<WaiverParagraphEditorProps> = ({
    allWaiverData
}) => {
    // Filter and panel state
    const [filterCategories, setFilterCategories] = useState<FilterCategory[]>(
        JSON.parse(JSON.stringify(allWaiverData.filterCategories))
    );
    const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
    const [isPending, startTransition] = useTransition();
    const [isLoadingCategory, setIsLoadingCategory] = useState(false);

    // Cache for loaded paragraph content
    const [paragraphCache, setParagraphCache] = useState<Map<string, any[]>>(new Map());

    // Active filter state
    const [activeCategoryFilters, setActiveCategoryFilters] = useState<string[]>(
        filterCategories
            .filter(category => category.selected)
            .map(category => category.id)
    );
    const [activeSubcategoryFilter, setActiveSubcategoryFilter] = useState<string>('');
    const [activeWaiverType, setActiveWaiverType] = useState<string>('');
    const [activeSubType, setActiveSubType] = useState<string>('');
    const [activeDistance, setActiveDistance] = useState<string>('');

    const [activeSet, setActiveSet] = useState<ParagraphSet>({
        id: '',
        title: 'Select a category to view paragraphs',
        paragraphs: []
    });
    const [selectedParagraph, setSelectedParagraph] = useState<Paragraph>();

    // Editing state
    const [editingParagraph, setEditingParagraph] = useState<ParagraphEditState>({
        id: '',
        type: '',
        subtype: '',
        distance: '---',
        notice: '---',
        startTag: '',
        endTag: '',
        text: ''
    });

    // Helper functions
    const parseSubcategoryId = (subcategoryId: string, parentId: string) => {
        // Map UI subcategory IDs back to database values
        const waiverType = filterCategories.find(cat => cat.id === parentId)?.label || '';
        const subCategory = filterCategories
            .find(cat => cat.id === parentId)?.items
            .find(item => item.id === subcategoryId);

        let subType = subCategory?.label || '';
        let distance = '';

        if (subType.toLowerCase() === 'denial') {
            return { waiverType, subType: 'Denial', distance: '' };
        }

        // Extract distance info if present in the label
        if (subType.includes('(Inside 7NM)')) {
            distance = 'Inside 7NM';
            subType = subType.replace(' (Inside 7NM)', '');
        } else if (subType.includes('(Outside 7NM)')) {
            distance = 'Outside 7NM';
            subType = subType.replace(' (Outside 7NM)', '');
        }

        return { waiverType, subType, distance };
    };

    // Create cache key for category
    const getCacheKey = (waiverType: string, subType: string, distance?: string) => {
        return `${waiverType}|${subType}|${distance || 'none'}`;
    };

    // Load category content with caching
    const loadCategoryContent = useCallback(async (waiverType: string, subType: string, distance?: string): Promise<any[]> => {
        const cacheKey = getCacheKey(waiverType, subType, distance);

        // Check cache first
        if (paragraphCache.has(cacheKey)) {
            const cachedData = paragraphCache.get(cacheKey);
            return cachedData || [];
        }

        setIsLoadingCategory(true);

        try {
            const result = await fetchParagraphsForCategory(waiverType, subType, distance);

            if (result.error) {
                toast.error('Failed to load paragraph content');
                return [];
            }

            const paragraphs = result.paragraphs || [];

            // Cache the result
            setParagraphCache(prev => {
                const newCache = new Map(prev);
                newCache.set(cacheKey, paragraphs);
                return newCache;
            });

            return paragraphs;
        } catch (error) {
            toast.error('Error loading paragraph content');
            return [];
        } finally {
            setIsLoadingCategory(false);
        }
    }, [paragraphCache]);

    // Event handlers
    const handleCategoryToggle = (categoryId: string): void => {
        setExpandedCategories(prev =>
            prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    const handleFilterToggle = (categoryId: string, isSubcategory: boolean = false, parentId: string | null = null): void => {
        if (!isSubcategory) {
            setActiveCategoryFilters(prev =>
                prev.includes(categoryId)
                    ? prev.filter(id => id !== categoryId)
                    : [...prev, categoryId]
            );

            setFilterCategories(prev => {
                const newCategories = [...prev];
                const category = newCategories.find(c => c.id === categoryId);
                if (category) {
                    category.selected = !category.selected;
                }
                return newCategories;
            });
        }
    };

    const handleSubcategorySelect = async (subcategoryId: string, parentId: string): Promise<void> => {
        setActiveSubcategoryFilter(subcategoryId);

        // Parse the selection to get database values
        const { waiverType, subType, distance } = parseSubcategoryId(subcategoryId, parentId);

        setActiveWaiverType(waiverType);
        setActiveSubType(subType);
        setActiveDistance(distance);

        setFilterCategories(prev => {
            const newCategories = JSON.parse(JSON.stringify(prev));

            // Deselect all subcategories
            newCategories.forEach((category: FilterCategory) => {
                category.items.forEach((item: FilterSubCategory) => {
                    item.selected = false;
                });
            });

            // Select the clicked subcategory
            const parentCategory = newCategories.find((c: FilterCategory) => c.id === parentId);
            if (parentCategory) {
                const subItem = parentCategory.items.find((item: FilterSubCategory) => item.id === subcategoryId);
                if (subItem) {
                    subItem.selected = true;
                }
            }

            return newCategories;
        });

        // Load category content (with caching)
        const paragraphData = await loadCategoryContent(waiverType, subType, distance);

        // Filter paragraphs client-side using loaded data
        const paragraphSet = filterParagraphsForSet(
            paragraphData,
            waiverType,
            subType,
            distance
        );

        setActiveSet(paragraphSet);

        if (paragraphSet.paragraphs.length > 0) {
            const firstParagraph = paragraphSet.paragraphs[0];
            setSelectedParagraph(firstParagraph);

            // Get paragraph data for editing
            const editData = findParagraphForEdit(
                paragraphData,
                waiverType,
                subType,
                firstParagraph.number,
                distance
            );

            if (editData) {
                setEditingParagraph(editData);
            }
        } else {
            setSelectedParagraph(undefined);
            setEditingParagraph({
                id: '',
                type: waiverType,
                subtype: subType,
                distance: distance || '---',
                notice: '---',
                startTag: '',
                endTag: '',
                text: ''
            });
        }
    };

    const handleParagraphSelect = (paragraph: Paragraph): void => {
        setSelectedParagraph(paragraph);

        const cacheKey = getCacheKey(activeWaiverType, activeSubType, activeDistance);
        const paragraphData = paragraphCache.get(cacheKey) || [];

        const editData = findParagraphForEdit(
            paragraphData,
            activeWaiverType,
            activeSubType,
            paragraph.number,
            activeDistance
        );

        if (editData) {
            setEditingParagraph(editData);
        }
    };

    const handleSaveUpdates = (): void => {
        startTransition(async () => {
            try {
                const result = await saveParagraphChanges(editingParagraph);

                if (result.success) {
                    toast.success('Paragraph saved successfully!');

                    // Update cache with new data
                    const cacheKey = getCacheKey(activeWaiverType, activeSubType, activeDistance);
                    const cachedData = paragraphCache.get(cacheKey);
                    if (cachedData && Array.isArray(cachedData)) {
                        const updatedData = cachedData.map(p => {
                            if (p.ID.toString() === editingParagraph.id) {
                                return {
                                    ...p,
                                    WAIVERTYPE: editingParagraph.type,
                                    SUBTYPE: editingParagraph.subtype,
                                    DISTANCE: editingParagraph.distance === '---' ? null : editingParagraph.distance,
                                    NOTICE: editingParagraph.notice === '---' ? null : editingParagraph.notice,
                                    STARTTAG: editingParagraph.startTag || null,
                                    ENDTAG: editingParagraph.endTag || null,
                                    TEXT: editingParagraph.text
                                };
                            }
                            return p;
                        });

                        setParagraphCache(prev => new Map(prev).set(cacheKey, updatedData));

                        // Refresh the current paragraph set
                        const updatedSet = filterParagraphsForSet(
                            updatedData,
                            activeWaiverType,
                            activeSubType,
                            activeDistance
                        );
                        setActiveSet(updatedSet);
                    }
                } else {
                    toast.error(result.error?.message || 'Failed to save paragraph. Please try again.');
                }
            } catch (error) {
                toast.error('An error occurred while saving. Please try again.');
            }
        });
    };

    const handleResetChanges = (): void => {
        if (selectedParagraph) {
            const cacheKey = getCacheKey(activeWaiverType, activeSubType, activeDistance);
            const paragraphData = paragraphCache.get(cacheKey) || [];

            const editData = findParagraphForEdit(
                paragraphData,
                activeWaiverType,
                activeSubType,
                selectedParagraph.number,
                activeDistance
            );

            if (editData) {
                setEditingParagraph(editData);
            }
        }
    };

    const handleParagraphChange = (field: string, value: string): void => {
        setEditingParagraph(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <div className="w-full max-w-7xl mx-auto h-[70vh] flex overflow-hidden">
            {/* Left Sidebar: Filter Categories */}
            <div className="w-56 flex-shrink-0 relative">
                <FilterSidebar
                    filterCategories={filterCategories}
                    expandedCategories={expandedCategories}
                    activeCategoryFilters={activeCategoryFilters}
                    activeSubcategoryFilter={activeSubcategoryFilter}
                    onCategoryToggle={handleCategoryToggle}
                    onFilterToggle={handleFilterToggle}
                    onSubcategorySelect={handleSubcategorySelect}
                />

                {/* Loading Overlay for Sidebar */}
                {isLoadingCategory && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 rounded-lg">
                        <div className="bg-white rounded-lg p-3 flex flex-col items-center space-y-2 shadow-lg">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                            <div className="text-center">
                                <div className="text-sm font-medium text-gray-900">Loading...</div>
                                <div className="text-xs text-gray-500">
                                    {activeWaiverType} / {activeSubType}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Right Main Area: Split Top/Bottom */}
            <div className="flex-1 flex flex-col overflow-hidden ml-2 space-y-2">
                {/* Top: Paragraph List */}
                <div className="h-32 flex-shrink-0">
                    <ParagraphListPanel
                        paragraphSet={activeSet}
                        selectedParagraph={selectedParagraph || null}
                        onParagraphSelect={handleParagraphSelect}
                    />
                </div>

                {/* Bottom: Edit Form */}
                <div className="flex-1 min-h-0 overflow-hidden">
                    <ParagraphForm
                        editingParagraph={editingParagraph}
                        onParagraphChange={handleParagraphChange}
                        onSaveChanges={handleSaveUpdates}
                        onResetChanges={handleResetChanges}
                    />
                </div>
            </div>
        </div>
    );
};