"use client";

import { SupportSection } from "@/components/widgets/shared/support/BrandSupportComponents";
import { ThumbsUp, MessageSquare } from "lucide-react";

export function FeatureRequests() {
    return (
        <div className="max-w-4xl mx-auto pb-20 animate-in fade-in zoom-in-95 duration-500 space-y-8">
            <div className="flex items-center justify-between">
                <p className="text-xs text-zinc-500 font-mono">Vote on ideas to shape the future of Creonity.</p>
                <button className="px-4 py-2 bg-[#a3e635] text-black font-bold text-xs uppercase rounded-sm hover:bg-[#b0f545] transition-colors shrink-0 font-mono tracking-tight">
                    + Submit_Idea
                </button>
            </div>

            <SupportSection title="Under Consideration">
                <FeatureCard
                    title="Bulk Invite Tool"
                    desc="Ability to upload a CSV of creator handles and invite them to a campaign in bulk."
                    votes={2450}
                    comments={120}
                    status="considering"
                    tag="Workflow"
                />
                <FeatureCard
                    title="Competitor Benchmarking"
                    desc="Compare your campaign performance against industry averages and competitors."
                    votes={1800}
                    comments={85}
                    status="considering"
                    tag="Analytics"
                />
            </SupportSection>

            <SupportSection title="Planned & In Progress">
                <FeatureCard
                    title="Advanced Reporting Export"
                    desc="Customizable PDF and CSV exports for stakeholder reporting."
                    votes={5600}
                    comments={450}
                    status="planned"
                    tag="Reporting"
                />
                <FeatureCard
                    title="Auto-Approval Workflows"
                    desc="Set rules to automatically approve content based on keywords or creator trust score."
                    votes={3200}
                    comments={210}
                    status="in_progress"
                    tag="Automation"
                />
            </SupportSection>
        </div>
    );
}

function FeatureCard({ title, desc, votes, comments, status, tag }: { title: string, desc: string, votes: number, comments: number, status: string, tag?: string }) {
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
                        <h4 className="text-sm font-bold text-white group-hover:text-[#a3e635] transition-colors font-display tracking-wide">{title}</h4>
                        <span className={`px-2 py-0.5 text-[9px] font-bold uppercase rounded-sm border ${statusColors[status]}`}>
                            {status.replace('_', ' ')}
                        </span>
                        {tag && <span className="text-[9px] text-zinc-600 font-mono uppercase border border-zinc-800 px-1.5 py-0.5 rounded-sm">{tag}</span>}
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed mb-3 font-mono">{desc}</p>

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
