"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { WaiverTable } from "./WaiverTable";
import Pagination from "@/components/shared/Pagination";

interface WaiverRequest {
    id: number;
    confirmation: string;
    type: string;
    status: string;
    waiverId: string;
    applicationDate: string;
    archived?: boolean;
    // Add all other possible properties used in filtering
    [key: string]: any;
}

interface ResultsSectionProps {
    requests: WaiverRequest[];
    filterValues: Record<string, any>;
}

// Check if a text value matches a filter (case-insensitive contains)
const matchesTextFilter = (
    requestValue: any,
    filterValue: string | null | undefined
): boolean => {
    // If filter is not set, everything matches
    if (!filterValue || filterValue.trim() === '') {
        return true;
    }

    // If request doesn't have this property, it doesn't match
    if (requestValue === undefined || requestValue === null) {
        return false;
    }

    // For string filters - case insensitive contains
    return requestValue.toString().toLowerCase().includes(filterValue.toLowerCase());
};

// Check if a value is in an array of selected values
const matchesArrayFilter = (
    requestValue: any,
    filterValue: string[] | null | undefined
): boolean => {
    // If filter is not set, everything matches
    if (!filterValue || filterValue.length === 0) {
        return true;
    }

    // If request doesn't have this property, it doesn't match
    if (requestValue === undefined || requestValue === null) {
        return false;
    }

    // For array filters (multi-select dropdowns)
    return filterValue.includes(requestValue);
};

// Check if a date is within a range
const matchesDateFilter = (
    dateStr: string,
    startDate: Date | null | undefined,
    endDate: Date | null | undefined
): boolean => {
    if ((!startDate && !endDate) || !dateStr) {
        return true;
    }

    try {
        const date = new Date(dateStr);

        // Check if date is after start date (if set)
        if (startDate && date < startDate) {
            return false;
        }

        // Check if date is before end date (if set)
        if (endDate) {
            const endOfDay = new Date(endDate);
            endOfDay.setHours(23, 59, 59, 999);

            if (date > endOfDay) {
                return false;
            }
        }

        return true;
    } catch (e) {
        return false;
    }
};

const FILTER_MAPPINGS = {
    // Simple text-based filters (string contains)
    textFilters: [
        { requestField: "confirmation", filterField: "confirmationNumber" },
        { requestField: "waiverId", filterField: "waiverAuthNumber" },
        { requestField: "comments", filterField: "comments" },
        // DASSP filters
        { requestField: "dsspCompanyName", filterField: "dsspCompanyName" },
        { requestField: "dsspOperatorNumber", filterField: "dsspOperatorNumber" },
        { requestField: "dsspSecurityCoordinator", filterField: "dsspSecurityCoordinator" },
        // Disney filters
        { requestField: "disneyDeparturePoint", filterField: "disneyDeparturePoint" },
        { requestField: "disneyFinalDestination", filterField: "disneyFinalDestination" },
        // Domestic filters
        { requestField: "domesticRadialDistance", filterField: "domesticRadialDistance" },
        { requestField: "domesticFrzAirportDestinations", filterField: "domesticFrzAirportDestinations" },
        { requestField: "domesticFrzOverflights", filterField: "domesticFrzOverflights" },
        // FAA filters
        { requestField: "faaAirportDeparture", filterField: "faaAirportDeparture" },
        { requestField: "faaIntermediateStops", filterField: "faaIntermediateStops" },
        { requestField: "faaAirportArrival", filterField: "faaAirportArrival" },
        // International filters
        { requestField: "intlDeparturePoint", filterField: "intlDeparturePoint" },
        { requestField: "intlDestinationPoint", filterField: "intlDestinationPoint" },
        { requestField: "intlIntermediateStops", filterField: "intlIntermediateStops" },
        { requestField: "intlFinalDestination", filterField: "intlFinalDestination" },
        { requestField: "intlDestinationName", filterField: "intlDestinationName" },
        // Moored Balloon filters
        { requestField: "balloonRadialDistance", filterField: "balloonRadialDistance" },
        { requestField: "balloonFrzAirportDestinations", filterField: "balloonFrzAirportDestinations" },
        { requestField: "balloonFrzOverflights", filterField: "balloonFrzOverflights" },
        // Prohibited Area filters
        { requestField: "prohibitedAirportDeparture", filterField: "prohibitedAirportDeparture" },
        { requestField: "prohibitedIntermediateStops", filterField: "prohibitedIntermediateStops" },
        { requestField: "prohibitedAirportArrival", filterField: "prohibitedAirportArrival" },
        // Special Event filters
        { requestField: "eventDepartureSlot", filterField: "eventDepartureSlot" },
        { requestField: "eventDepartureCode", filterField: "eventDepartureCode" },
        { requestField: "eventArrivalSlot", filterField: "eventArrivalSlot" },
        { requestField: "eventArrivalCode", filterField: "eventArrivalCode" },
        { requestField: "eventAerialDescription", filterField: "eventAerialDescription" },
        // Sporting filters
        { requestField: "sportingCity", filterField: "sportingCity" },
        { requestField: "sportingOtherVenue", filterField: "sportingOtherVenue" },
        { requestField: "sportingFlightAltitude", filterField: "sportingFlightAltitude" },
        // Unmanned Aircraft filters
        { requestField: "unmannedStreet", filterField: "unmannedStreet" },
        { requestField: "unmannedCity", filterField: "unmannedCity" },
        { requestField: "unmannedZip", filterField: "unmannedZip" },
        { requestField: "unmannedRadialDistance", filterField: "unmannedRadialDistance" },
        { requestField: "unmannedFlightAltitude", filterField: "unmannedFlightAltitude" },
        { requestField: "unmannedCoordinates", filterField: "unmannedCoordinates" },
        // Aircraft Information filters
        { requestField: "aircraftTailNumber", filterField: "aircraftTailNumber" },
        { requestField: "aircraftCallSign", filterField: "aircraftCallSign" },
        { requestField: "aircraftType", filterField: "aircraftType" },
        { requestField: "aircraftGrossWeight", filterField: "aircraftGrossWeight" },
        // Aircraft UAS Information filters
        { requestField: "uasRegistration", filterField: "uasRegistration" },
        { requestField: "uasCallSign", filterField: "uasCallSign" },
        { requestField: "uasType", filterField: "uasType" },
        { requestField: "uasMakeModel", filterField: "uasMakeModel" },
        { requestField: "uasCraftId", filterField: "uasCraftId" },
        { requestField: "uasTransmitterId", filterField: "uasTransmitterId" },
        { requestField: "uasGrossWeight", filterField: "uasGrossWeight" },
        { requestField: "uasRemoteId", filterField: "uasRemoteId" },
        // Manifest Information filters
        { requestField: "manifestFirstName", filterField: "manifestFirstName" },
        { requestField: "manifestMiddleName", filterField: "manifestMiddleName" },
        { requestField: "manifestLastName", filterField: "manifestLastName" },
        // Proponent Information filters
        { requestField: "proponentFirstName", filterField: "proponentFirstName" },
        { requestField: "proponentMiddleName", filterField: "proponentMiddleName" },
        { requestField: "proponentLastName", filterField: "proponentLastName" },
        { requestField: "proponentCompany", filterField: "proponentCompany" },
        { requestField: "proponentStreet", filterField: "proponentStreet" },
        { requestField: "proponentCity", filterField: "proponentCity" },
        { requestField: "proponentZipCode", filterField: "proponentZipCode" },
        { requestField: "proponentPhone", filterField: "proponentPhone" },
        { requestField: "proponentEmail", filterField: "proponentEmail" }
    ],

    // Multi-select / array-based filters (exact match)
    arrayFilters: [
        { requestField: "type", filterField: "waiverTypes" },
        { requestField: "status", filterField: "waiverStatuses" },
        // DASSP filters
        { requestField: "dsspWaiverSubtype", filterField: "dsspWaiverSubtypes" },
        { requestField: "dsspAirport", filterField: "dsspAirports" },
        { requestField: "dsspFbo", filterField: "dsspFbos" },
        // Disney filters
        { requestField: "disneyThemePark", filterField: "disneyThemeParks" },
        // Domestic filters
        { requestField: "domesticWaiverSubtype", filterField: "domesticWaiverSubtypes" },
        // FAA filters
        { requestField: "faaWaiverSubtype", filterField: "faaWaiverSubtypes" },
        // International filters
        { requestField: "intlWaiverSubtype", filterField: "intlWaiverSubtypes" },
        { requestField: "intlDestinationState", filterField: "intlDestinationStates" },
        { requestField: "intlDestinationCountry", filterField: "intlDestinationCountries" },
        // Prohibited Area filters
        { requestField: "prohibitedWaiverSubtype", filterField: "prohibitedWaiverSubtypes" },
        // Special Event filters
        { requestField: "eventOperationType", filterField: "eventOperationTypes" },
        { requestField: "eventDepartureGateway", filterField: "eventDepartureGateways" },
        // Sporting filters
        { requestField: "sportingWaiverSubtype", filterField: "sportingWaiverSubtypes" },
        { requestField: "sportingVenueState", filterField: "sportingVenueStates" },
        { requestField: "sportingType", filterField: "sportingTypes" },
        { requestField: "sportingVenue", filterField: "sportingVenues" },
        // Unmanned Aircraft filters
        { requestField: "unmannedWaiverSubtype", filterField: "unmannedWaiverSubtypes" },
        { requestField: "unmannedState", filterField: "unmannedStates" },
        // Aircraft Information filters
        { requestField: "aircraftRegistrationCountry", filterField: "aircraftRegistrationCountries" },
        // Manifest Information filters
        { requestField: "manifestPersonType", filterField: "manifestPersonTypes" },
        { requestField: "manifestGender", filterField: "manifestGenders" },
        // Proponent Information filters
        { requestField: "proponentTitle", filterField: "proponentTitles" },
        { requestField: "proponentState", filterField: "proponentStates" },
        { requestField: "proponentCountry", filterField: "proponentCountries" }
    ],

    // Date range filters
    dateFilters: [
        { requestField: "applicationDate", startFilterField: "startDate", endFilterField: "endDate" }
    ]
};

const ResultsSection: React.FC<ResultsSectionProps> = ({
    requests,
    filterValues
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    const filteredRequests = useMemo(() => {
        if (!requests || !requests.length) return [];

        return requests.filter(request => {
            // Special case for keyword search (checks across all fields)
            if (filterValues.keyword) {
                const keyword = filterValues.keyword.toLowerCase();
                const matchesKeyword = Object.values(request).some(
                    value => value && typeof value === 'string' && value.toLowerCase().includes(keyword)
                );

                if (!matchesKeyword) return false;
            }

            // Process text-based filter mappings
            for (const mapping of FILTER_MAPPINGS.textFilters) {
                if (!matchesTextFilter(request[mapping.requestField], filterValues[mapping.filterField])) {
                    return false;
                }
            }

            // Process array-based filter mappings
            for (const mapping of FILTER_MAPPINGS.arrayFilters) {
                if (!matchesArrayFilter(request[mapping.requestField], filterValues[mapping.filterField])) {
                    return false;
                }
            }

            // Process date range filters
            for (const mapping of FILTER_MAPPINGS.dateFilters) {
                if (!matchesDateFilter(
                    request[mapping.requestField],
                    filterValues[mapping.startFilterField],
                    filterValues[mapping.endFilterField]
                )) {
                    return false;
                }
            }

            return true;
        });
    }, [requests, filterValues]);

    // Calculate pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedRequests = filteredRequests.slice(startIndex, startIndex + itemsPerPage);

    // Reset to first page when filters change
    React.useEffect(() => {
        setCurrentPage(1);
    }, [filterValues]);

    return (
        <div className="flex-1">
            <Card className="h-full flex flex-col">
                <CardContent className="p-6 flex-1 flex flex-col">
                    <div className="mb-4 text-sm text-gray-500">
                        Found {filteredRequests.length} matching requests
                    </div>

                    {filteredRequests.length > 0 ? (
                        <>
                            <div className="flex-1">
                                <WaiverTable requests={paginatedRequests} />
                            </div>
                            <div className="mt-4">
                                <Pagination
                                    currentPage={currentPage}
                                    totalItems={filteredRequests.length}
                                    itemsPerPage={itemsPerPage}
                                    onPageChange={setCurrentPage}
                                />
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center p-8">
                            <div className="text-center text-gray-500">
                                <p className="text-lg font-medium mb-2">No matching waivers found</p>
                                <p className="text-sm">Try adjusting your filters or clearing them to see more results</p>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default ResultsSection;