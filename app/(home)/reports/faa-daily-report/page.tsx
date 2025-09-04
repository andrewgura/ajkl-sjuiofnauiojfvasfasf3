import PageRootContainer from "@/components/shared/PageRootContainer";
import FaaDailyClient from "./FaaDailyClient";

export default function FaaDaily() {

  return (
    <PageRootContainer title="FAA Daily Report">
      <FaaDailyClient initialData={[] as any} />
    </PageRootContainer>
  );
}