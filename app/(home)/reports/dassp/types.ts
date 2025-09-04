export interface DasspItem {
    confirmation: number;
    waiverId: string;
    gatewayAirport: string;
    gatewayFBO: string;
    gatewayDepartureDate: Date;
    gatewayDepartureTime: string;
    aircraftOperator: string;
    aircraftType: string;
    tailNumber: string;
    callSign: string;
    numPassengers: number;
    kdcaArrivalDate: Date;
    kdcaArrivalTime: string;
    kdcaDepartureDate: Date;
    kdcaDepartureTime: string;
    destinationAirport: string;
    contactPerson: string;
    contactPhone: string;
    pilotLastName: string;
}