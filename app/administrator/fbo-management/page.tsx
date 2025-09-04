import PageRootContainer from "@/components/shared/PageRootContainer";
import FboManagementClient from "./FboManagementClient";

// TODO: Get FBO data from database
const getFBOData = async () => {
    return [
        {
            id: "271",
            icao: "KHPN",
            name: "Westchester",
            type: "Blackrock",
            loadDate: "Jan 1, 2024",
            loadBy: "-",
            inactive: false,
        },
        {
            id: "272",
            icao: "KPBI",
            name: "Palm Beach International Airport",
            type: "Carrier Global Corp",
            loadDate: "Jan 1, 2024",
            loadBy: "-",
            inactive: false,
        },
    ];
};

export default async function FboManagementPage() {
    const fboData = await getFBOData();

    return (
        <PageRootContainer
            title="FBO Management"
            subTitle="Add and manage Fixed Base Operators (FBOs). Active FBOs will be available for selection in the system."
        >
            <FboManagementClient initialData={fboData} />
        </PageRootContainer>
    );
}