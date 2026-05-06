"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { AttributionTab } from "./AttributionTab";
import { ReportsTab } from "./ReportsTab";
import { PieChart, FileText } from "lucide-react";

type RoiView = "attribution" | "reports";

export function RoiAndReportsTab() {
    const [activeView, setActiveView] = useState<RoiView>("attribution");

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar border-b border-zinc-800">
                <button
                    onClick={() => setActiveView("attribution")}
                    className={cn(
                        "flex items-center gap-2 px-4 py-3 text-xs font-bold font-display uppercase tracking-wider whitespace-nowrap transition-all border-b-2",
                        activeView === "attribution" 
                            ? "border-[#a3e635] text-white" 
                            : "border-transparent text-zinc-500 hover:text-white"
                    )}
                >
                    <PieChart className="w-3.5 h-3.5" />
                    ROI & Attribution
                </button>
                <button
                    onClick={() => setActiveView("reports")}
                    className={cn(
                        "flex items-center gap-2 px-4 py-3 text-xs font-bold font-display uppercase tracking-wider whitespace-nowrap transition-all border-b-2",
                        activeView === "reports" 
                            ? "border-[#a3e635] text-white" 
                            : "border-transparent text-zinc-500 hover:text-white"
                    )}
                >
                    <FileText className="w-3.5 h-3.5" />
                    Custom Reports
                </button>
            </div>

            <div className="min-h-[500px] pt-2">
                {activeView === "attribution" && <AttributionTab />}
                {activeView === "reports" && <ReportsTab />}
            </div>
        </div>
    );
}
