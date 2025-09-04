import PageRootContainer from "@/components/shared/PageRootContainer";
import { UserManagementClient } from './UserManagementClient';
import { getUsersWithFilters } from '@/lib/actions/user-management/user-management-actions';

export default async function UserManagementPage() {

    const usersResult = await getUsersWithFilters({});

    // Errors
    if (!usersResult.success) {
        console.log(usersResult)
        return (
            <PageRootContainer title="User Management">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">
                                Error Loading Users
                            </h3>
                            <div className="mt-2 text-sm text-red-700">
                                <p>{usersResult.error}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </PageRootContainer>
        );
    }

    return (
        <PageRootContainer title="User Management">
            <UserManagementClient
                initialUsers={usersResult.users}
                initialTotal={usersResult.total}
            />
        </PageRootContainer>
    );
}