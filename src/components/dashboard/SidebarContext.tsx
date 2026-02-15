"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface SidebarContextType {
    isCollapsed: boolean;
    toggleSidebar: () => void;
    isMobileOpen: boolean;
    toggleMobileSidebar: () => void;
    closeMobileSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const toggleSidebar = () => setIsCollapsed(!isCollapsed);
    const toggleMobileSidebar = () => setIsMobileOpen(!isMobileOpen);
    const closeMobileSidebar = () => setIsMobileOpen(false);

    return (
        <SidebarContext.Provider value={{
            isCollapsed,
            toggleSidebar,
            isMobileOpen,
            toggleMobileSidebar,
            closeMobileSidebar
        }}>
            {children}
        </SidebarContext.Provider>
    );
}

export function useSidebar() {
    const context = useContext(SidebarContext);
    if (context === undefined) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
}
