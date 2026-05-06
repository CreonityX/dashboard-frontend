"use client";

import { UserProvider } from "@/lib/UserContext";

export function ClientProviders({ children }: { children: React.ReactNode }) {
    return <UserProvider>{children}</UserProvider>;
}
