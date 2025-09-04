import PageRootContainer from '@/components/shared/PageRootContainer';
import { getUserSettings } from '@/lib/actions/settings/settings-actions';
import { redirect } from 'next/navigation';
import { SettingsContainer } from './SettingsClient';

export default async function SettingsPage() {
    const result = await getUserSettings();

    if (!result.success) {
        if (result.error === "Not authenticated") {
            redirect('/login');
        }
    }

    return (
        <PageRootContainer
            title="Account Settings"
            subTitle="Manage your account information and preferences"
        >
            <SettingsContainer
                initialData={result.data}
                initialError={result.error}
            />
        </PageRootContainer>
    );
}