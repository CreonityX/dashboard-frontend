"use client";

import { ResourceSection, InsightCard } from "@/components/widgets/shared/resources/ResourcesComponents";

export function NewsTab() {
    return (
        <div className="max-w-4xl mx-auto pb-20 animate-in fade-in zoom-in-95 duration-500 space-y-8">
            <p className="text-xs text-zinc-500 font-mono mb-8">Updates from the Creonity team and the creator economy.</p>

            <ResourceSection title="Platform Announcements">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <NewsCard
                        title="Integrating Solana Payments for Instant Settlements"
                        excerpt="We're excited to announce native SOL support for creator payouts starting next month."
                        date="Feb 12, 2026"
                        tag="Product Update"
                    />
                    <NewsCard
                        title="New 'Stories' Analytics Dashboard is Live!"
                        excerpt="Get granular data on your IG Stories performance including retention graphs and sticker taps."
                        date="Feb 05, 2026"
                        tag="Feature Launch"
                    />
                </div>
            </ResourceSection>

            <ResourceSection title="From the Blog">
                <div className="space-y-4">
                    <InsightCard
                        title="How Kai Zen Grew to 1M Followers in 6 Months"
                        category="Success Story"
                        date="Feb 08, 2026"
                        readTime="12 min"
                    />
                    <InsightCard
                        title="5 Legal Clauses Every Creator Contract Needs"
                        category="Legal Tips"
                        date="Jan 30, 2026"
                        readTime="6 min"
                    />
                    <InsightCard
                        title="The Ultimate Guide to UGC Portfolios"
                        category="Guide"
                        date="Jan 22, 2026"
                        readTime="10 min"
                    />
                </div>
            </ResourceSection>
        </div>
    );
}

function NewsCard({ title, excerpt, date, tag }: { title: string, excerpt: string, date: string, tag: string }) {
    return (
        <div className="p-6 border border-white/5 bg-zinc-900/20 hover:bg-zinc-900/40 transition-colors rounded-sm cursor-pointer group flex flex-col h-full">
            <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold text-purple-400 uppercase bg-purple-500/10 px-2 py-0.5 rounded-sm border border-purple-500/20">{tag}</span>
                <span className="text-[10px] text-zinc-500 font-mono">{date}</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-purple-300 transition-colors">{title}</h3>
            <p className="text-xs text-zinc-400 leading-relaxed mb-4 flex-1">{excerpt}</p>
            <div className="text-[10px] font-bold text-zinc-500 group-hover:text-white uppercase transition-colors">Read_More &rarr;</div>
        </div>
    );
}
