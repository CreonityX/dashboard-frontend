"use client";

import { HomeShell } from "@/components/widgets/shared/home/HomeShell";
import { WelcomeBanner } from "@/components/widgets/shared/home/WelcomeBanner";
import { QuickStatsRow } from "@/components/widgets/shared/home/QuickStatsRow";
import { EarningsOverviewCard } from "@/components/widgets/shared/home/EarningsOverviewCard";
import { ActiveProjectsStatus } from "@/components/widgets/shared/home/ActiveProjectsStatus";
import { RecentActivityFeed } from "@/components/widgets/shared/home/RecentActivityFeed";
import { RecommendedGigsCarousel } from "@/components/widgets/shared/home/RecommendedGigsCarousel";

export default function DashboardHome() {
    return (
        <HomeShell>
            <WelcomeBanner />

            <QuickStatsRow />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto">
                <div className="lg:col-span-2">
                    <EarningsOverviewCard />
                </div>
                <div className="lg:col-span-1">
                    <ActiveProjectsStatus />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <RecommendedGigsCarousel />
                </div>
                <div className="lg:col-span-1">
                    <RecentActivityFeed />
                </div>
            </div>
        </HomeShell>
    );
}
