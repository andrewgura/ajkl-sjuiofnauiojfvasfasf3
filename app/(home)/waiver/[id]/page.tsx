import PageRootContainer from "@/components/shared/PageRootContainer";
import { WaiverContainer } from "./waiver-container";
import { getWaiverWithProcessData } from "@/lib/actions/waiver/waiver-actions";
import { WaiverData } from "@/lib/actions/waiver/waiver-types";
import { WaiverType } from "@/types/waivers";
import NotFound from "./not-found";

type PageParams = { id: string };
type SearchParams = { type: string | undefined };

export default async function WaiverPage({
  params,
  searchParams
}: {
  params: Promise<PageParams>;
  searchParams: Promise<SearchParams>;
}) {
  const { id } = await params;
  const waiverId = String(id); // TODO: need to  use waiver confirmation as the id instead of waiverId. This is the way current AAP works.

  let waiver: WaiverData | null = null;
  let process = null;
  let error = null;

  if (waiverId === 'new') {
    const { type } = await searchParams;
    const waiverType = (decodeURIComponent(type ?? '')) as WaiverType;
    waiver = {
      waiverType,
      status: 'DRAFT'
    }
  } else {//if (waiverId !== 'new') {// TODO: check if waiverId follows a waiverId pattern
    const result = await getWaiverWithProcessData(waiverId);
    waiver = result.waiver;
    if (!waiver?.confirmation) {
      return <NotFound />
    }
    process = result.process;
    error = result.error;
    if (error) {
      console.error('Database error:', error);
      throw new Error(`Failed to load waiver: ${error.message}`);
      // TODO: implement a retry button, and/or suggest creating a new waiver for public users
    }
  }

  const currentProcessStep = waiver?.processingStep || 'PROCESSING'; // TODO: fix this. this can be null if the waiver is new or still in the draft mode

  return (
    <PageRootContainer>
      <WaiverContainer
        id={waiverId}
        currentProcessStep={currentProcessStep}
        waiver={waiver}
        process={process}
      />
    </PageRootContainer>
  );
}