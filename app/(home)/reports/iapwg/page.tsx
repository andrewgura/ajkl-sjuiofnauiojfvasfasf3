import PageRootContainer from "@/components/shared/PageRootContainer";
import IapwgReportClient from "./IapwgReportClient";

// Mock data
const reportData = [
  {
    type: "ADO",
    description: "Static/Aerial Demonstration Operations",
    count: 8,
  },
  { type: "CSO", description: "Construction Support Operations", count: 1 },
  {
    type: "PAT7",
    description: "Pipeline/Utility Patrol Operations",
    count: 14,
  },
  { type: "PIC7", description: "Aerial Photography Operations", count: 104 },
  { type: "SVY", description: "Survey Operation", count: 1 },
  { type: "SVY7", description: "Survey Operations", count: 14 },
  {
    type: "UAS",
    description: "Default Unmanned Aircraft System waiver request",
    count: 452,
  },
  { type: "UAS-SVY", description: "Unmanned Survey", count: 47 },
  {
    type: "UAS-SVY7",
    description: "Unmanned Survey within 7NM of FRZ",
    count: 35,
  },
  {
    type: "UAS7",
    description: "Unmanned Aircraft System waiver request within 7NM of FRZ",
    count: 291,
  },
  { type: "UFR", description: "Unmanned First Responder", count: 23 },
  {
    type: "UFR7",
    description: "Unmanned First Responder within 7NM of FRZ",
    count: 2,
  },
];

export default function IapwgReport() {
  return (
    <PageRootContainer title="IAPWG Statistics Report" subTitle="View statistics for waiver operations">
      <IapwgReportClient initialData={reportData} />
    </PageRootContainer>
  );
}