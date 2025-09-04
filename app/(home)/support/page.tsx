import PageRootContainer from "@/components/shared/PageRootContainer";
import { SupportClient } from './SupportClient';
import { fetchAllSupportFiles } from '@/lib/actions/support-files/support-files-actions';
import ErrorState from '@/app/administrator/waiver-paragraph-editor/components/ErrorState';

export default async function Support() {
  const supportFilesData = await fetchAllSupportFiles();

  // Server Error page
  if (supportFilesData.error) {
    return (
      <PageRootContainer title="Support Resources">
        <ErrorState error={supportFilesData.error} />
      </PageRootContainer>
    );
  }

  const initialResources = supportFilesData.files.map(file => ({
    id: file.id,
    title: file.title,
    filename: file.fileUrl || '',
    description: file.description,
    size: file.fileSize,
    uploadDate: file.createdDate.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).replace(',', ''),
    fileType: file.fileType,
    visible: file.visible,
    groups: file.groups
  }));

  return (
    <PageRootContainer title="Support Resources" subTitle="View resources to help you navigate around the platform.">
      <SupportClient initialResources={initialResources} />
    </PageRootContainer>
  );
}