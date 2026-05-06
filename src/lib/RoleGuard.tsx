"use client";

import { useUser, UserRole } from "@/lib/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface RoleGuardProps {
    allow: UserRole;
    redirectTo?: string;
    children: React.ReactNode;
}

/**
 * Redirects others to `redirectTo` (defaults to "/").
 */
export function RoleGuard({ allow, redirectTo = "/", children }: RoleGuardProps) {
    const { role, isLoading } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && role && role !== allow) {
            router.replace(redirectTo);
        }
    }, [isLoading, role, allow, redirectTo, router]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full w-full">
                <div className="w-6 h-6 border-2 border-zinc-700 border-t-[#a3e635] rounded-full animate-spin" />
            </div>
        );
    }

    if (role !== allow) {
        return null;
    }

    return <>{children}</>;
}
