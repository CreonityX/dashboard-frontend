"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface KineticContainerProps {
    children: ReactNode;
    className?: string;
    intensity?: "subtle" | "medium" | "high";
    onClick?: () => void;
}

export function KineticContainer({ children, className, intensity = "medium", onClick }: KineticContainerProps) {
    // The "Little Code Logic": duration-500 ease-out hover:scale-105
    // We expanded it slightly for "intensity" variants but kept the core spirit.

    const intensityMap = {
        subtle: "hover:scale-[1.02]",
        medium: "hover:scale-105",
        high: "hover:scale-110",
    };

    return (
        <div
            onClick={onClick}
            className={cn(
                "transition-all duration-500 ease-out transform backface-visibility-hidden",
                intensityMap[intensity],
                "cursor-pointer", // Assuming interactive if kinetic
                className
            )}
        >
            {children}
        </div>
    );
}
