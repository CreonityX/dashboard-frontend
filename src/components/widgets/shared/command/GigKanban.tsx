"use client";

import { MoreHorizontal, Plus, Clock, CheckCircle2, CircleDashed } from "lucide-react";
import { cn } from "@/lib/utils";

export function GigKanban() {
    const columns = [
        { id: "todo", label: "TO_DO", color: "text-zinc-500", border: "border-zinc-800" },
        { id: "progress", label: "IN_PROGRESS", color: "text-blue-400", border: "border-blue-900/30" },
        { id: "review", label: "REVIEW", color: "text-purple-400", border: "border-purple-900/30" },
        { id: "done", label: "COMPLETE", color: "text-[#a3e635]", border: "border-[#a3e635]/30" },
    ];

    const tasks = [
        { id: 1, title: "Cyberpunk 2077 Stream", client: "CDPR", status: "progress", date: "2d left" },
        { id: 2, title: "Tech Haven Unboxing", client: "Logitech", status: "todo", date: "5d left" },
        { id: 3, title: "Monthly Digest", client: "Internal", status: "review", date: "Due today" },
        { id: 4, title: "Setup Tour v4", client: "Secretlab", status: "done", date: "Cleared" },
    ];

    return (
        <div className="flex flex-col h-full bg-zinc-950/50">
            {/* Header */}
            <div className="flex items-center justify-between p-6 pb-4 border-b border-white/5">
                <div className="flex gap-4">
                    <button className="text-xs font-bold font-mono text-white border-b-2 border-[#a3e635] pb-0.5">BOARD_VIEW</button>
                    <button className="text-xs font-bold font-mono text-zinc-600 hover:text-zinc-400 transition-colors">LIST_VIEW</button>
                </div>
                <button className="p-1.5 bg-[#a3e635] text-black rounded-sm hover:bg-[#b5f555] transition-colors">
                    <Plus className="w-4 h-4" />
                </button>
            </div>

            {/* Board */}
            <div className="flex-1 p-4 grid grid-cols-4 gap-4 overflow-x-auto min-w-[600px] text-zinc-300">
                {columns.map((col) => (
                    <div key={col.id} className="flex flex-col h-full min-w-[140px]">
                        {/* Column Header */}
                        <div className={cn("flex items-center justify-between mb-3 pb-2 border-b-2", col.border)}>
                            <span className={cn("text-[10px] font-mono font-bold tracking-wider", col.color)}>{col.label}</span>
                            <span className="text-[10px] font-mono text-zinc-600">
                                {tasks.filter(t => t.status === col.id).length}
                            </span>
                        </div>

                        {/* Drop Zone */}
                        <div className="flex-1 bg-white/[0.02] rounded-sm p-2 space-y-2 border border-white/5">
                            {tasks.filter(t => t.status === col.id).map((task) => (
                                <div key={task.id} className="group bg-zinc-900/80 border border-zinc-800 p-3 rounded-sm hover:border-zinc-600 cursor-grab active:cursor-grabbing transition-all hover:translate-y-[-2px] hover:shadow-lg hover:shadow-black/50">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="text-[10px] font-mono text-[#a3e635] bg-[#a3e635]/10 px-1.5 py-0.5 rounded-[2px]">{task.client}</div>
                                        <button className="text-zinc-600 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                            <MoreHorizontal className="w-3 h-3" />
                                        </button>
                                    </div>
                                    <h4 className="text-xs font-bold text-zinc-200 mb-3 leading-tight font-display">{task.title}</h4>

                                    <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 font-mono">
                                        {col.id === 'done' ? (
                                            <CheckCircle2 className="w-3 h-3 text-[#a3e635]" />
                                        ) : (
                                            <Clock className="w-3 h-3" />
                                        )}
                                        {task.date}
                                    </div>
                                </div>
                            ))}
                            {/* Empty State / Drop Target */}
                            <div className="h-full min-h-[50px] border-2 border-dashed border-zinc-800/50 rounded-sm opacity-50 flex items-center justify-center">
                                <Plus className="w-4 h-4 text-zinc-800" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
