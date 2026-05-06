"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";

export type UserRole = "creator" | "brand";

export interface User {
    id: string;
    name: string;
    displayName: string;
    role: UserRole;
    badge: string;
    initials: string;
}

const MOCK_USERS: Record<UserRole, User> = {
    creator: { id: "u1", name: "Kai_Zen", displayName: "Kai_Zen", role: "creator", badge: "CREATOR_PRO", initials: "KZ" },
    brand: { id: "u2", name: "Kai_Zen", displayName: "Kai_Zen", role: "brand", badge: "BRAND_ADMIN", initials: "KZ" },
};

interface UserContextValue {
    user: User | null;
    role: UserRole | null;
    isBrand: boolean;
    isCreator: boolean;
    isLoading: boolean;
    login: (role: UserRole) => void;
    logout: () => void;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

const STORAGE_KEY = "creonity_user_role";

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    // Load user from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored && (stored === "creator" || stored === "brand")) {
            setUser(MOCK_USERS[stored as UserRole]);
        }
        setIsLoading(false);
    }, []);

    // Redirect to login if no user and not already on login page
    useEffect(() => {
        if (!isLoading && !user && pathname !== "/login") {
            router.push("/login");
        }
    }, [isLoading, user, pathname, router]);

    const login = useCallback((role: UserRole) => {
        localStorage.setItem(STORAGE_KEY, role);
        setUser(MOCK_USERS[role]);
        router.push("/");
    }, [router]);

    const logout = useCallback(() => {
        localStorage.removeItem(STORAGE_KEY);
        setUser(null);
        router.push("/login");
    }, [router]);

    return (
        <UserContext.Provider
            value={{
                user,
                role: user?.role ?? null,
                isBrand: user?.role === "brand",
                isCreator: user?.role === "creator",
                isLoading,
                login,
                logout,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const ctx = useContext(UserContext);
    if (!ctx) throw new Error("useUser must be used within UserProvider");
    return ctx;
}
