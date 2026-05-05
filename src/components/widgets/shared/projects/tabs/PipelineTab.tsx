import { Calendar, CheckCircle2, ChevronRight, MessageSquare, Paperclip, ExternalLink, Send, Clock, Target, GripHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { useProjectsMvp, ApplicationStatus, TaskStatus, ActiveTask } from "@/components/widgets/shared/projects/ProjectsMvpContext";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { MOCK_CONVERSATIONS } from "@/lib/mock-data";
import { motion, AnimatePresence } from "framer-motion";

const STATUS_META: Record<ApplicationStatus, { label: string; color: string; bg: string }> = {
    under_review: { label: "Under Review", color: "text-zinc-400", bg: "bg-zinc-800/50" },
    shortlisted: { label: "Shortlisted", color: "text-blue-400", bg: "bg-blue-500/10" },
    interview: { label: "Interviewing", color: "text-[#a3e635]", bg: "bg-[#a3e635]/10" },
    rejected: { label: "Declined", color: "text-red-400", bg: "bg-red-500/10" }
};

type PipelineItem = {
    id: string;
    type: "pitch" | "task";
    brand: string;
    title: string;
    status: ApplicationStatus | TaskStatus;
    logoBg: string;
    dateLabel: string;
    date: string;
    data: any;
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

    const activePitches = pitchedRows.filter(r => r.status !== "rejected");

    const columns = useMemo(() => {
        const pitches: PipelineItem[] = activePitches.map(p => ({
            id: `pitch-${p.opportunityId}`,
            type: "pitch",
            brand: p.opportunity.brand,
            title: p.opportunity.title,
            status: p.status,
            logoBg: p.opportunity.logoBg,
            dateLabel: "Applied",
            date: p.appliedOn,
            data: p
        }));

        const todo: PipelineItem[] = activeTasks.filter(t => t.status === "todo").map(t => ({
            id: `task-${t.id}`,
            type: "task",
            brand: t.brand,
            title: t.title,
            status: t.status,
            logoBg: t.logoBg,
            dateLabel: "Due",
            date: t.due,
            data: t
        }));

        const inProgress: PipelineItem[] = activeTasks.filter(t => t.status === "progress").map(t => ({
            id: `task-${t.id}`,
            type: "task",
            brand: t.brand,
            title: t.title,
            status: t.status,
            logoBg: t.logoBg,
            dateLabel: "Due",
            date: t.due,
            data: t
        }));

        const inReview: PipelineItem[] = activeTasks.filter(t => t.status === "review").map(t => ({
            id: `task-${t.id}`,
            type: "task",
            brand: t.brand,
            title: t.title,
            status: t.status,
            logoBg: t.logoBg,
            dateLabel: "Due",
            date: t.due,
            data: t
        }));

        const approved: PipelineItem[] = activeTasks.filter(t => t.status === "done").map(t => ({
            id: `task-${t.id}`,
            type: "task",
            brand: t.brand,
            title: t.title,
            status: t.status,
            logoBg: t.logoBg,
            dateLabel: "Due",
            date: t.due,
            data: t
        }));

        return [
            { id: "pitched", title: "Pitched", items: pitches, icon: Target, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
            { id: "todo", title: "To Do", items: todo, icon: Clock, color: "text-zinc-400", bg: "bg-zinc-800", border: "border-zinc-700" },
            { id: "progress", title: "In Progress", items: inProgress, icon: Send, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
            { id: "review", title: "In Review", items: inReview, icon: ExternalLink, color: "text-yellow-500", bg: "bg-yellow-500/10", border: "border-yellow-500/20" },
            { id: "approved", title: "Approved", items: approved, icon: CheckCircle2, color: "text-[#a3e635]", bg: "bg-[#a3e635]/10", border: "border-[#a3e635]/20" },
        ];
    }, [activePitches, activeTasks]);

    if (isLoading) {
        return (
            <div className="flex gap-6 overflow-x-auto pb-8 h-[calc(100vh-12rem)] animate-pulse">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex-none w-80 h-full bg-zinc-900/40 border border-zinc-800 rounded-lg" />
                ))}
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full min-w-0">
            <div className="flex-1 overflow-x-auto overflow-y-hidden scrollbar-hide -mx-4 px-4 lg:-mx-10 lg:px-10">
                <div className="flex gap-4 h-full min-w-max">
                    {columns.map(col => (
                        <div key={col.id} className="flex-none w-80 flex flex-col bg-zinc-900/40 border border-zinc-800 rounded-sm overflow-hidden">
                            {/* Column Header */}
                            <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-900/80">
                                <div className="flex items-center gap-2.5">
                                    <div className={cn("p-1.5 rounded-md", col.bg)}>
                                        <col.icon className={cn("w-4 h-4", col.color)} />
                                    </div>
                                    <h3 className="text-xs font-bold text-white uppercase tracking-widest font-mono">{col.title}</h3>
                                </div>
                                <span className={cn(
                                    "text-[10px] font-mono px-2 py-0.5 rounded-sm border",
                                    col.bg, col.color, col.border
                                )}>
                                    {col.items.length}
                                </span>
                            </div>

                            {/* Column Body */}
                            <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-3">
                                <AnimatePresence>
                                    {col.items.map(item => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.2 } }}
                                            className="group bg-zinc-950 border border-zinc-800 hover:border-zinc-700 rounded-sm p-4 transition-all relative overflow-hidden"
                                        >
                                            {/* Hover Gradient Overlay */}
                                            <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                                            <div className="flex justify-between items-start mb-3">
                                                <div className="flex gap-3 items-center">
                                                    <div className={cn("w-8 h-8 rounded-md flex items-center justify-center text-[10px] font-bold border border-zinc-700/50 shrink-0", item.logoBg)}>
                                                        {item.brand[0]}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <h4 className="text-xs font-bold text-white uppercase tracking-wider leading-tight truncate">{item.title}</h4>
                                                        <p className="text-[10px] text-zinc-500 font-mono uppercase truncate mt-0.5">{item.brand}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between mt-4">
                                                <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 font-mono">
                                                    <Calendar className="w-3 h-3 text-[#a3e635]/70" />
                                                    <span className="truncate max-w-[90px]">{item.dateLabel}: <span className="text-zinc-300">{item.date}</span></span>
                                                </div>
                                                
                                                {item.type === "pitch" && (
                                                    <span className={cn(
                                                        "text-[9px] px-1.5 py-0.5 rounded-sm uppercase tracking-wider font-mono",
                                                        STATUS_META[item.status as ApplicationStatus]?.color,
                                                        STATUS_META[item.status as ApplicationStatus]?.bg
                                                    )}>
                                                        {STATUS_META[item.status as ApplicationStatus]?.label}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center gap-2">
                                                <button
                                                    onClick={() => openBrandMessages(item.brand)}
                                                    className="p-1.5 text-zinc-500 hover:text-white bg-zinc-950 border border-zinc-800 hover:border-zinc-700 rounded-sm transition-colors"
                                                    title="Message Brand"
                                                >
                                                    <MessageSquare className="w-3.5 h-3.5" />
                                                </button>

                                                {item.type === "pitch" && (
                                                    <button
                                                        onClick={() => removeApplication(item.data.opportunityId)}
                                                        className="p-1.5 text-zinc-500 hover:text-red-400 bg-zinc-950 border border-zinc-800 hover:border-red-500/30 hover:bg-red-500/10 rounded-sm transition-colors ml-auto"
                                                        title="Withdraw Pitch"
                                                    >
                                                        <ExternalLink className="w-3.5 h-3.5" />
                                                    </button>
                                                )}

                                                {item.type === "task" && (
                                                    <>
                                                        {item.status === "todo" && (
                                                            <button
                                                                onClick={() => updateTaskStatus(item.data.id, "progress")}
                                                                className="flex-1 flex items-center justify-center gap-1.5 text-[10px] font-bold uppercase tracking-wider font-mono bg-white text-black hover:bg-zinc-200 py-1.5 px-2 rounded-sm transition-colors"
                                                            >
                                                                Start <ChevronRight className="w-3 h-3" />
                                                            </button>
                                                        )}
                                                        {item.status === "progress" && (
                                                            <button
                                                                onClick={() => updateTaskStatus(item.data.id, "review")}
                                                                className="flex-1 flex items-center justify-center gap-1.5 text-[10px] font-bold uppercase tracking-wider font-mono bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 py-1.5 px-2 rounded-sm transition-colors border border-blue-500/20"
                                                            >
                                                                Submit <ChevronRight className="w-3 h-3" />
                                                            </button>
                                                        )}
                                                        {item.status === "review" && (
                                                            <button
                                                                disabled
                                                                className="flex-1 flex items-center justify-center gap-1.5 text-[10px] font-bold uppercase tracking-wider font-mono bg-yellow-500/10 text-yellow-500 py-1.5 px-2 rounded-sm cursor-not-allowed border border-yellow-500/20"
                                                            >
                                                                Pending Approval
                                                            </button>
                                                        )}
                                                        {item.status === "done" && (
                                                            <button
                                                                onClick={() => completeTask(item.data.id)}
                                                                className="flex-1 flex items-center justify-center gap-1.5 text-[10px] font-bold uppercase tracking-wider font-mono bg-[#a3e635] text-black hover:bg-[#b4f046] py-1.5 px-2 rounded-sm transition-colors"
                                                            >
                                                                <CheckCircle2 className="w-3 h-3" /> Mark Paid
                                                            </button>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                    {col.items.length === 0 && (
                                        <div className="h-24 flex items-center justify-center border-2 border-dashed border-zinc-800/60 rounded-lg">
                                            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-600">Empty</span>
                                        </div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Action Notification Toast */}
            {actionNote && (
                <div className="fixed bottom-6 right-6 z-50 rounded-md border border-[#a3e635]/30 bg-[#a3e635]/10 p-3 text-[11px] font-mono text-[#a3e635] shadow-2xl flex items-center gap-2 animate-in slide-in-from-bottom-6 duration-300">
                    <CheckCircle2 className="w-4 h-4" />
                    {actionNote}
                </div>
            )}
        </div>
    );
}
