"use client";

import { TotalEarningsCard } from "@/components/widgets/creator/financial/TotalEarningsCard";
import { GigKanban } from "@/components/widgets/shared/command/GigKanban";
import { NotificationCenter } from "@/components/widgets/shared/os/NotificationCenter";
import { UserProfileHeader } from "@/components/widgets/shared/os/UserProfileHeader";
import { ContentTopList } from "@/components/widgets/creator/analytics/ContentTopList";
import { WidgetShell } from "@/components/WidgetShell";
import { Zap, Command, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { GlassTechCard } from "@/components/GlassTechCard";

export default function DashboardHome() {
    return (
        <div className="flex flex-col items-center justify-center h-full text-zinc-500 font-mono text-sm">
            <div className="p-4 border border-zinc-800 bg-zinc-900/20 rounded-sm animate-pulse">
                AWAITING_WIDGET_CONFIG...
            </div>
        </div>
    );
}
