import { Calendar, CheckCircle2, ChevronRight, MessageSquare, Paperclip, ExternalLink, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { TaskStatus, useProjectsMvp, ApplicationStatus } from "@/components/widgets/shared/projects/ProjectsMvpContext";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { MOCK_CONVERSATIONS } from "@/lib/mock-data";

const COLUMNS: Array<{ id: string; title: string; color: string; next?: TaskStatus }> = [
    { id: "pitching", title: "Pitching", color: "border-purple-500" },
    { id: "todo", title: "To Do", color: "border-zinc-700", next: "progress" },
    { id: "progress", title: "In Progress", color: "border-blue-500", next: "review" },
    { id: "review", title: "In Review", color: "border-yellow-500", next: "done" },
    { id: "done", title: "Approved", color: "border-[#a3e635]" }
];

const STATUS_META: Record<ApplicationStatus, { label: string; stripe: string }> = {
    under_review: { label: "Under Review", stripe: "bg-zinc-700" },
    shortlisted: { label: "Shortlisted", stripe: "bg-blue-500" },
    interview: { label: "Interviewing", stripe: "bg-[#a3e635]" },
    rejected: { label: "Rejected", stripe: "bg-red-500/50" }
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

    return (
        <div className="h-full overflow-x-auto custom-scrollbar">
            <div className="flex gap-4 min-w-[1400px] h-full pb-4">
                {COLUMNS.map((col) => {
                    const isPitching = col.id === "pitching";
                    
                    const columnTasks = isPitching 
                        ? pitchedRows.filter(row => row.status !== "rejected") 
                        : activeTasks.filter((task) => task.status === col.id);

                    return (
                        <div key={col.id} className="w-1/5 flex flex-col h-full min-h-[500px]">
                            <div className={cn("flex items-center justify-between mb-4 pb-2 border-b-2", col.color)}>
                                <h3 className="text-xs font-bold text-white font-display uppercase tracking-wider">{col.title}</h3>
                                <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded-full border border-zinc-800">{columnTasks.length}</span>
                            </div>

                            <div className="flex-1 bg-zinc-900/20 rounded-sm border border-zinc-800/50 p-2 space-y-3 overflow-y-auto custom-scrollbar">
                                {isLoading && (
                                    <div className="h-20 rounded-sm border border-zinc-800 bg-zinc-900/40 animate-pulse" />
                                )}

                                {!isLoading && isPitching && pitchedRows.filter(row => row.status !== "rejected").map((row) => {
                                    const meta = STATUS_META[row.status];
                                    return (
                                        <div key={row.opportunityId} className="bg-zinc-900 border border-zinc-800 p-3 rounded-sm hover:border-zinc-600 transition-colors group shadow-sm relative overflow-hidden">
                                            <div className={cn("absolute left-0 top-0 bottom-0 w-1", meta.stripe)} />
                                            <div className="pl-2">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <div className={cn("w-6 h-6 rounded-sm flex items-center justify-center text-[9px] font-bold border border-zinc-700/50", row.opportunity.logoBg)}>
                                                            {row.opportunity.brand[0]}
                                                        </div>
                                                        <span className="text-[10px] font-bold text-zinc-400 uppercase">{row.opportunity.brand}</span>
                                                    </div>
                                                </div>
                                                
                                                <h4 className="text-xs font-bold text-white mb-2 leading-snug">{row.opportunity.title}</h4>
                                                
                                                <div className="flex items-center justify-between pt-2 border-t border-zinc-800/50 mb-3">
                                                    <div className="flex items-center gap-1.5 text-[9px] text-zinc-500 font-mono">
                                                        <Send className="w-3 h-3" />
                                                        {meta.label}
                                                    </div>
                                                    <div className="flex gap-1">
                                                        <button onClick={() => openBrandMessages(row.opportunity.brand)} className="p-1 hover:bg-zinc-800 rounded-sm text-zinc-500 hover:text-white">
                                                            <MessageSquare className="w-3 h-3" />
                                                        </button>
                                                        <button onClick={() => removeApplication(row.opportunityId)} className="p-1 hover:bg-zinc-800 rounded-sm text-zinc-500 hover:text-red-500" title="Withdraw">
                                                            <ExternalLink className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}

                                {!isLoading && !isPitching && (columnTasks as typeof activeTasks).map((task) => (
                                    <div key={task.id} className="bg-zinc-900 border border-zinc-800 p-3 rounded-sm hover:border-zinc-600 transition-colors group shadow-sm">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center gap-2">
                                                <div className={cn("w-6 h-6 rounded-sm flex items-center justify-center text-[9px] font-bold border border-zinc-700/50", task.logoBg)}>
                                                    {task.brand[0]}
                                                </div>
                                                <span className="text-[10px] font-bold text-zinc-400 uppercase">{task.brand}</span>
                                            </div>
                                        </div>

                                        <h4 className="text-xs font-bold text-white mb-3 leading-snug">{task.title}</h4>

                                        <div className="flex items-center justify-between pt-2 border-t border-zinc-800/50">
                                            <div className="flex items-center gap-1.5 text-[9px] text-zinc-500 font-mono">
                                                <Calendar className="w-3 h-3" />
                                                {task.due}
                                            </div>
                                            <div className="flex gap-1">
                                                {col.id === "progress" && (
                                                    <button
                                                        onClick={() => setActionNote(`Draft attachment prepared for ${task.brand}.`)}
                                                        className="p-1 hover:bg-zinc-800 rounded-sm text-zinc-500 hover:text-white"
                                                        title="Upload Draft"
                                                    >
                                                        <Paperclip className="w-3 h-3" />
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => setActionNote(`Opened message intent for ${task.brand}.`)}
                                                    className="p-1 hover:bg-zinc-800 rounded-sm text-zinc-500 hover:text-white"
                                                >
                                                    <MessageSquare className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="mt-3 flex gap-2">
                                            {col.next && (
                                                <button
                                                    onClick={() => updateTaskStatus(task.id, col.next!)}
                                                    className="flex-1 px-2 py-1.5 bg-zinc-950 border border-zinc-800 hover:border-zinc-600 rounded-sm text-[10px] font-mono text-zinc-300 hover:text-white flex items-center justify-center gap-1"
                                                >
                                                    Next <ChevronRight className="w-3 h-3" />
                                                </button>
                                            )}
                                            {col.id === "done" && (
                                                <button
                                                    onClick={() => completeTask(task.id)}
                                                    className="flex-1 px-2 py-1.5 bg-[#a3e635] text-black rounded-sm text-[10px] font-bold font-mono uppercase flex items-center justify-center gap-1 hover:bg-[#b4f046] transition-colors"
                                                >
                                                    Complete <CheckCircle2 className="w-3 h-3" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                {!isLoading && columnTasks.length === 0 && (
                                    <div className="h-24 border border-dashed border-zinc-800 rounded-sm flex items-center justify-center">
                                        <p className="text-[9px] text-zinc-600 font-mono uppercase tracking-wider">Empty</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {actionNote && (
                <div className="fixed bottom-4 right-4 z-50 rounded-sm border border-blue-500/30 bg-blue-500/10 p-3 text-xs text-blue-200 shadow-xl backdrop-blur-md animate-in slide-in-from-bottom-4 duration-300">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-400" />
                        {actionNote}
                    </div>
                </div>
            )}
        </div>
    );
}
