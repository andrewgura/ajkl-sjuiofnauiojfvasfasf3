import PageRootContainer from "@/components/shared/PageRootContainer";
import FaaAttentionClient from "./FaaAttentionClient";
import { faaWaivers, users } from "../sample-data";

export default function Dashboard() {
  //TODO: Get data from DB, filters, download CSV
  return (
    <PageRootContainer title="FAA Attention" subTitle="Manage and process waivers requiring FAA attention">
      <FaaAttentionClient initialData={faaWaivers} users={users} />
    </PageRootContainer>
  );
}
