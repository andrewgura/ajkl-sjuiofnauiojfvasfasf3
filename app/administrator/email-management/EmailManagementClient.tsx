'use client';

import { useState, useTransition } from 'react';
import toast from 'react-hot-toast';
import TemplateItem from './components/TemplateItem';
import DistributionList from './components/DistributionList';
import ViewToggle from './components/ViewToggle';
import ContentHeader from './components/ContentHeader';
import TemplateVariablesSidebar from './components/TemplateVariablesSidebar';
import { DistributionListType, EmailTemplate } from '@/types/emails';
import {
    addEmailToList,
    removeEmailFromList,
    updateTemplate,
} from '@/lib/actions/email-management/email-actions';

interface EmailManagementClientProps {
    initialTemplates: EmailTemplate[];
    initialDistributionLists: DistributionListType[];
}

export default function EmailManagementClient({
    initialTemplates,
    initialDistributionLists
}: EmailManagementClientProps) {
    const [activeView, setActiveView] = useState<"templates" | "lists">("templates");
    const [expandedList, setExpandedList] = useState<string>("");
    const [isPending, startTransition] = useTransition();

    // State management
    const [templates, setTemplates] = useState<EmailTemplate[]>(initialTemplates);
    const [distributionLists, setDistributionLists] = useState<DistributionListType[]>(initialDistributionLists);

    /**
     * Handle adding an email to a distribution list
     */
    const handleAddEmailToList = async (listId: string, email: string) => {
        startTransition(async () => {
            try {
                // TODO: Get actual current user from auth context
                const userId = 'current_user';

                const result = await addEmailToList(listId, email, userId);

                if (result.success) {
                    // Update local state optimistically
                    setDistributionLists(prev => prev.map(list => {
                        if (list.id === listId) {
                            return {
                                ...list,
                                emails: [...list.emails, email.toLowerCase().trim()]
                            };
                        }
                        return list;
                    }));

                    toast.success('Email added successfully');
                } else {
                    toast.error(result.error?.message || 'Failed to add email');
                }
            } catch (error) {
                toast.error('An unexpected error occurred');
                console.error('Error adding email to list:', error);
            }
        });
    };

    /**
     * Handle removing an email from a distribution list
     */
    const handleRemoveEmailFromList = async (listId: string, email: string) => {
        startTransition(async () => {
            try {
                const result = await removeEmailFromList(listId, email);

                if (result.success) {
                    // Update local state optimistically
                    setDistributionLists(prev => prev.map(list => {
                        if (list.id === listId) {
                            return {
                                ...list,
                                emails: list.emails.filter(e => e !== email)
                            };
                        }
                        return list;
                    }));

                    toast.success('Email removed successfully');
                } else {
                    toast.error(result.error?.message || 'Failed to remove email');
                }
            } catch (error) {
                toast.error('An unexpected error occurred');
                console.error('Error removing email from list:', error);
            }
        });
    };

    /**
     * Handle updating an email template
     */
    const handleUpdateTemplate = async (
        templateId: string,
        updates: {
            title?: string;
            description?: string;
            content?: string;
        }
    ) => {
        startTransition(async () => {
            try {
                // TODO: Get actual current user from auth context
                const userId = 'current_user';

                const result = await updateTemplate(templateId, updates, userId);

                if (result.success) {
                    // Update local state optimistically
                    setTemplates(prev => prev.map(template => {
                        if (template.id === templateId) {
                            return {
                                ...template,
                                ...updates,
                                updatedBy: userId,
                                updatedDate: new Date()
                            };
                        }
                        return template;
                    }));

                    toast.success('Template updated successfully');
                } else {
                    toast.error(result.error?.message || 'Failed to update template');
                }
            } catch (error) {
                toast.error('An unexpected error occurred');
                console.error('Error updating template:', error);
            }
        });
    };

    return (
        <div className="grid gap-4 md:grid-cols-[1fr,250px]">
            {/* Main Content */}
            <div>
                {/* View Toggle */}
                <ViewToggle
                    activeView={activeView}
                    setActiveView={setActiveView}
                />

                {/* Content Area */}
                <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
                    <ContentHeader
                        activeView={activeView}
                    />

                    {activeView === "templates" ? (
                        <div className="divide-y divide-slate-100">
                            {templates.map((template) => (
                                <div key={template.id} className="px-4">
                                    <TemplateItem
                                        id={template.id}
                                        title={template.title}
                                        description={template.description}
                                        content={template.content}
                                        onUpdate={handleUpdateTemplate}
                                        isLoading={isPending}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div>
                            {distributionLists.map((list) => (
                                <DistributionList
                                    key={list.id || list.title}
                                    title={list.title}
                                    emails={list.emails}
                                    isExpanded={expandedList === list.title}
                                    onToggle={() =>
                                        setExpandedList(
                                            expandedList === list.title ? "" : list.title
                                        )
                                    }
                                    onAddEmail={(email) => handleAddEmailToList(list.id || '', email)}
                                    onRemoveEmail={(email) => handleRemoveEmailFromList(list.id || '', email)}
                                    isLoading={isPending}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Sidebar */}
            <TemplateVariablesSidebar
                isVisible={activeView === "templates"}
            />
        </div>
    );
}