
import { fetchWaiverMetadata } from "@/lib/actions/waiver-paragraphs/waiver-actions";
import { WaiverManagementClient } from "./WaiverManagementClient";
import ErrorState from "./components/ErrorState";

export default async function WaiverParagraphEditorPage() {
    const metadataResult = await fetchWaiverMetadata();

    // DB errors
    if (metadataResult.error) {
        return <ErrorState error={metadataResult.error} />;
    }


    return (
        <WaiverManagementClient
            allWaiverData={{
                filterCategories: metadataResult.filterCategories,
                isLoading: false
            }}
        />
    );
}