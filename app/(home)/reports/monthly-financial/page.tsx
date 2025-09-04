import PageRootContainer from "@/components/shared/PageRootContainer";
import MonthlyFinancialClient from "./MonthlyFinancialClient";
import { MonthlyFinancialItem } from "./types";

// TODO: Get data from database and replace with actual data
const generateSampleData = (): MonthlyFinancialItem[] => {
    return [
        {
            confirmation: "110408",
            status: "PROCESSING",
            startDate: new Date(),
            peopleInManifest: 13,
            aircraft: 1,
            deptGateway: "KBDL",
            company: "Test Comp"
        },
        {

            confirmation: "110391",
            status: "APPROVED",
            startDate: new Date(),
            peopleInManifest: 10,
            aircraft: 1,
            deptGateway: "KBUR",
            company: "Test Comp"
        },
        {

            confirmation: "110389",
            status: "TERMINATED",
            startDate: new Date(),
            peopleInManifest: 10,
            aircraft: 1,
            deptGateway: "KBUR",
            company: "Test Comp"
        },
        {

            confirmation: "110350",
            status: "APPROVED",
            startDate: new Date(),
            peopleInManifest: 8,
            aircraft: 1,
            deptGateway: "KDCA",
            company: "Test Comp"
        },
        {

            confirmation: "110351",
            status: "PROCESSING",
            startDate: new Date(),
            peopleInManifest: 15,
            aircraft: 2,
            deptGateway: "KIAD",
            company: "Test Comp"
        },
        {
            confirmation: "110352",
            status: "CANCELLED",
            startDate: new Date(),
            peopleInManifest: 6,
            aircraft: 1,
            deptGateway: "KBWI",
            company: "Test Comp"
        },
        {

            confirmation: "110353",
            status: "PENDING",
            startDate: new Date(),
            peopleInManifest: 12,
            aircraft: 1,
            deptGateway: "KPHL",
            company: "Test Comp"
        },
        {

            confirmation: "110354",
            status: "APPROVED",
            startDate: new Date(),
            peopleInManifest: 7,
            aircraft: 1,
            deptGateway: "KJFK",
            company: "Test Comp"
        },
        {

            confirmation: "110355",
            status: "PROCESSING",
            startDate: new Date(),
            peopleInManifest: 9,
            aircraft: 1,
            deptGateway: "KLGA",
            company: "Test Comp"
        },
        {

            confirmation: "110356",
            status: "APPROVED",
            startDate: new Date(),
            peopleInManifest: 14,
            aircraft: 2,
            deptGateway: "KEWR",
            company: "Test Comp"
        }
    ];
};

export default function MonthlyFinancial() {
    const initialData = generateSampleData();

    return (
        <PageRootContainer
            title="Monthly Financial"
            subTitle="Generate monthly financial reports for TSA waiver processing and DASSP operations"
        >
            <MonthlyFinancialClient initialData={initialData} />
        </PageRootContainer>
    );
}