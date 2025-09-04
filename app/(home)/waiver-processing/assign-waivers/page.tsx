import { Metadata } from "next";
import AssignWaiversClient from "./AssignWaiversClient";
import { sampleWaivers } from "../sample-data";
import PageRootContainer from "@/components/shared/PageRootContainer";

export const metadata: Metadata = {
  title: "Waiver Assignments",
  description: "Assign waivers to analysts for processing",
};

export default async function AssignWaiversPage() {
  // TODO: Get data from DB, handle filters, download CSV, Assign functionality
  const waivers = sampleWaivers;

  return (
    <PageRootContainer
      title="Waiver Assignments"
      subTitle="Assign waiver requests to analysts for processing and track progress"
    >
      <AssignWaiversClient initialData={waivers} />
    </PageRootContainer>
  );
}