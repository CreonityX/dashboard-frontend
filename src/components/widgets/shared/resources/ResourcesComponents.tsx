"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { PlayCircle, Download, ExternalLink, ChevronRight, Clock, Star } from "lucide-react";

// --- Section Header ---
export function ResourceSection({ title, children, className, action }: { title: string, children: ReactNode, className?: string, action?: ReactNode }) {
    return (
        <div className={cn("space-y-4 mb-10 last:mb-0", className)}>
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">{title}</h3>
                {action}
            </div>
            <div className="space-y-4">
                {children}
            </div>
        </div>
    );
}

// --- Course Card ---
export function CourseCard({ title, category, duration, difficulty, progress, thumbnail }: { title: string, category: string, duration: string, difficulty: 'Beginner' | 'Intermediate' | 'Advanced', progress?: number, thumbnail?: string }) {
    return (
        <div className="group cursor-pointer border border-white/5 bg-zinc-900/20 hover:border-purple-500/30 hover:bg-purple-500/5 transition-all rounded-sm overflow-hidden flex flex-col h-full">
            <div className="relative aspect-video bg-zinc-900 overflow-hidden">
                <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 rounded-sm text-[10px] font-mono text-white flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {duration}
                </div>
                <div className="absolute top-2 left-2 px-2 py-0.5 bg-purple-500/90 rounded-sm text-[10px] font-bold uppercase text-white shadow-lg">
                    {difficulty}
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                        <PlayCircle className="w-5 h-5 text-white" />
                    </div>
                </div>
            </div>

            <div className="p-4 flex-1 flex flex-col">
                <div className="text-[10px] text-purple-400 font-mono uppercase mb-1">{category}</div>
                <h4 className="text-sm font-bold text-white mb-3 line-clamp-2 leading-tight group-hover:text-purple-300 transition-colors">{title}</h4>

                <div className="mt-auto">
                    {progress !== undefined ? (
                        <div className="space-y-1">
                            <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                                <span>Progress</span>
                                <span>{progress}%</span>
                            </div>
                            <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-purple-500 to-[#a3e635] transition-all duration-500" style={{ width: `${progress}%` }} />
                            </div>
                        </div>
                    ) : (
                        <button className="text-[10px] font-bold text-zinc-500 group-hover:text-white uppercase flex items-center gap-1 transition-colors">
                            Start_Course <ChevronRight className="w-3 h-3" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

// --- Tool Card ---
export function ToolCard({ title, desc, icon: Icon, type }: { title: string, desc: string, icon: any, type: 'download' | 'calculator' | 'template' }) {
    return (
        <div className="p-5 border border-white/5 bg-zinc-900/20 hover:bg-zinc-900/40 hover:border-purple-500/30 transition-all rounded-sm group cursor-pointer h-full flex flex-col">
            <div className="flex items-start justify-between mb-4">
                <div className="p-2.5 bg-zinc-800/50 rounded-sm text-zinc-400 group-hover:text-purple-400 group-hover:bg-purple-500/10 transition-colors">
                    <Icon className="w-5 h-5" />
                </div>
                {type === 'download' && <Download className="w-4 h-4 text-zinc-600 group-hover:text-white transition-colors" />}
                {type === 'calculator' && <ExternalLink className="w-4 h-4 text-zinc-600 group-hover:text-white transition-colors" />}
            </div>

            <h4 className="text-sm font-bold text-white mb-2 font-display">{title}</h4>
            <p className="text-xs text-zinc-500 leading-relaxed mb-4 flex-1">{desc}</p>

            <div className="text-[10px] font-bold text-purple-500/80 uppercase tracking-wide group-hover:text-purple-400 transition-colors">
                {type === 'download' ? 'Download_Template' : 'Launch_Tool'}
            </div>
        </div>
    );
}

// --- Insight/Blog Card ---
export function InsightCard({ title, date, category, readTime }: { title: string, date: string, category: string, readTime: string }) {
    return (
        <div className="flex gap-4 p-4 border border-white/5 bg-zinc-900/10 hover:bg-zinc-900/30 rounded-sm group cursor-pointer transition-colors">
            <div className="w-24 h-24 bg-zinc-800 rounded-sm shrink-0 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 to-transparent" />
            </div>
            <div className="flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded-sm uppercase">{category}</span>
                    <span className="text-[10px] text-zinc-600 font-mono">{date}</span>
                </div>
                <h4 className="text-sm font-bold text-white mb-2 leading-snug group-hover:text-purple-400 transition-colors">{title}</h4>
                <div className="text-[10px] text-zinc-500 font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {readTime} Read
                </div>
            </div>
        </div>
    );
}
