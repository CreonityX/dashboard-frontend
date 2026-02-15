"use client";

import { ResourceSection, ToolCard } from "@/components/widgets/shared/resources/ResourcesComponents";
import { Download, Calculator, FileText, PieChart, Users, DollarSign } from "lucide-react";

export function ToolsTab() {
    return (
        <div className="max-w-6xl mx-auto pb-20 animate-in fade-in zoom-in-95 duration-500 space-y-8">
            <div className="bg-gradient-to-r from-purple-900/20 to-zinc-900 border border-purple-500/20 p-4 rounded-sm mb-8">
                <p className="text-xs text-zinc-400">Download templates and use our calculators to optimize your business.</p>
            </div>

            <ResourceSection title="Interactive Calculators">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ToolCard
                        title="Rate Calculator"
                        desc="Determine how much you should charge for posts, reels, and stories based on your engagement."
                        icon={DollarSign}
                        type="calculator"
                    />
                    <ToolCard
                        title="Engagement Rate Checker"
                        desc="Analyze your engagement rate across platforms to benchmark against industry standards."
                        icon={PieChart}
                        type="calculator"
                    />
                    <ToolCard
                        title="ROI Estimator for Brands"
                        desc="Calculate the potential return on investment for brands partnering with you."
                        icon={Users}
                        type="calculator"
                    />
                </div>
            </ResourceSection>

            <ResourceSection title="Downloadable Templates">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    <ToolCard
                        title="Brand Pitch Deck"
                        desc="Customizable slide deck to present your value prop to brands."
                        icon={FileText}
                        type="download"
                    />
                    <ToolCard
                        title="Content Calendar 2026"
                        desc="Spreadsheet template to plan your posts across all channels."
                        icon={FileText}
                        type="download"
                    />
                    <ToolCard
                        title="Sponsorship Contract"
                        desc="Standard legal agreement template for brand deals."
                        icon={FileText}
                        type="download"
                    />
                    <ToolCard
                        title="Invoice Template"
                        desc="Professional invoice layout to get paid faster."
                        icon={FileText}
                        type="download"
                    />
                </div>
            </ResourceSection>
        </div>
    );
}
