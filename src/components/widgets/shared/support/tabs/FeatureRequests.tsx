"use client";

import { SupportSection } from "@/components/widgets/shared/support/SupportComponents";
import { ThumbsUp, MessageSquare } from "lucide-react";

export function FeatureRequests() {
    return (
        <div className="max-w-4xl mx-auto pb-20 animate-in fade-in zoom-in-95 duration-500 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-white font-display uppercase">Feature Roadmap</h2>
                    <p className="text-xs text-zinc-500 font-mono mt-1">Vote on ideas to shape the future of Creonity.</p>
                </div>
                <button className="px-4 py-2 bg-[#a3e635] text-black font-bold text-xs uppercase rounded-sm hover:bg-[#b0f545] transition-colors">
                    + Submit_Idea
                </button>
            </div>

            <SupportSection title="Under Consideration">
                <FeatureCard
                    title="Dark Mode for Mobile App"
                    desc="Native dark mode support for iOS and Android applications."
                    votes={2450}
                    comments={120}
                    status="considering"
                />
                <FeatureCard
                    title="Direct Brand Messaging"
                    desc="Allow creators to initiate chats with verified brands without an active gig."
                    votes={1800}
                    comments={85}
                    status="considering"
                />
            </SupportSection>

            <SupportSection title="Planned & In Progress">
                <FeatureCard
                    title="Crypto Withdrawals (SOL & ETH)"
                    desc="Expand payout options to include Solana and Ethereum networks."
                    votes={5600}
                    comments={450}
                    status="planned"
                />
                <FeatureCard
                    title="Stories Analytics Dashboard"
                    desc="Deeper insights into Instagram Stories performance including tap-backs."
                    votes={3200}
                    comments={210}
                    status="in_progress"
                />
            </SupportSection>
        </div>
    );
}

function FeatureCard({ title, desc, votes, comments, status }: { title: string, desc: string, votes: number, comments: number, status: string }) {
    const statusColors: Record<string, string> = {
        considering: "text-zinc-500 bg-zinc-800 border-zinc-700",
        planned: "text-blue-400 bg-blue-900/20 border-blue-800",
        in_progress: "text-[#a3e635] bg-[#a3e635]/10 border-[#a3e635]/20"
    };

    return (
        <div className="p-4 border border-white/5 bg-zinc-900/20 rounded-sm hover:border-white/10 transition-colors group">
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                        <h4 className="text-sm font-bold text-white group-hover:text-[#a3e635] transition-colors">{title}</h4>
                        <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-sm border ${statusColors[status]}`}>
                            {status.replace('_', ' ')}
                        </span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed mb-3">{desc}</p>

                    <div className="flex items-center gap-4 text-[10px] text-zinc-500 font-mono">
                        <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3" /> {votes.toLocaleString()} Votes</span>
                        <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> {comments} Comments</span>
                    </div>
                </div>

                <button className="flex flex-col items-center justify-center w-10 h-10 border border-zinc-700 rounded-sm hover:bg-zinc-800 transition-colors group/vote">
                    <ThumbsUp className="w-4 h-4 text-zinc-500 group-hover/vote:text-[#a3e635] transition-colors" />
                </button>
            </div>
        </div>
    );
}
