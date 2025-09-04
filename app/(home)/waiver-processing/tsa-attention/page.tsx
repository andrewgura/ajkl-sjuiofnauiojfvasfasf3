import PageRootContainer from "@/components/shared/PageRootContainer";
import TsaAttentionClient from "./TsaAttentionClient";
import { sampleWaivers, users } from "../sample-data";

export default function TsaAttention() {
  return (
    <PageRootContainer
      title="TSA Attention"
      subTitle="Manage and process waivers requiring TSA attention"
    >
      <TsaAttentionClient initialData={sampleWaivers} users={users} />
    </PageRootContainer>
  );
}
