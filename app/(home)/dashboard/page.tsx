import PageRootContainer from "@/components/shared/PageRootContainer";
import DashboardClient from "./DashboardClient";
import { AssignedWaiver, RecentActivityItem } from "./types";

const currentItems: RecentActivityItem[] = [
  {
    id: 123456,
    confirmation: "-",
    status: "ACCEPTED",
    applicationDate: "12-12-2024 15:00",
    waiverId: "-",
    type: "DASSP",
  },
  {
    id: 123457,
    confirmation: "-",
    status: "PROCESSING",
    applicationDate: "12-12-2024 14:00",
    waiverId: "-",
    type: "Disney",
  },
  {
    id: 123458,
    confirmation: "-",
    status: "PROCESSING",
    applicationDate: "12-12-2024 13:00",
    waiverId: "-",
    type: "Domestic",
  },
];

const unassignedData: AssignedWaiver[] = [
  {
    id: "2025-ABCDE-001",
    status: "QA",
    confirmation: "123456",
    company: "Skyway Airlines",
    createdAt: "2024-01-15",
    startDate: "2024-02-01",
    endDate: "2024-03-01",
  },
  {
    id: "2025-ABCD-001",
    status: "QA",
    confirmation: "123456",
    company: "Skyway Airlines",
    createdAt: "2024-01-15",
    startDate: "2024-02-01",
    endDate: "2024-03-01",
  },
  {
    id: "2025-ABCDE-002",
    status: "Determination",
    confirmation: "123457",
    company: "AeroTech Inc",
    createdAt: "2024-01-16",
    startDate: "2024-02-15",
    endDate: "2024-03-15",
  },
];

export default function Dashboard() {
  return (
    <PageRootContainer title="Dashboard">
      <DashboardClient recentActivity={[]} assignedWaivers={[]} isInternal={true} />
    </PageRootContainer>
  );
}