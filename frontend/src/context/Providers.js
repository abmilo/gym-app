'use client';

import { AuthProvider } from "./AuthProvider";

export function Providers({ children }) {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
}