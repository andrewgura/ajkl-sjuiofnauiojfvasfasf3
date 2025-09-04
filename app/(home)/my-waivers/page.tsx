import PageRootContainer from "@/components/shared/PageRootContainer";
import MyWaiversClient from "./MyWaiversClient";
import { lazyGetWaivers } from "@/lib/actions/waiver/waiver-actions";
import { WaiverRequest } from "./types";

// TODO: Get results from DB, archive functionality, download CSV functionality

export default async function MyWaivers() {
  const userId = 'TODO-update this after authentication is in place';
  const activeRequests = (await lazyGetWaivers(userId)).waivers ?? [];
  const archivedRequests: WaiverRequest[] = [];
  // console.log('>>>>>> activeRequests', activeRequests);
  const requests = {
    activeRequests,
    archivedRequests
  }

  return (
    <PageRootContainer
      title="My Waivers"
      subTitle="View and manage your waiver requests and their current status"
    >
      <MyWaiversClient requests={requests} />
    </PageRootContainer>
  );
}