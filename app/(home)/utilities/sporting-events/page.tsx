import PageRootContainer from "@/components/shared/PageRootContainer";
import SportEventPurposes from "./SportEventPurposes";
import { fetchAllPurposes } from '@/lib/actions/sporting-events/sporting-events-actions';
import ErrorState from '@/app/administrator/waiver-paragraph-editor/components/ErrorState';

export default async function SportingEvents() {
  const purposeData = await fetchAllPurposes();

  // Server Error page
  if (purposeData.error) {
    return (
      <PageRootContainer title="Sporting Events">
        <ErrorState error={purposeData.error} />
      </PageRootContainer>
    );
  }

  return (
    <PageRootContainer
      title="Sporting Events"
      subTitle="Add and manage purposes for sporting events. Active purposes will be available for selection when creating new events."
    >
      <SportEventPurposes initialPurposes={purposeData.purposes} />
    </PageRootContainer>
  );
}