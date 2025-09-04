import PageRootContainer from "@/components/shared/PageRootContainer";
import AsoReportClient from "./AsoReportClient";

// TODO: Get data items to pass to AsoReportClient

export default function AsoReport() {
  return (
    <PageRootContainer
      title="ASO Report"
      subTitle="View and manage ASO credentials and assignments"
    >
      <AsoReportClient initialData={[]} />
    </PageRootContainer>
  );
}