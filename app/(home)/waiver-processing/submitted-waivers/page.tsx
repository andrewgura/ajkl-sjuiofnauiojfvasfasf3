import PageRootContainer from "@/components/shared/PageRootContainer";
import { submittedWaivers, users } from "../sample-data";
import SubmittedWaiversClient from "./SubmittedWaiversClient";

export default function SubmittedWaivers() {
  //TODO: Get data from DB, filters, download CSV
  return (
    <PageRootContainer title="Submitted Waivers" subTitle="View and manage submitted waivers and their current status">
      <SubmittedWaiversClient initialData={submittedWaivers} users={users} />
    </PageRootContainer>
  );
}
