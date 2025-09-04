import PageRootContainer from "@/components/shared/PageRootContainer";
import FinishedWaiversClient from "./FinishedWaiversClient";
import { completedWaivers, users } from "../sample-data";

export default function FinishedWaivers() {
  //TODO: Get data from DB, filters, download CSV
  return (
    <PageRootContainer title="Finished Waivers" subTitle="View and manage completed, terminated, and voided waivers">
      <FinishedWaiversClient initialData={completedWaivers} users={users} />
    </PageRootContainer>
  );
}