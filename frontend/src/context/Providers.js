'use client';

import { AuthProvider } from "./AuthProvider";
import { ToastProvider } from "./ToastContext";

export function Providers({ children }) {
    return (
        <ToastProvider>
            <AuthProvider>
                {children}
            </AuthProvider>
        </ToastProvider>

    );
}