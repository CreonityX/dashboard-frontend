import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface TechIconProps {
    icon: LucideIcon;
    label?: string;
    isActive?: boolean;
    className?: string;
}

export function TechIcon({ icon: Icon, label, isActive, className }: TechIconProps) {
    return (
        <div className={cn(
            "group relative flex items-center justify-center transition-all duration-300",
            isActive ? "text-[#a3e635]" : "text-zinc-500 hover:text-zinc-300",
            className
        )}>
            {/* Active glow background */}
            <div className={cn(
                "absolute inset-0 bg-[#a3e635]/10 blur-md rounded-full transition-opacity duration-500",
                isActive ? "opacity-100" : "opacity-0"
            )} />

            <Icon className="w-5 h-5 relative z-10 stroke-[1.5]" />

            {/* Active indicator dot with pulse */}
            {isActive && (
                <div className="absolute -right-1 top-1 w-1.5 h-1.5 bg-[#a3e635] rounded-full shadow-[0_0_8px_#a3e635]">
                    <div className="absolute inset-0 rounded-full bg-[#a3e635] animate-ping opacity-30" />
                </div>
            )}
        </div>
    );
}
