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
    const [showMobileSidebar, setShowMobileSidebar] = useState(false);

    const toggleFilter = (id: string) => {
        setActiveFilters(prev =>
            prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
        );
    };

    return (
        <div className="flex flex-col lg:flex-row h-full w-full overflow-hidden relative">
            {/* Sidebar Controls */}
            <aside className={cn(
                "w-full lg:w-72 flex-shrink-0 flex flex-col gap-6 overflow-y-auto bg-zinc-900/95 lg:bg-zinc-900/60 border-r border-zinc-800 backdrop-blur-md p-6 z-40 transition-transform duration-300 ease-in-out",
                // Mobile: Absolute positioning, full height, toggled via state
                "absolute inset-0 lg:relative lg:translate-x-0",
                showMobileSidebar ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            )}>
                {/* Mobile Close Button */}
                <div className="flex justify-end lg:hidden mb-2">
                    <button
                        onClick={() => setShowMobileSidebar(false)}
                        className="p-2 bg-zinc-800 text-zinc-400 hover:text-white rounded-sm"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                </div>

                {/* Mini Calendar */}
                <div className="tech-border p-4">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold text-white font-display tracking-widest uppercase flex items-center gap-2">
                            <CalendarIcon className="w-3.5 h-3.5 text-[#a3e635]" /> Feb_2026
                        </span>
                        <div className="flex gap-1">
                            <button className="p-1 hover:bg-zinc-800 rounded-[1px] text-zinc-400 transition-colors"><ChevronLeft className="w-3 h-3" /></button>
                            <button className="p-1 hover:bg-zinc-800 rounded-[1px] text-zinc-400 transition-colors"><ChevronRight className="w-3 h-3" /></button>
                        </div>
                    </div>
                    {/* Grid */}
                    <div className="grid grid-cols-7 gap-1 text-center text-[9px] text-zinc-600 font-mono mb-2">
                        <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-zinc-400 font-mono">
                        {Array.from({ length: 28 }).map((_, i) => (
                            <div key={i} className={cn(
                                "aspect-square flex items-center justify-center rounded-[1px] cursor-pointer transition-all",
                                "hover:bg-zinc-800 hover:text-white",
                                i === 13 ? "bg-[#a3e635] text-black font-bold shadow-[0_0_8px_rgba(163,230,53,0.3)]" : ""
                            )}>
                                {i + 1}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Filters */}
                <div className="tech-border p-4 space-y-4">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">View_Filters</span>
                        <Filter className="w-3 h-3 text-zinc-600" />
                    </div>
                    <div className="space-y-1">
                        {EVENT_FILTERS.map((filter) => {
                            const isActive = activeFilters.includes(filter.id);
                            return (
                                <button
                                    key={filter.id}
                                    onClick={() => toggleFilter(filter.id)}
                                    className="w-full flex items-center gap-3 px-2 py-1.5 rounded-[1px] hover:bg-zinc-800/50 transition-colors group text-left"
                                >
                                    <div className={cn(
                                        "w-2 h-2 rounded-[1px] transition-all duration-300",
                                        isActive ? filter.color : "bg-zinc-800 border border-zinc-700"
                                    )} />
                                    <span className={cn(
                                        "text-[10px] font-mono uppercase tracking-tight transition-colors",
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
                <div className="mt-auto">
                    <div className="p-3 border border-zinc-800 bg-zinc-950/30 rounded-[1px] space-y-2">
                        <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest block mb-2 font-mono">Data_Sync</span>
                        <button className="w-full flex items-center gap-2 text-[10px] text-zinc-400 hover:text-[#a3e635] transition-colors font-mono group">
                            <CalendarIcon className="w-3 h-3 text-zinc-600 group-hover:text-[#a3e635]" /> Sync_Google_Cal
                        </button>
                        <button className="w-full flex items-center gap-2 text-[10px] text-zinc-400 hover:text-[#a3e635] transition-colors font-mono group">
                            <Download className="w-3 h-3 text-zinc-600 group-hover:text-[#a3e635]" /> Export_ICS
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Calendar Area */}
            <main className="flex-1 flex flex-col bg-zinc-900/40 overflow-hidden relative backdrop-blur-md">
                {/* Header Decoration */}
                <div className="absolute top-0 right-0 p-3 pointer-events-none z-20">
                    <div className="flex gap-1">
                        <div className="w-1 h-1 bg-zinc-700/50 rounded-sm" />
                        <div className="w-1 h-1 bg-zinc-700/50 rounded-sm" />
                        <div className="w-1 h-1 bg-[#a3e635]/50 rounded-sm" />
                    </div>
                </div>

                {/* Content Background (Noise) */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none z-0" />

                {/* Toolbar */}
                <div className="h-16 lg:h-14 border-b border-zinc-800 flex items-center justify-between px-2 lg:px-6 bg-zinc-900/60 relative z-10 gap-2 overflow-x-auto no-scrollbar">
                    <div className="flex items-center gap-2 lg:gap-6 flex-shrink-0">
                        {/* Mobile Toggle */}
                        <button
                            onClick={() => setShowMobileSidebar(true)}
                            className="lg:hidden p-2 text-zinc-400 hover:text-white"
                        >
                            <Filter className="w-4 h-4" />
                        </button>

                        <h2 className="text-sm lg:text-lg font-bold text-white font-display tracking-wide truncate">FEB<span className="hidden sm:inline">RUARY</span> <span className="text-zinc-600 hidden sm:inline">2026</span></h2>
                        <div className="flex items-center bg-zinc-950/50 rounded-sm p-0.5 border border-zinc-800">
                            <button className="p-1 hover:bg-zinc-800 rounded-sm text-zinc-500 hover:text-zinc-300 transition-colors"><ChevronLeft className="w-3 h-3" /></button>
                            <button className="px-2 lg:px-3 text-[10px] font-bold font-mono text-zinc-400 uppercase tracking-wider hover:text-white transition-colors">Today</button>
                            <button className="p-1 hover:bg-zinc-800 rounded-sm text-zinc-500 hover:text-zinc-300 transition-colors"><ChevronRight className="w-3 h-3" /></button>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 lg:gap-4 flex-shrink-0">
                        <div className="flex bg-zinc-950/50 rounded-sm p-1 border border-zinc-800 gap-1 overflow-x-scroll no-scrollbar max-w-[150px] lg:max-w-none">
                            {['Month', 'Week', 'Day', 'Agenda'].map((v) => {
                                const value = v.toLowerCase();
                                const isActive = view === value;
                                return (
                                    <button
                                        key={value}
                                        onClick={() => onViewChange(value)}
                                        className={cn(
                                            "px-2 lg:px-3 py-1 rounded-[1px] text-[10px] font-bold uppercase transition-all font-mono tracking-tight whitespace-nowrap",
                                            isActive
                                                ? "bg-zinc-800 text-[#a3e635] shadow-sm border border-zinc-700"
                                                : "text-zinc-500 hover:text-zinc-300 border border-transparent"
                                        )}
                                    >
                                        {v}
                                    </button>
                                );
                            })}
                        </div>
                        <button
                            onClick={onAddEvent}
                            className="flex items-center gap-2 px-3 lg:px-4 py-1.5 bg-[#a3e635] hover:bg-[#a3e635]/90 text-black text-xs font-bold uppercase rounded-sm transition-all shadow-[0_0_15px_rgba(163,230,53,0.3)] hover:shadow-[0_0_20px_rgba(163,230,53,0.5)] whitespace-nowrap"
                        >
                            <Plus className="w-3 h-3" /> <span className="hidden sm:inline">New_Event</span><span className="sm:hidden">New</span>
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-auto relative z-10 custom-scrollbar">
                    {children}
                </div>
            </main>
        </div>
    );
}
