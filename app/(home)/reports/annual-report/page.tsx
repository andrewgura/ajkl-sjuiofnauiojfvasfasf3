import PageRootContainer from "@/components/shared/PageRootContainer";
import AnnualReportClient from "./AnnualReportClient";
import { TeamMember, WaiverData } from "@/types/report-types";

export default function AnnualReport() {

  const initialData = {
    teamMembers: [] as TeamMember[],
    waiverData: {} as WaiverData
  };

  return (
    <PageRootContainer title="Annual Report">
      <AnnualReportClient initialData={initialData} />
    </PageRootContainer>
  );
}