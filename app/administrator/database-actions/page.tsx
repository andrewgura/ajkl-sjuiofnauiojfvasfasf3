'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { autoVerifyAccount, deleteUserCompletely } from '@/lib/actions/admin-database/database-actions';



export default function DatabaseActionsPage() {
    // Delete User State
    const [userId, setUserId] = useState<string>('');
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

    // Verify Account State
    const [verifyUserId, setVerifyUserId] = useState<string>('');
    const [isVerifying, setIsVerifying] = useState<boolean>(false);
    const [verifyMessage, setVerifyMessage] = useState<string>('');
    const [verifyMessageType, setVerifyMessageType] = useState<'success' | 'error' | ''>('');

    const handleDeleteUser = async (): Promise<void> => {
        if (!userId.trim()) {
            setMessage('Please enter a User ID');
            setMessageType('error');
            return;
        }

        if (!confirm(`Are you sure you want to PERMANENTLY DELETE user ${userId}? This action cannot be undone and will delete all associated data.`)) {
            return;
        }

        setIsDeleting(true);
        setMessage('');
        setMessageType('');

        try {
            const result = await deleteUserCompletely(userId.trim());

            if (result.success) {
                setMessage(result.message || 'User deleted successfully');
                setMessageType('success');
                setUserId('');
            } else {
                setMessage(result.error || 'Failed to delete user');
                setMessageType('error');
            }
        } catch (error) {
            setMessage('An unexpected error occurred');
            setMessageType('error');
            console.error('Delete user error:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    const handleVerifyAccount = async (): Promise<void> => {
        if (!verifyUserId.trim()) {
            setVerifyMessage('Please enter a User ID');
            setVerifyMessageType('error');
            return;
        }

        if (!confirm(`Are you sure you want to auto-verify the account for user ${verifyUserId}?`)) {
            return;
        }

        setIsVerifying(true);
        setVerifyMessage('');
        setVerifyMessageType('');

        try {
            const result = await autoVerifyAccount(verifyUserId.trim());

            if (result.success) {
                setVerifyMessage(result.message || 'Account verified successfully');
                setVerifyMessageType('success');
                setVerifyUserId('');
            } else {
                setVerifyMessage(result.error || 'Failed to verify account');
                setVerifyMessageType('error');
            }
        } catch (error) {
            setVerifyMessage('An unexpected error occurred');
            setVerifyMessageType('error');
            console.error('Verify account error:', error);
        } finally {
            setIsVerifying(false);
        }
    };

    return (
        <div className="container mx-auto py-6 max-w-4xl">
            <div className="space-y-6">
                {/* Auto Verify Account Card */}
                <Card className="border-green-200">
                    <CardHeader>
                        <CardTitle className="flex items-center text-green-700">
                            Auto Verify Account
                        </CardTitle>
                        <CardDescription>
                            Automatically verify a user's email address and activate their account.
                            This will set ACCOUNT_ACTIVE to 1 and mark all verification tokens as used.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">

                        <div className="flex items-end gap-3">
                            <div className="flex-1">
                                <label htmlFor="verifyUserId" className="block text-sm font-medium text-gray-700 mb-1">
                                    User ID
                                </label>
                                <Input
                                    id="verifyUserId"
                                    type="text"
                                    placeholder="Enter User ID (UUID)"
                                    value={verifyUserId}
                                    onChange={(e) => setVerifyUserId(e.target.value)}
                                    disabled={isVerifying}
                                    className="font-mono text-sm"
                                />
                            </div>
                            <Button
                                onClick={handleVerifyAccount}
                                disabled={isVerifying || !verifyUserId.trim()}
                                className="px-6 bg-green-600 hover:bg-green-700"
                            >
                                {isVerifying ? 'Verifying...' : 'Verify Account'}
                            </Button>
                        </div>

                        {verifyMessage && (
                            <div className={`p-3 rounded-md text-sm ${verifyMessageType === 'success'
                                ? 'bg-green-50 text-green-700 border border-green-200'
                                : 'bg-red-50 text-red-700 border border-red-200'
                                }`}>
                                {verifyMessage}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Delete User Card */}
                <Card className="border-red-200">
                    <CardHeader>
                        <CardTitle className="flex items-center text-red-700">
                            Delete User
                        </CardTitle>
                        <CardDescription>
                            Permanently delete a user and all associated records from the database.
                            This will delete data from ACCOUNTS, PROFILE_ROLES, PASSWORD_RESET_TOKENS, WAIVER_DATA, and more tables.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">

                        <div className="flex items-end gap-3">
                            <div className="flex-1">
                                <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">
                                    User ID
                                </label>
                                <Input
                                    id="userId"
                                    type="text"
                                    placeholder="Enter User ID (UUID)"
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                    disabled={isDeleting}
                                    className="font-mono text-sm"
                                />
                            </div>
                            <Button
                                onClick={handleDeleteUser}
                                disabled={isDeleting || !userId.trim()}
                                variant="destructive"
                                className="px-6"
                            >
                                {isDeleting ? 'Deleting...' : 'Delete User'}
                            </Button>
                        </div>

                        {message && (
                            <div className={`p-3 rounded-md text-sm ${messageType === 'success'
                                ? 'bg-green-50 text-green-700 border border-green-200'
                                : 'bg-red-50 text-red-700 border border-red-200'
                                }`}>
                                {message}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}