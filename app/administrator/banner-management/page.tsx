import PageRootContainer from "@/components/shared/PageRootContainer";
import BannerManagementClient from "./BannerManagementClient";

export default async function BannerManagementPage() {
    // TODO: Get current banner settings from DB

    return (
        <PageRootContainer
            title="Banner Management"
            subTitle="Configure the login page banner settings and message"
        >
            <BannerManagementClient />
        </PageRootContainer>
    );
}