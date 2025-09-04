import PageRootContainer from "@/components/shared/PageRootContainer";
import AnalystReportClient from "./AnalystReportClient";
import { AnalystReportData } from "./types";

// TODO: Get results from DB, update filters, download CSV

// Sample analysts for the demo
const analysts = [
  "All",
  "John Smith",
  "Jane Doe",
  "Robert Johnson",
  "Emily Brown",
  "Michael Wilson",
];

// Sample data to pass down to the client component
const generateSampleData = (): AnalystReportData => {
  const categories = [
    "DASSP",
    "Domestic",
    "International",
    "Sporting Event",
    "Unmanned Aircraft System",
  ];

  const createSection = (title: string, baseValue: number, internationalValue: number) => {
    const items = categories.map((cat) => ({
      label: cat,
      value: cat === "International" ? internationalValue : baseValue,
    }));
    return {
      title,
      total: items.reduce((sum, item) => sum + item.value, 0),
      items,
    };
  };

  const sections = [
    createSection("Certified", 15, 72),
    createSection("Determined", 12, 65),
    createSection("Vetted", 10, 45),
    createSection("QA", 8, 35),
    createSection("Rejected", 5, 20),
    createSection("Terminated", 2, 10),
    createSection("Voided", 1, 5),
    createSection("Completed", 17, 80),
  ];

  return {
    sections,
    analysts
  };
};

export default function AnalystReport() {
  //Remove sample data when ready
  const initialData = generateSampleData();

  return (
    <PageRootContainer
      title="Analyst Report"
      subTitle="View performance metrics and workload distribution across analysts"
    >
      <AnalystReportClient initialData={initialData} />
    </PageRootContainer>
  );
}