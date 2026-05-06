"use client";

import { useUser } from "@/lib/UserContext";

// Creator imports
import { HomeShell } from "@/components/widgets/shared/home/HomeShell";
import { WelcomeBanner } from "@/components/widgets/shared/home/WelcomeBanner";
import { QuickStatsRow } from "@/components/widgets/shared/home/QuickStatsRow";
import { EarningsOverviewCard } from "@/components/widgets/shared/home/EarningsOverviewCard";
import { ActiveProjectsStatus } from "@/components/widgets/shared/home/ActiveProjectsStatus";
import { RecentActivityFeed } from "@/components/widgets/shared/home/RecentActivityFeed";
import { RecommendedGigsCarousel } from "@/components/widgets/shared/home/RecommendedGigsCarousel";

// Brand imports
import { HomeShell as BrandHomeShell } from "@/components/widgets/shared/home/BrandHomeShell";
import { WelcomeBanner as BrandWelcomeBanner } from "@/components/widgets/shared/home/BrandWelcomeBanner";
import { QuickStatsRow as BrandQuickStatsRow } from "@/components/widgets/shared/home/BrandQuickStatsRow";
import { CampaignPerformanceSummary } from "@/components/widgets/shared/home/CampaignPerformanceSummary";
import { BudgetOverviewWidget } from "@/components/widgets/shared/home/BudgetOverviewWidget";
import { CreatorPipelineWidget } from "@/components/widgets/shared/home/CreatorPipelineWidget";
import { RecentActivityFeed as BrandRecentActivityFeed } from "@/components/widgets/shared/home/BrandRecentActivityFeed";
import { TopPerformingCreators } from "@/components/widgets/shared/home/TopPerformingCreators";
import { UpcomingDeadlines } from "@/components/widgets/shared/home/UpcomingDeadlines";
import { RecommendedCreatorsCarousel } from "@/components/widgets/shared/home/RecommendedCreatorsCarousel";
import { QuickActionsPanel } from "@/components/widgets/shared/home/QuickActionsPanel";

function CreatorHome() {
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

function BrandHome() {
    return (
        <BrandHomeShell>
            <BrandWelcomeBanner />
            <BrandQuickStatsRow />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <CampaignPerformanceSummary />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <BudgetOverviewWidget />
                        <div className="space-y-6">
                            <CreatorPipelineWidget />
                            <QuickActionsPanel />
                        </div>
                    </div>
                </div>
                <div className="min-w-0">
                    <BrandRecentActivityFeed />
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
                <UpcomingDeadlines />
                <TopPerformingCreators />
            </div>
            <div className="mt-2">
                <RecommendedCreatorsCarousel />
            </div>
        </BrandHomeShell>
    );
}

export default function DashboardHome() {
    const { isBrand } = useUser();
    return isBrand ? <BrandHome /> : <CreatorHome />;
}
