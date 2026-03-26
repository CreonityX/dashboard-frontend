import { Calendar, CheckCircle2, ChevronRight, MessageSquare, Paperclip } from "lucide-react";
import { cn } from "@/lib/utils";
import { TaskStatus, useProjectsMvp } from "@/components/widgets/shared/projects/ProjectsMvpContext";
import { useState } from "react";

const COLUMNS: Array<{ id: TaskStatus; title: string; color: string; next?: TaskStatus }> = [
    { id: "todo", title: "To Do", color: "border-zinc-700", next: "progress" },
    { id: "progress", title: "In Progress", color: "border-blue-500", next: "review" },
    { id: "review", title: "In Review", color: "border-yellow-500", next: "done" },
    { id: "done", title: "Approved", color: "border-[#a3e635]" }
];

export function ActiveTab() {
    const { activeTasks, updateTaskStatus, completeTask, isLoading } = useProjectsMvp();
    const [actionNote, setActionNote] = useState("");

    return (
        <div className="h-full overflow-x-auto">
            <div className="flex gap-4 min-w-[1000px] h-full">
                {COLUMNS.map((col) => {
                    const tasks = activeTasks.filter((task) => task.status === col.id);
                    return (
                        <div key={col.id} className="w-1/4 flex flex-col h-full">
                            <div className={cn("flex items-center justify-between mb-4 pb-2 border-b-2", col.color)}>
                                <h3 className="text-xs font-bold text-white font-display uppercase tracking-wider">{col.title}</h3>
                                <span className="text-[10px] font-mono text-zinc-500">{tasks.length}</span>
                            </div>

                            <div className="flex-1 bg-zinc-900/20 rounded-sm border border-zinc-800/50 p-2 space-y-3">
                                {isLoading && (
                                    <div className="h-20 rounded-sm border border-zinc-800 bg-zinc-900/40 animate-pulse" />
                                )}

                                {!isLoading && tasks.map((task) => (
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
                                                    className="flex-1 px-2 py-1.5 bg-[#a3e635] text-black rounded-sm text-[10px] font-bold font-mono uppercase flex items-center justify-center gap-1"
                                                >
                                                    Complete <CheckCircle2 className="w-3 h-3" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                {!isLoading && tasks.length === 0 && (
                                    <div className="h-24 border border-dashed border-zinc-800 rounded-sm flex items-center justify-center">
                                        <p className="text-[9px] text-zinc-600 font-mono uppercase">No Active Tasks</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {actionNote && (
                <div className="mt-3 rounded-sm border border-blue-500/30 bg-blue-500/10 p-2.5 text-[11px] text-blue-200 max-w-md">
                    {actionNote}
                </div>
            )}
        </div>
    );
}
