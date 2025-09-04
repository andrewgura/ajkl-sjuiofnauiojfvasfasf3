import PageRootContainer from "@/components/shared/PageRootContainer";
import AapReportClient from "./AapReportClient";
import { AapReportData } from "./types";

// TODO: Get results from DB, update filters, download CSV

// Sample data
const generateSampleData = (): AapReportData => {
  const sections = [
    {
      title: "Certified",
      total: 133,
      items: [
        { label: "DASSP", value: 15 },
        { label: "Domestic", value: 13 },
        { label: "International", value: 72 },
        { label: "Sporting Event", value: 19 },
        { label: "Unmanned Aircraft System", value: 14 },
      ],
    },
    {
      title: "Determined",
      total: 151,
      items: [
        { label: "DASSP", value: 15 },
        { label: "Domestic", value: 20 },
        { label: "International", value: 77 },
        { label: "Sporting Event", value: 20 },
        { label: "Unmanned Aircraft System", value: 19 },
      ],
    },
    {
      title: "Rejected",
      total: 39,
      items: [
        { label: "DASSP", value: 3 },
        { label: "Domestic", value: 6 },
        { label: "International", value: 11 },
        { label: "Sporting Event", value: 7 },
        { label: "Unmanned Aircraft System", value: 12 },
      ],
    },
    {
      title: "Terminated",
      total: 19,
      items: [
        { label: "DASSP", value: 3 },
        { label: "Domestic", value: 2 },
        { label: "International", value: 13 },
        { label: "Sporting Event", value: 1 },
      ],
    },
    {
      title: "Vetted",
      total: 141,
      items: [
        { label: "DASSP", value: 15 },
        { label: "Domestic", value: 18 },
        { label: "International", value: 68 },
        { label: "Sporting Event", value: 21 },
        { label: "Unmanned Aircraft System", value: 19 },
      ],
    },
    {
      title: "Cancelled",
      total: 3,
      items: [{ label: "DASSP", value: 3 }],
    },
    {
      title: "IAPWG Review",
      total: 17,
      items: [
        { label: "Domestic", value: 3 },
        { label: "Unmanned Aircraft System", value: 14 },
      ],
    },
  ];

  return {
    sections,
  };
};

export default function AapReport() {
  const initialData = generateSampleData();

  return (
    <PageRootContainer
      title="AAP Report"
      subTitle="Current active Waiver Processing based on their statuses"
    >
      <AapReportClient initialData={initialData} />
    </PageRootContainer>
  );
}