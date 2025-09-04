import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './providers'
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Airspace Access Program',
    description: 'TSA/FAA Waiver & Airspace Access Program',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <AuthProvider>
                    {children}
                </AuthProvider>
                {/* Toast Notifications - Available throughout admin section */}
                <Toaster
                    position="bottom-right"
                    reverseOrder={false}
                    gutter={8}
                    containerClassName=""
                    containerStyle={{}}
                    toastOptions={{
                        // Define default options
                        className: '',
                        duration: 3000,
                        style: {
                            background: '#fff',
                            color: '#363636',
                            fontSize: '14px',
                            border: '1px solid #e2e8f0',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                        },
                        // Default options for specific types
                        success: {
                            duration: 3000,
                            style: {
                                background: '#f0fdf4',
                                border: '1px solid #bbf7d0',
                                color: '#166534',
                            },
                            iconTheme: {
                                primary: '#22c55e',
                                secondary: '#f0fdf4',
                            },
                        },
                        error: {
                            duration: 4000,
                            style: {
                                background: '#fef2f2',
                                border: '1px solid #fecaca',
                                color: '#dc2626',
                            },
                            iconTheme: {
                                primary: '#ef4444',
                                secondary: '#fef2f2',
                            },
                        },
                    }}
                />
            </body>
        </html>
    );
}