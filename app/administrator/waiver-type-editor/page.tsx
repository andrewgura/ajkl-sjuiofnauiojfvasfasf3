import PageRootContainer from "@/components/shared/PageRootContainer";
import WaiverTypeEditor from "./WaiverTypeEditor";

//TODO: Get WaiverType and contents to pass into WaiverTypeEditor


export default function WaiverTypeEditorPage() {
    return (
        <PageRootContainer title="Waiver Type Editor">
            <WaiverTypeEditor />
        </PageRootContainer>
    );
}