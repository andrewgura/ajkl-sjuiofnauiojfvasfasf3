import PageRootContainer from '@/components/shared/PageRootContainer';
import EmailManagementClient from './EmailManagementClient';
import { fetchEmailManagementData } from '@/lib/actions/email-management/email-actions';
import ErrorState from '../waiver-paragraph-editor/components/ErrorState';

export default async function EmailManagementPage() {
    const emailData = await fetchEmailManagementData();

    // Server Error page
    if (emailData.error) {
        return (
            <PageRootContainer
                title="Email Management"
                subTitle="Manage email templates and distribution lists for system notifications"
            >
                <ErrorState error={emailData.error} />
            </PageRootContainer>
        );
    }

    return (
        <PageRootContainer
            title="Email Management"
            subTitle="Manage email templates and distribution lists for system notifications"
        >
            <EmailManagementClient
                initialTemplates={emailData.templates}
                initialDistributionLists={emailData.distributionLists}
            />
        </PageRootContainer>
    );
}