import PageRootContainer from "@/components/shared/PageRootContainer";
import DasspReportClient from "./DasspReportClient";

// TODO: Get Dassp data items

export default function DasspReport() {
  return (
    <PageRootContainer
      title="DASSP Report"
      subTitle="View active and upcoming DASSP waivers including canceled waivers"
    >
      <DasspReportClient initialData={[]} />
    </PageRootContainer>
  );
}