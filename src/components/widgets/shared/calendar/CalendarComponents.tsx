"use client";

import { cn } from "@/lib/utils";
import { Clock, MapPin, User, Video } from "lucide-react";

// --- Types ---
export type EventType = 'deadline' | 'milestone' | 'meeting' | 'publishing' | 'payment' | 'reminder';

export interface CalendarEvent {
    id: string;
    title: string;
    type: EventType;
    date: string; // ISO string 2026-02-14
    time?: string;
    duration?: string;
    brand?: string;
}

const TYPE_COLORS: Record<EventType, string> = {
    deadline: 'bg-red-500/10 text-red-400 border-red-500/20 hover:border-red-500/50',
    milestone: 'bg-blue-500/10 text-blue-400 border-blue-500/20 hover:border-blue-500/50',
    meeting: 'bg-[#a3e635]/10 text-[#a3e635] border-[#a3e635]/20 hover:border-[#a3e635]/50',
    publishing: 'bg-purple-500/10 text-purple-400 border-purple-500/20 hover:border-purple-500/50',
    payment: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20 hover:border-yellow-500/50',
    reminder: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20 hover:border-zinc-500/50',
};

const TYPE_DOTS: Record<EventType, string> = {
    deadline: 'bg-red-500',
    milestone: 'bg-blue-500',
    meeting: 'bg-[#a3e635]',
    publishing: 'bg-purple-500',
    payment: 'bg-yellow-500',
    reminder: 'bg-zinc-500',
};

// --- Month Grid Cell ---
export function CalendarGridCell({ date, events, isCurrentMonth = true, isToday = false }: { date: number, events: CalendarEvent[], isCurrentMonth?: boolean, isToday?: boolean }) {
    return (
        <div className={cn(
            "min-h-[120px] border-b border-r border-white/5 p-2 transition-colors group relative",
            !isCurrentMonth && "bg-black/40",
            isToday && "bg-purple-500/5"
        )}>
            <div className="flex justify-between items-start mb-2">
                <span className={cn(
                    "text-xs font-mono font-bold w-6 h-6 flex items-center justify-center rounded-full",
                    isToday ? "bg-purple-500 text-white" : isCurrentMonth ? "text-zinc-300" : "text-zinc-600"
                )}>
                    {date}
                </span>
                {/* Visual indicator for + events if too many */}
            </div>

            <div className="space-y-1">
                {events.map(event => (
                    <div
                        key={event.id}
                        className={cn(
                            "px-1.5 py-0.5 rounded-sm border text-[10px] font-medium truncate cursor-pointer transition-all",
                            TYPE_COLORS[event.type]
                        )}
                    >
                        {event.time && <span className="opacity-70 mr-1">{event.time}</span>}
                        {event.title}
                    </div>
                ))}
            </div>
        </div>
    );
}

// --- List/Agenda Item ---
export function AgendaItem({ event }: { event: CalendarEvent }) {
    return (
        <div className="flex gap-4 p-4 border border-zinc-800 bg-zinc-900/20 rounded-sm hover:border-zinc-700 transition-colors group">
            {/* Date Box */}
            <div className="flex flex-col items-center justify-center w-16 h-16 bg-zinc-900 border border-white/5 rounded-sm shrink-0">
                <span className="text-xs text-zinc-500 uppercase font-bold">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                <span className="text-xl font-bold text-white font-display">{new Date(event.date).getDate()}</span>
            </div>

            {/* Details */}
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                    <div className={cn("w-2 h-2 rounded-full", TYPE_DOTS[event.type])} />
                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-wide">{event.type}</span>
                    {event.time && (
                        <span className="text-xs text-zinc-500 font-mono flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {event.time}
                        </span>
                    )}
                </div>
                <h4 className="text-sm font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">{event.title}</h4>
                {event.brand && (
                    <div className="text-xs text-zinc-500 flex items-center gap-1">
                        <User className="w-3 h-3" /> {event.brand}
                    </div>
                )}
            </div>

            {/* Action */}
            <div className="flex items-center">
                {event.type === 'meeting' && (
                    <button className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-sm text-white transition-colors">
                        <Video className="w-4 h-4" />
                    </button>
                )}
            </div>
        </div>
    );
}
