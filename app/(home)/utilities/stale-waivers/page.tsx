import PageRootContainer from "@/components/shared/PageRootContainer";
import StaleWaiversClient from "./StaleWaiversClient";

// Mock data
const mockStaleData = [
  {
    confirmation: 12345,
    status: "Processing",
    processStep: "TSA Assigned",
    startDate: new Date(),
    lastUpdate: new Date(),
    assignedTo: "Jane Doe"
  },
  {
    confirmation: 12346,
    status: "Pending",
    processStep: "IAPWG Review",
    startDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    lastUpdate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    assignedTo: "John Smith"
  },
  {
    confirmation: 12347,
    status: "Ready",
    processStep: "Ready For FAA",
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    lastUpdate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    assignedTo: "Alice Johnson"
  },
  {
    confirmation: 12348,
    status: "Complete",
    processStep: "Ready for QA",
    startDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    lastUpdate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    assignedTo: "Bob Wilson"
  },
  {
    confirmation: 12349,
    status: "Processing",
    processStep: "TSA Assigned",
    startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    lastUpdate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    assignedTo: "Carol Martin"
  }
];

export default function DasspReport() {
  return (
    <PageRootContainer
      title="Stale Waivers"
      subTitle="View all waivers that have not been updated in 72 hours"
    >
      <StaleWaiversClient initialData={mockStaleData} />
    </PageRootContainer>
  );
}