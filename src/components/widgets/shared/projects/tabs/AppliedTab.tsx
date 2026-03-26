import { useMemo, useState } from "react";
import { CheckCircle2, ExternalLink, MessageSquare, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { ApplicationStatus, useProjectsMvp } from "@/components/widgets/shared/projects/ProjectsMvpContext";
import { MOCK_CONVERSATIONS } from "@/lib/mock-data";

const STATUS_META: Record<ApplicationStatus, { label: string; step: number; stripe: string }> = {
    under_review: { label: "Under Review", step: 1, stripe: "bg-zinc-700" },
    shortlisted: { label: "Shortlisted", step: 2, stripe: "bg-blue-500" },
    interview: { label: "Interviewing", step: 3, stripe: "bg-[#a3e635]" },
    rejected: { label: "Rejected", step: 0, stripe: "bg-red-500/50" }
};

const STEPS = ["Applied", "Under Review", "Shortlisted", "Interview", "Offer"];

export function AppliedTab() {
    const router = useRouter();
    const { applications, opportunities, removeApplication } = useProjectsMvp();
    const [filter, setFilter] = useState<"all" | ApplicationStatus>("all");
    const [actionNote, setActionNote] = useState("");

    const openBrandMessages = (brand: string) => {
        const existing = MOCK_CONVERSATIONS.find((item) => item.brand.toLowerCase() === brand.toLowerCase());
        if (existing) {
            router.push(`/messages?conversation=${existing.id}`);
            return;
        }
        router.push("/messages");
        setActionNote(`Opened inbox. No existing thread found for ${brand}.`);
    };

    const rows = useMemo(() => {
        const merged = applications
            .map((entry) => {
                const opportunity = opportunities.find((item) => item.id === entry.opportunityId);
                if (!opportunity) return null;
                return {
                    ...entry,
                    opportunity
                };
            })
            .filter(Boolean) as Array<{
            opportunityId: number;
            appliedOn: string;
            status: ApplicationStatus;
            viewed: boolean;
            opportunity: (typeof opportunities)[number];
        }>;

        if (filter === "all") return merged;
        return merged.filter((item) => item.status === filter);
    }, [applications, filter, opportunities]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center gap-3 flex-wrap">
                <p className="text-zinc-500 font-mono text-xs">TRACKING // {rows.length}_ACTIVE</p>
                <div className="flex gap-2 flex-wrap">
                    {[
                        ["all", "All"],
                        ["under_review", "Reviewing"],
                        ["shortlisted", "Shortlisted"],
                        ["interview", "Interview"]
                    ].map(([value, label]) => (
                        <button
                            key={value}
                            onClick={() => setFilter(value as "all" | ApplicationStatus)}
                            className={cn(
                                "px-3 py-1 bg-zinc-900 border rounded-sm text-[10px] font-mono transition-colors uppercase",
                                filter === value
                                    ? "border-[#a3e635]/60 text-[#a3e635]"
                                    : "border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white"
                            )}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {rows.map((row) => {
                    const meta = STATUS_META[row.status];
                    return (
                        <div key={row.opportunityId} className="bg-zinc-900/40 border border-zinc-800 rounded-sm p-6 hover:border-zinc-700 transition-colors relative overflow-hidden">
                            <div className={cn("absolute left-0 top-0 bottom-0 w-1", meta.stripe)} />

                            <div className="flex flex-col lg:flex-row gap-6 lg:items-center justify-between pl-4">
                                <div className="flex items-start gap-4">
                                    <div className={cn("w-12 h-12 rounded-sm flex items-center justify-center text-sm font-bold tracking-tighter border border-zinc-700/50 shrink-0", row.opportunity.logoBg)}>
                                        {row.opportunity.brand[0]}
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                                            {row.opportunity.brand}
                                            {row.viewed && (
                                                <span className="text-[9px] font-mono font-normal text-zinc-500 flex items-center gap-1 bg-zinc-950 px-1.5 rounded-sm border border-zinc-800">
                                                    <CheckCircle2 className="w-3 h-3 text-blue-500" /> VIEWED
                                                </span>
                                            )}
                                        </h3>
                                        <div className="text-xs text-zinc-300 font-medium mb-1">{row.opportunity.title}</div>
                                        <div className="text-[10px] text-zinc-500 font-mono">Applied on {row.appliedOn}</div>
                                    </div>
                                </div>

                                {row.status !== "rejected" ? (
                                    <div className="flex-1 max-w-xl self-center w-full">
                                        <div className="flex justify-between relative mb-2">
                                            <div className="absolute top-1.5 left-0 right-0 h-[1px] bg-zinc-800 -z-10" />
                                            {STEPS.map((step, i) => {
                                                const isCompleted = i <= meta.step;
                                                const isCurrent = i === meta.step;

                                                return (
                                                    <div key={step} className="flex flex-col items-center">
                                                        <div
                                                            className={cn(
                                                                "w-3 h-3 rounded-full border-2 mb-2 transition-colors",
                                                                isCompleted ? "bg-[#a3e635] border-[#a3e635]" : "bg-zinc-950 border-zinc-700",
                                                                isCurrent && "ring-2 ring-[#a3e635]/20 ring-offset-2 ring-offset-zinc-950"
                                                            )}
                                                        />
                                                        <span className={cn(
                                                            "text-[9px] font-mono uppercase transition-colors hidden sm:block",
                                                            isCompleted ? "text-zinc-300" : "text-zinc-600"
                                                        )}>{step}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex-1 max-w-xl self-center w-full bg-red-500/10 border border-red-500/20 rounded-sm p-3 flex items-center gap-3">
                                        <XCircle className="w-4 h-4 text-red-500" />
                                        <div className="text-[10px] text-red-200 font-mono">
                                            <span className="font-bold">APPLICATION_DECLINED:</span> Thank you for your interest.
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => openBrandMessages(row.opportunity.brand)}
                                        className="px-3 py-2 bg-zinc-950 border border-zinc-800 hover:border-zinc-600 rounded-sm text-[10px] font-mono text-zinc-400 hover:text-white transition-colors flex items-center gap-2 uppercase"
                                    >
                                        <MessageSquare className="w-3 h-3" /> Message
                                    </button>
                                    <button
                                        onClick={() => removeApplication(row.opportunityId)}
                                        className="p-2 bg-zinc-950 border border-zinc-800 hover:border-red-500/50 rounded-sm text-zinc-400 hover:text-red-500 transition-colors"
                                        title="Withdraw"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {actionNote && (
                    <div className="border border-blue-500/30 rounded-sm p-3 text-[11px] text-blue-200 bg-blue-500/10">
                        {actionNote}
                    </div>
                )}

                {rows.length === 0 && (
                    <div className="border border-zinc-800 rounded-sm p-8 text-center text-zinc-400 text-sm bg-zinc-900/30">
                        No applications yet. Apply to a campaign from Discover.
                    </div>
                )}
            </div>
        </div>
    );
}
