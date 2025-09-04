"use client";

import React, { useState } from "react";
import { CircleX, RotateCcw, Download } from "lucide-react";
import FiltersSidebar from "./FiltersSidebar";
import ResultsSection from "./ResultsSection";
import { Button } from "@/components/ui/button";

interface FilterValues {
    // General
    keyword: string;
    startDate: Date | null;
    endDate: Date | null;
    waiverTypes: string[];
    waiverStatuses: string[];
    waiverAuthNumber: string;
    confirmationNumber: string;
    comments: string;

    // DASSP criteria
    dsspWaiverSubtypes: string[];
    dsspAirports: string[];
    dsspCompanyName: string;
    dsspOperatorNumber: string;
    dsspSecurityCoordinator: string;
    dsspFbos: string[];

    // Disney criteria
    disneyThemeParks: string[];
    disneyDeparturePoint: string;
    disneyFinalDestination: string;

    // Domestic criteria
    domesticWaiverSubtypes: string[];
    domesticRadialDistance: string;
    domesticFrzAirportDestinations: string;
    domesticFrzOverflights: string;

    // FAA criteria
    faaWaiverSubtypes: string[];
    faaAirportDeparture: string;
    faaIntermediateStops: string;
    faaAirportArrival: string;

    // International criteria
    intlWaiverSubtypes: string[];
    intlDeparturePoint: string;
    intlDestinationPoint: string;
    intlIntermediateStops: string;
    intlFinalDestination: string;
    intlDestinationName: string;
    intlDestinationStates: string[];
    intlDestinationCountries: string[];

    // Moored Balloon criteria
    balloonRadialDistance: string;
    balloonFrzAirportDestinations: string;
    balloonFrzOverflights: string;

    // Prohibited Area criteria
    prohibitedWaiverSubtypes: string[];
    prohibitedAirportDeparture: string;
    prohibitedIntermediateStops: string;
    prohibitedAirportArrival: string;

    // Special Event criteria
    eventOperationTypes: string[];
    eventDepartureGateways: string[];
    eventDepartureSlot: string;
    eventDepartureCode: string;
    eventArrivalSlot: string;
    eventArrivalCode: string;
    eventAerialDescription: string;

    // Sporting criteria
    sportingWaiverSubtypes: string[];
    sportingVenueStates: string[];
    sportingCity: string;
    sportingTypes: string[];
    sportingVenues: string[];
    sportingOtherVenue: string;
    sportingFlightAltitude: string;

    // Unmanned Aircraft criteria
    unmannedWaiverSubtypes: string[];
    unmannedStreet: string;
    unmannedCity: string;
    unmannedStates: string[];
    unmannedZip: string;
    unmannedRadialDistance: string;
    unmannedFlightAltitude: string;
    unmannedCoordinates: string;

    // Aircraft information
    aircraftTailNumber: string;
    aircraftCallSign: string;
    aircraftType: string;
    aircraftRegistrationCountries: string[];
    aircraftGrossWeight: string;

    // Aircraft (UAS) information
    uasRegistration: string;
    uasCallSign: string;
    uasType: string;
    uasMakeModel: string;
    uasCraftId: string;
    uasTransmitterId: string;
    uasGrossWeight: string;
    uasRemoteId: string;

    // Manifest information
    manifestPersonTypes: string[];
    manifestFirstName: string;
    manifestMiddleName: string;
    manifestLastName: string;
    manifestGenders: string[];

    // Proponent information
    proponentTitles: string[];
    proponentFirstName: string;
    proponentMiddleName: string;
    proponentLastName: string;
    proponentCompany: string;
    proponentStreet: string;
    proponentCity: string;
    proponentState: string[];
    proponentZipCode: string;
    proponentCountries: string[];
    proponentPhone: string;
    proponentEmail: string;

    [key: string]: string | string[] | Date | null;
}

const SearchContent = () => {
    // State for expandable sections
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
        general: false,
        dassp: false,
        disney: false,
        domestic: false,
        faa: false,
        international: false,
        mooredBalloon: false,
        prohibitedArea: false,
        specialEvent: false,
        sporting: false,
        unmannedAircraft: false,
        aircraftInfo: false,
        aircraftUAS: false,
        manifest: false,
        proponent: false,
    });

    // Default filter values
    const defaultFilterValues: FilterValues = {
        // General
        keyword: "",
        startDate: null,
        endDate: null,
        waiverTypes: [],
        waiverStatuses: [],
        waiverAuthNumber: "",
        confirmationNumber: "",
        comments: "",

        // DASSP criteria
        dsspWaiverSubtypes: [],
        dsspAirports: [],
        dsspCompanyName: "",
        dsspOperatorNumber: "",
        dsspSecurityCoordinator: "",
        dsspFbos: [],

        // Disney criteria
        disneyThemeParks: [],
        disneyDeparturePoint: "",
        disneyFinalDestination: "",

        // Domestic criteria
        domesticWaiverSubtypes: [],
        domesticRadialDistance: "",
        domesticFrzAirportDestinations: "",
        domesticFrzOverflights: "",

        // FAA criteria
        faaWaiverSubtypes: [],
        faaAirportDeparture: "",
        faaIntermediateStops: "",
        faaAirportArrival: "",

        // International criteria
        intlWaiverSubtypes: [],
        intlDeparturePoint: "",
        intlDestinationPoint: "",
        intlIntermediateStops: "",
        intlFinalDestination: "",
        intlDestinationName: "",
        intlDestinationStates: [],
        intlDestinationCountries: [],

        // Moored Balloon criteria
        balloonRadialDistance: "",
        balloonFrzAirportDestinations: "",
        balloonFrzOverflights: "",

        // Prohibited Area criteria
        prohibitedWaiverSubtypes: [],
        prohibitedAirportDeparture: "",
        prohibitedIntermediateStops: "",
        prohibitedAirportArrival: "",

        // Special Event criteria
        eventOperationTypes: [],
        eventDepartureGateways: [],
        eventDepartureSlot: "",
        eventDepartureCode: "",
        eventArrivalSlot: "",
        eventArrivalCode: "",
        eventAerialDescription: "",

        // Sporting criteria
        sportingWaiverSubtypes: [],
        sportingVenueStates: [],
        sportingCity: "",
        sportingTypes: [],
        sportingVenues: [],
        sportingOtherVenue: "",
        sportingFlightAltitude: "",

        // Unmanned Aircraft criteria
        unmannedWaiverSubtypes: [],
        unmannedStreet: "",
        unmannedCity: "",
        unmannedStates: [],
        unmannedZip: "",
        unmannedRadialDistance: "",
        unmannedFlightAltitude: "",
        unmannedCoordinates: "",

        // Aircraft information
        aircraftTailNumber: "",
        aircraftCallSign: "",
        aircraftType: "",
        aircraftRegistrationCountries: [],
        aircraftGrossWeight: "",

        // Aircraft (UAS) information
        uasRegistration: "",
        uasCallSign: "",
        uasType: "",
        uasMakeModel: "",
        uasCraftId: "",
        uasTransmitterId: "",
        uasGrossWeight: "",
        uasRemoteId: "",

        // Manifest information
        manifestPersonTypes: [],
        manifestFirstName: "",
        manifestMiddleName: "",
        manifestLastName: "",
        manifestGenders: [],

        // Proponent information
        proponentTitles: [],
        proponentFirstName: "",
        proponentMiddleName: "",
        proponentLastName: "",
        proponentCompany: "",
        proponentStreet: "",
        proponentCity: "",
        proponentState: [],
        proponentZipCode: "",
        proponentCountries: [],
        proponentPhone: "",
        proponentEmail: "",
    };

    const [filterValues, setFilterValues] = useState<FilterValues>(defaultFilterValues);
    const [filtersApplied, setFiltersApplied] = useState(false);

    const toggleSection = (section: string): void => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    // Handle input change
    const handleInputChange = (field: string, value: any): void => {
        setFilterValues((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // Reset all filters
    const clearAllFilters = (): void => {
        setFilterValues(defaultFilterValues);
        setFiltersApplied(false);
    };

    // Apply filters
    const applyFilters = (): void => {
        console.log("Applying filters:", filterValues);
        setFiltersApplied(true);
    };

    // Handle CSV download
    const handleDownloadCsv = (): void => {
        console.log("Downloading CSV of filtered results");
    };

    return (
        <>
            <div className="flex items-center justify-end space-x-4 mb-6">
                <Button
                    variant="outline"
                    className="flex items-center justify-center h-10"
                    onClick={handleDownloadCsv}
                >
                    <Download className="w-4 h-4 mr-2" />
                    Download CSV
                </Button>
                <Button
                    variant="outline"
                    className="flex items-center justify-center h-10 border-red-600 text-red-600 hover:bg-red-50 hover:text-red-700"
                    onClick={clearAllFilters}
                >
                    <CircleX className="w-4 h-4 mr-2" />
                    Clear all filters
                </Button>
                <Button
                    className="flex items-center justify-center h-10 bg-blue-600 text-white hover:bg-blue-700"
                    onClick={applyFilters}
                >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Update results
                </Button>
            </div>

            {/* Main content with filters and results */}
            <div className="flex gap-6">
                {/* Filters sidebar */}
                <FiltersSidebar
                    expandedSections={expandedSections}
                    filterValues={filterValues}
                    toggleSection={toggleSection}
                    handleInputChange={handleInputChange}
                />

                {/* Results section */}
                <ResultsSection
                    requests={[]}
                    filterValues={filtersApplied ? filterValues : {}}
                />
            </div>
        </>
    );
};

export default SearchContent;