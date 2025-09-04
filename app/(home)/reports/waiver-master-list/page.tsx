import PageRootContainer from "@/components/shared/PageRootContainer";
import WaiverMasterListClient from "./WaiverMasterListClient";
import { waiverMasterListEntries } from "./sample-data";

export default function WaiverMasterList() {
    // TODO: Get data from DB, implement filters, download CSV functionality
    return (
        <PageRootContainer
            title="Waiver Master List"
            subTitle="View all aircraft listed on approved, active waivers with their authorization details"
        >
            <WaiverMasterListClient initialData={waiverMasterListEntries} />
        </PageRootContainer>
    );
}