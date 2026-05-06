"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { CampaignsTab } from "./CampaignsTab";
import { CreatorsTab } from "./CreatorsTab";
import { ContentTab } from "./ContentTab";
import { PlatformTab } from "./PlatformTab";
import { ComparisonTab } from "./ComparisonTab";
import { Briefcase, Users, LayoutList, Monitor, GitCompare } from "lucide-react";

type PerformanceView = "campaigns" | "creators" | "content" | "platform" | "comparison";

export function BrandPerformanceTab() {
    const [activeView, setActiveView] = useState<PerformanceView>("campaigns");

    const VIEWS = [
        { id: "campaigns", label: "Campaigns", icon: Briefcase },
        { id: "creators", label: "Creators", icon: Users },
        { id: "content", label: "Content", icon: LayoutList },
        { id: "platform", label: "Platforms", icon: Monitor },
        { id: "comparison", label: "Cross-Campaign", icon: GitCompare },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
                {VIEWS.map(view => {
                    const Icon = view.icon;
                    const isActive = activeView === view.id;
                    return (
                        <button
                            key={view.id}
                            onClick={() => setActiveView(view.id as PerformanceView)}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-sm text-xs font-mono whitespace-nowrap transition-all border",
                                isActive 
                                    ? "bg-[#a3e635]/10 border-[#a3e635]/30 text-[#a3e635]" 
                                    : "bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800"
                            )}
                        >
                            <Icon className="w-3.5 h-3.5" />
                            {view.label}
                        </button>
                    )
                })}
            </div>

            <div className="min-h-[500px]">
                {activeView === "campaigns" && <CampaignsTab />}
                {activeView === "creators" && <CreatorsTab />}
                {activeView === "content" && <ContentTab />}
                {activeView === "platform" && <PlatformTab />}
                {activeView === "comparison" && <ComparisonTab />}
            </div>
        </div>
    );
}
