import PageRootContainer from "@/components/shared/PageRootContainer";
import GroupNotificationsClient from "./GroupNotificationsClient";
import { fetchAllGroups } from '@/lib/actions/group-notifications/group-actions';
import ErrorState from '@/app/administrator/waiver-paragraph-editor/components/ErrorState';

export default async function Page() {
  const groupData = await fetchAllGroups();

  // Server Error page
  if (groupData.error) {
    return (
      <PageRootContainer title="Group Notifications">
        <ErrorState error={groupData.error} />
      </PageRootContainer>
    );
  }

  return (
    <PageRootContainer title="Group Notifications" subTitle="Organize team members into notification groups for targeted communications">
      <GroupNotificationsClient initialGroups={groupData.groups} />
    </PageRootContainer>
  );
}