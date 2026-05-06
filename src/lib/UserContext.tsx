"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";

export type UserRole = "creator" | "brand";

export interface User {
    id: string;
    name: string;
    displayName: string;
    email: string;
    role: UserRole;
    badge: string;
    initials: string;
    
    // Shared Profile
    location?: string;
    bio?: string;
    avatar?: string;
    
    // Creator Specific
    niches?: string[];
    contentTypes?: string[];
    socialLinks?: { platform: string; connected: boolean; url?: string }[];
    baseRate?: string;
    servicesOffered?: string[];
    portfolioUrl?: string;

    // Brand Specific
    industry?: string;
    website?: string;
    primaryGoal?: string;
    targetDemographics?: { ageRange?: string[]; geographies?: string[] };
    targetCreatorNiches?: string[];
    budgetRange?: string;
    expectedActivations?: string;
}

const DEFAULT_USERS: Record<string, User> = {
    "creator@creonity.com": { id: "u1", name: "Kai_Zen", displayName: "Kai_Zen", email: "creator@creonity.com", role: "creator", badge: "CREATOR_PRO", initials: "KZ" },
    "brand@creonity.com": { id: "u2", name: "Acme Corp", displayName: "Acme Corp", email: "brand@creonity.com", role: "brand", badge: "BRAND_ADMIN", initials: "AC" },
};

interface UserContextValue {
    user: User | null;
    role: UserRole | null;
    isBrand: boolean;
    isCreator: boolean;
    isLoading: boolean;
    login: (email: string, password?: string) => Promise<void>;
    logout: () => void;
    completeOnboarding: (userData: User) => Promise<void>;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

const STORAGE_KEY = "creonity_user_session";

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    // Load user from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                const parsedUser = JSON.parse(stored);
                setUser(parsedUser);
            } catch (e) {
                localStorage.removeItem(STORAGE_KEY);
            }
        }
        setIsLoading(false);
    }, []);

    // Redirect to login if no user and not already on an auth page
    useEffect(() => {
        const isAuthPage = pathname === "/login" || pathname === "/register" || pathname === "/onboarding";
        if (!isLoading && !user && !isAuthPage) {
            router.push("/login");
        } else if (!isLoading && user && isAuthPage) {
            router.push("/");
        }
    }, [isLoading, user, pathname, router]);

    const login = useCallback(async (email: string, password?: string) => {
        setIsLoading(true);
        // Simulate network request
        await new Promise((resolve) => setTimeout(resolve, 800));
        
        let foundUser = DEFAULT_USERS[email];
        
        // For default mock users, enforce a specific password for realistic testing
        if (foundUser && password !== "Test1234!") {
            setIsLoading(false);
            throw new Error("Invalid credentials");
        }
        
        // If not found in defaults, check if they registered
        if (!foundUser) {
            const registeredUsersStr = localStorage.getItem("creonity_registered_users");
            if (registeredUsersStr) {
                const registeredUsers = JSON.parse(registeredUsersStr);
                foundUser = registeredUsers[email];
                // Note: We aren't securely checking passwords for registered mock users in this frontend mock,
                // but any entered password will bypass to success if the email exists.
            }
        }

        if (foundUser) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(foundUser));
            setUser(foundUser);
            setIsLoading(false);
            router.push("/");
        } else {
            setIsLoading(false);
            throw new Error("Invalid credentials");
        }
    }, [router]);

    const logout = useCallback(() => {
        localStorage.removeItem(STORAGE_KEY);
        setUser(null);
        // Use a hard redirect to ensure the layout unmounts completely and Next.js clears any cached route states
        window.location.href = "/login";
    }, []);

    const completeOnboarding = useCallback(async (userData: User) => {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // Save to mock DB
        const existingStr = localStorage.getItem("creonity_registered_users");
        const existing = existingStr ? JSON.parse(existingStr) : {};
        existing[userData.email] = userData;
        localStorage.setItem("creonity_registered_users", JSON.stringify(existing));

        // Log them in
        localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
        setUser(userData);
        setIsLoading(false);
        router.push("/");
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
                completeOnboarding,
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
