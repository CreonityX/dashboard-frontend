import { MoreHorizontal, Calendar, Paperclip, MessageSquare, CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

const COLUMNS = [
    { id: 'todo', title: 'To Do', color: 'border-zinc-700' },
    { id: 'progress', title: 'In Progress', color: 'border-blue-500' },
    { id: 'review', title: 'In Review', color: 'border-yellow-500' },
    { id: 'done', title: 'Approved', color: 'border-[#a3e635]' },
];

const TASKS = [
    {
        id: 1,
        title: "Draft Story Concepts",
        brand: "Nike",
        due: "Tomorrow",
        status: 'todo',
        logoBg: "bg-black text-white"
    },
    {
        id: 2,
        title: "Film Unboxing Video",
        brand: "Samsung",
        due: "Feb 28",
        status: 'progress',
        logoBg: "bg-blue-600 text-white"
    },
    {
        id: 3,
        title: "Submit Raw Footage",
        brand: "GoPro",
        due: "Yesterday",
        status: 'review',
        logoBg: "bg-[#0099ff] text-white"
    },
    {
        id: 4,
        title: "Final Edit - Cut 1",
        brand: "Red Bull",
        due: "Completed",
        status: 'done',
        logoBg: "bg-[#1f2638] text-white"
    },
];

export function ActiveTab() {
    return (
        <div className="h-full overflow-x-auto">
            <div className="flex gap-4 min-w-[1000px] h-full">
                {COLUMNS.map(col => (
                    <div key={col.id} className="w-1/4 flex flex-col h-full">
                        {/* Column Header */}
                        <div className={cn("flex items-center justify-between mb-4 pb-2 border-b-2", col.color)}>
                            <h3 className="text-xs font-bold text-white font-display uppercase tracking-wider">{col.title}</h3>
                            <span className="text-[10px] font-mono text-zinc-500">
                                {TASKS.filter(t => t.status === col.id).length}
                            </span>
                        </div>

                        {/* Drop Zone */}
                        <div className="flex-1 bg-zinc-900/20 rounded-sm border border-zinc-800/50 p-2 space-y-3">
                            {TASKS.filter(t => t.status === col.id).map(task => (
                                <div key={task.id} className="bg-zinc-900 border border-zinc-800 p-3 rounded-sm hover:border-zinc-600 cursor-grab active:cursor-grabbing transition-colors group shadow-sm">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className={cn("w-6 h-6 rounded-sm flex items-center justify-center text-[9px] font-bold border border-zinc-700/50", task.logoBg)}>
                                                {task.brand[0]}
                                            </div>
                                            <span className="text-[10px] font-bold text-zinc-400 uppercase">{task.brand}</span>
                                        </div>
                                        <button className="text-zinc-600 hover:text-white">
                                            <MoreHorizontal className="w-3.5 h-3.5" />
                                        </button>
                                    </div>

                                    <h4 className="text-xs font-bold text-white mb-3 leading-snug">{task.title}</h4>

                                    <div className="flex items-center justify-between pt-2 border-t border-zinc-800/50">
                                        <div className="flex items-center gap-1.5 text-[9px] text-zinc-500 font-mono">
                                            <Calendar className="w-3 h-3" />
                                            {task.due}
                                        </div>
                                        <div className="flex gap-1">
                                            {col.id === 'progress' && (
                                                <button className="p-1 hover:bg-zinc-800 rounded-sm text-zinc-500 hover:text-white" title="Upload Draft">
                                                    <Paperclip className="w-3 h-3" />
                                                </button>
                                            )}
                                            <button className="p-1 hover:bg-zinc-800 rounded-sm text-zinc-500 hover:text-white">
                                                <MessageSquare className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Empty State Placeholder */}
                            {TASKS.filter(t => t.status === col.id).length === 0 && (
                                <div className="h-24 border border-dashed border-zinc-800 rounded-sm flex items-center justify-center">
                                    <p className="text-[9px] text-zinc-600 font-mono uppercase">No Active Tasks</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
