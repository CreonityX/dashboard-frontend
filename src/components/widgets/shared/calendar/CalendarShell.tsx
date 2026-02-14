"use client";

import { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, Filter, Download, Upload } from "lucide-react";

interface CalendarShellProps {
    children?: ReactNode;
    view: 'month' | 'week' | 'day' | 'agenda';
    onViewChange: (view: any) => void;
    onAddEvent?: () => void;
}

const EVENT_FILTERS = [
    { id: 'deadlines', label: 'Deadlines', color: 'bg-red-500' },
    { id: 'milestones', label: 'Milestones', color: 'bg-blue-500' },
    { id: 'meetings', label: 'Meetings', color: 'bg-[#a3e635]' }, // Green
    { id: 'publishing', label: 'Publishing', color: 'bg-purple-500' },
    { id: 'payments', label: 'Payments', color: 'bg-yellow-500' },
    { id: 'reminders', label: 'Reminders', color: 'bg-zinc-500' },
];

export function CalendarShell({ children, view, onViewChange, onAddEvent }: CalendarShellProps) {
    const [activeFilters, setActiveFilters] = useState<string[]>(EVENT_FILTERS.map(f => f.id));

    const toggleFilter = (id: string) => {
        setActiveFilters(prev =>
            prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
        );
    };

    return (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-140px)] gap-6 overflow-hidden">
            {/* Sidebar Controls */}
            <aside className="w-full lg:w-64 flex-shrink-0 space-y-6 overflow-y-auto">
                {/* Mini Calendar Placeholder */}
                <div className="bg-zinc-900/40 border border-white/5 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-bold text-white">February 2026</span>
                        <div className="flex gap-1">
                            <button className="p-1 hover:bg-white/10 rounded-sm text-zinc-400"><ChevronLeft className="w-4 h-4" /></button>
                            <button className="p-1 hover:bg-white/10 rounded-sm text-zinc-400"><ChevronRight className="w-4 h-4" /></button>
                        </div>
                    </div>
                    {/* Simplified Grid for visual only */}
                    <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-zinc-500 font-mono mb-2">
                        <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center text-xs text-zinc-300">
                        {Array.from({ length: 28 }).map((_, i) => (
                            <div key={i} className={cn(
                                "aspect-square flex items-center justify-center rounded-sm hover:bg-white/5 cursor-pointer",
                                i === 13 ? "bg-purple-500 text-white font-bold" : ""
                            )}>
                                {i + 1}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Filters */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between px-1">
                        <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Event Filters</span>
                        <Filter className="w-3 h-3 text-zinc-600" />
                    </div>
                    <div className="space-y-1">
                        {EVENT_FILTERS.map((filter) => {
                            const isActive = activeFilters.includes(filter.id);
                            return (
                                <button
                                    key={filter.id}
                                    onClick={() => toggleFilter(filter.id)}
                                    className="w-full flex items-center gap-3 px-3 py-2 rounded-sm hover:bg-white/5 transition-colors group text-left"
                                >
                                    <div className={cn(
                                        "w-3 h-3 rounded-sm border transition-all",
                                        isActive ? `border-transparent ${filter.color}` : "border-zinc-700 bg-transparent"
                                    )} />
                                    <span className={cn(
                                        "text-xs font-mono transition-colors",
                                        isActive ? "text-zinc-300" : "text-zinc-600 group-hover:text-zinc-400"
                                    )}>
                                        {filter.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Integrations */}
                <div className="p-4 border border-white/5 bg-zinc-900/20 rounded-lg space-y-3">
                    <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-2">Sync & Export</span>
                    <button className="w-full flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors">
                        <CalendarIcon className="w-3 h-3" /> Connect Google Cal
                    </button>
                    <button className="w-full flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors">
                        <Download className="w-3 h-3" /> Export .ics
                    </button>
                    <button className="w-full flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors">
                        <Upload className="w-3 h-3" /> Import Events
                    </button>
                </div>
            </aside>

            {/* Main Calendar Area */}
            <main className="flex-1 flex flex-col bg-zinc-900/20 border border-white/5 rounded-lg overflow-hidden relative">
                {/* Toolbar */}
                <div className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-zinc-900/40">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-bold text-white font-display">February 2026</h2>
                        <div className="flex items-center bg-black/40 rounded-sm p-0.5 border border-white/5">
                            <button className="p-1 hover:bg-white/10 rounded-sm text-zinc-400 hover:text-white"><ChevronLeft className="w-4 h-4" /></button>
                            <button className="px-3 text-xs font-mono text-zinc-300">Today</button>
                            <button className="p-1 hover:bg-white/10 rounded-sm text-zinc-400 hover:text-white"><ChevronRight className="w-4 h-4" /></button>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex bg-black/40 rounded-sm p-1 border border-white/5">
                            {['Month', 'Week', 'Day', 'Agenda'].map((v) => {
                                const value = v.toLowerCase();
                                const isActive = view === value;
                                return (
                                    <button
                                        key={value}
                                        onClick={() => onViewChange(value)}
                                        className={cn(
                                            "px-3 py-1 rounded-sm text-[10px] font-bold uppercase transition-all",
                                            isActive ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300"
                                        )}
                                    >
                                        {v}
                                    </button>
                                );
                            })}
                        </div>
                        <button
                            onClick={onAddEvent}
                            className="flex items-center gap-2 px-3 py-1.5 bg-purple-500 hover:bg-purple-600 text-white text-xs font-bold uppercase rounded-sm transition-colors shadow-lg shadow-purple-500/20"
                        >
                            <Plus className="w-3 h-3" /> Add_Event
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto bg-black/20 custom-scrollbar relative">
                    {children}
                </div>
            </main>
        </div>
    );
}
