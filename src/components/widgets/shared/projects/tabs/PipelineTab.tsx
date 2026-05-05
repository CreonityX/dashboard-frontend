import { Calendar, CheckCircle2, ChevronRight, MessageSquare, Paperclip, ExternalLink, Send, Clock, Zap, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import { useProjectsMvp, ApplicationStatus } from "@/components/widgets/shared/projects/ProjectsMvpContext";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { MOCK_CONVERSATIONS } from "@/lib/mock-data";

const STATUS_META: Record<ApplicationStatus, { label: string; color: string; bg: string }> = {
    under_review: { label: "Under Review", color: "text-zinc-400", bg: "bg-zinc-800/50" },
    shortlisted: { label: "Shortlisted", color: "text-blue-400", bg: "bg-blue-500/10" },
    interview: { label: "Interviewing", color: "text-[#a3e635]", bg: "bg-[#a3e635]/10" },
    rejected: { label: "Declined", color: "text-red-400", bg: "bg-red-500/10" }
};

export function PipelineTab() {
    const router = useRouter();
    const { activeTasks, applications, opportunities, updateTaskStatus, completeTask, removeApplication, isLoading } = useProjectsMvp();
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

    const pitchedRows = useMemo(() => {
        return applications
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
    }, [applications, opportunities]);

    const actionableTasks = activeTasks.filter(t => t.status === "todo" || t.status === "progress");
    const waitingTasks = activeTasks.filter(t => t.status === "review" || t.status === "done");
    const activePitches = pitchedRows.filter(r => r.status !== "rejected");

    if (isLoading) {
        return (
            <div className="space-y-6 p-2 animate-pulse">
                <div className="h-40 bg-zinc-900/40 border border-zinc-800 rounded-sm" />
                <div className="h-40 bg-zinc-900/40 border border-zinc-800 rounded-sm" />
            </div>
        );
    }

    return (
        <div className="space-y-8 max-w-5xl pb-10">
            {/* Section 1: Action Required */}
            <section className="bg-zinc-900/40 border border-zinc-800 rounded-sm overflow-hidden">
                <div className="border-b border-zinc-800 bg-zinc-900/80 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Zap className="w-4 h-4 text-[#a3e635]" />
                        <div>
                            <h2 className="text-xs font-bold text-white font-mono uppercase tracking-widest">Action_Required</h2>
                            <p className="text-[10px] text-zinc-500 font-mono uppercase">Workload // Active</p>
                        </div>
                    </div>
                    <span className="text-[10px] font-mono text-[#a3e635] bg-[#a3e635]/10 px-2 py-1 rounded-sm border border-[#a3e635]/20">
                        {actionableTasks.length}_TASKS
                    </span>
                </div>

                <div className="p-4">
                    {actionableTasks.length === 0 ? (
                        <div className="border border-zinc-800 border-dashed rounded-sm p-8 text-center bg-zinc-900/20">
                            <p className="text-zinc-500 text-[10px] uppercase font-mono tracking-widest">No Active Workload</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {actionableTasks.map(task => (
                                <div key={task.id} className="bg-zinc-950 border border-zinc-800 hover:border-zinc-600 rounded-sm p-4 transition-colors group">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className={cn("w-8 h-8 rounded-sm flex items-center justify-center text-[10px] font-bold border border-zinc-700/50", task.logoBg)}>
                                                {task.brand[0]}
                                            </div>
                                            <div>
                                                <h3 className="text-xs font-bold text-white uppercase tracking-wide leading-tight">{task.title}</h3>
                                                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">{task.brand}</span>
                                            </div>
                                        </div>
                                        <span className={cn(
                                            "px-2 py-0.5 rounded-sm text-[9px] font-bold font-mono uppercase tracking-wider border",
                                            task.status === "progress" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" : "bg-zinc-800 text-zinc-300 border-zinc-700"
                                        )}>
                                            {task.status === "progress" ? "In_Progress" : "To_Do"}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 text-[10px] text-zinc-400 font-mono mb-4 bg-zinc-900 p-2 rounded-sm border border-zinc-800/50">
                                        <Calendar className="w-3 h-3 text-[#a3e635]" />
                                        <span>DUE: <span className="text-white font-bold">{task.due}</span></span>
                                    </div>

                                    <div className="flex gap-2">
                                        {task.status === "progress" && (
                                            <button
                                                onClick={() => setActionNote(`Draft attachment prepared for ${task.brand}.`)}
                                                className="px-2 py-1.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-sm text-zinc-400 hover:text-white transition-colors"
                                                title="Upload Draft"
                                            >
                                                <Paperclip className="w-3.5 h-3.5" />
                                            </button>
                                        )}
                                        <button
                                            onClick={() => openBrandMessages(task.brand)}
                                            className="px-2 py-1.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-sm text-zinc-400 hover:text-white transition-colors"
                                        >
                                            <MessageSquare className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                            onClick={() => updateTaskStatus(task.id, task.status === "todo" ? "progress" : "review")}
                                            className="flex-1 px-3 py-1.5 bg-white text-black hover:bg-zinc-200 rounded-sm text-[10px] font-bold font-mono uppercase transition-colors flex items-center justify-center gap-1.5"
                                        >
                                            {task.status === "todo" ? "Start_Work" : "Submit_Draft"} <ChevronRight className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Section 2: Waiting on Brand */}
            <section className="bg-zinc-900/40 border border-zinc-800 rounded-sm overflow-hidden">
                <div className="border-b border-zinc-800 bg-zinc-900/80 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-blue-400" />
                        <div>
                            <h2 className="text-xs font-bold text-white font-mono uppercase tracking-widest">Waiting_On_Brand</h2>
                            <p className="text-[10px] text-zinc-500 font-mono uppercase">In Review // Approved</p>
                        </div>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-400 bg-zinc-800 px-2 py-1 rounded-sm border border-zinc-700">
                        {waitingTasks.length}_PENDING
                    </span>
                </div>

                <div className="p-0">
                    {waitingTasks.length === 0 ? (
                        <div className="p-6 text-center">
                            <p className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">Nothing pending approval.</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-zinc-800/50">
                            {waitingTasks.map(task => (
                                <div key={task.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-zinc-800/30 transition-colors gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className={cn("w-8 h-8 rounded-sm flex items-center justify-center text-[10px] font-bold border border-zinc-700/50", task.logoBg)}>
                                            {task.brand[0]}
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-bold text-white uppercase tracking-wider">{task.title}</h4>
                                            <p className="text-[9px] font-mono text-zinc-500 uppercase">{task.brand}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-3 self-start sm:self-auto">
                                        <span className={cn(
                                            "px-2 py-0.5 rounded-sm text-[9px] font-bold font-mono uppercase tracking-wider border",
                                            task.status === "review" ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" : "bg-[#a3e635]/10 text-[#a3e635] border-[#a3e635]/20"
                                        )}>
                                            {task.status === "review" ? "In_Review" : "Approved"}
                                        </span>
                                        
                                        <button onClick={() => openBrandMessages(task.brand)} className="p-1.5 text-zinc-500 hover:text-white bg-zinc-950 rounded-sm border border-zinc-800">
                                            <MessageSquare className="w-3 h-3" />
                                        </button>
                                        
                                        {task.status === "done" && (
                                            <button
                                                onClick={() => completeTask(task.id)}
                                                className="px-2 py-1.5 bg-[#a3e635] text-black rounded-sm text-[9px] font-bold font-mono uppercase hover:bg-[#b4f046] transition-colors flex items-center gap-1.5"
                                            >
                                                <CheckCircle2 className="w-3 h-3" /> Mark_Paid
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Section 3: Pitch Tracker */}
            <section className="bg-zinc-900/40 border border-zinc-800 rounded-sm overflow-hidden">
                <div className="border-b border-zinc-800 bg-zinc-900/80 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Target className="w-4 h-4 text-purple-400" />
                        <div>
                            <h2 className="text-xs font-bold text-white font-mono uppercase tracking-widest">Pitch_Tracker</h2>
                            <p className="text-[10px] text-zinc-500 font-mono uppercase">Applications // Pending</p>
                        </div>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-400 bg-zinc-800 px-2 py-1 rounded-sm border border-zinc-700">
                        {activePitches.length}_ACTIVE
                    </span>
                </div>

                <div className="p-0">
                    {activePitches.length === 0 ? (
                        <div className="p-6 text-center">
                            <p className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">No active pitches.</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-zinc-800/50">
                            {activePitches.map(row => {
                                const meta = STATUS_META[row.status];
                                return (
                                    <div key={row.opportunityId} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-zinc-800/30 transition-colors gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className={cn("w-8 h-8 rounded-sm flex items-center justify-center text-[10px] font-bold border border-zinc-700/50", row.opportunity.logoBg)}>
                                                {row.opportunity.brand[0]}
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-bold text-white uppercase tracking-wider">{row.opportunity.title}</h4>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <span className="text-[9px] font-bold text-zinc-400 uppercase">{row.opportunity.brand}</span>
                                                    <span className="text-[9px] text-zinc-600 font-mono">• APPLIED: {row.appliedOn}</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-3 self-start sm:self-auto">
                                            <div className={cn("flex items-center gap-1.5 px-2 py-0.5 rounded-sm text-[9px] font-mono uppercase tracking-wider border border-white/5", meta.bg, meta.color)}>
                                                <Send className="w-3 h-3" />
                                                {meta.label}
                                            </div>
                                            
                                            <button onClick={() => openBrandMessages(row.opportunity.brand)} className="p-1.5 text-zinc-500 hover:text-white bg-zinc-950 rounded-sm border border-zinc-800">
                                                <MessageSquare className="w-3 h-3" />
                                            </button>
                                            <button onClick={() => removeApplication(row.opportunityId)} className="p-1.5 text-zinc-500 hover:text-red-400 bg-zinc-950 rounded-sm border border-zinc-800" title="Withdraw Pitch">
                                                <ExternalLink className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            {/* Action Notification Toast */}
            {actionNote && (
                <div className="fixed bottom-6 right-6 z-50 rounded-sm border border-[#a3e635]/30 bg-[#a3e635]/10 p-3 text-[11px] font-mono text-[#a3e635] shadow-2xl flex items-center gap-2 animate-in slide-in-from-bottom-6 duration-300">
                    <CheckCircle2 className="w-4 h-4" />
                    {actionNote}
                </div>
            )}
        </div>
    );
}
