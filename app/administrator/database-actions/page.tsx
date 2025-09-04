'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';
import { deleteUserCompletely } from '@/lib/actions/admin-database/database-actions';

export default function DatabaseActionsPage() {
    const [userId, setUserId] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

    const handleDeleteUser = async () => {
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

    return (
        <div className="container mx-auto py-6 max-w-4xl">

            <div className="space-y-6">
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
                        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 flex items-start">
                            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
                            <div className="text-sm">
                                <strong className="text-yellow-800">Warning:</strong> This action is irreversible and will permanently delete all user data.
                            </div>
                        </div>

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