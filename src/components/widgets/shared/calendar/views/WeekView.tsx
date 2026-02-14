"use client";

import { cn } from "@/lib/utils";
import { CalendarEvent } from "@/components/widgets/shared/calendar/CalendarComponents";

// Mock Data
const EVENTS: CalendarEvent[] = [
    { id: '2', title: 'Strategy Call', type: 'meeting', date: '2026-02-10', time: '2:00 PM', duration: '1h', brand: 'Sony' },
    { id: '4', title: 'YouTube Upload', type: 'publishing', date: '2026-02-14', time: '10:00 AM', duration: '30m' },
    { id: '9', title: 'Live Stream', type: 'publishing', date: '2026-02-14', time: '6:00 PM', duration: '2h' },
];

const HOURS = Array.from({ length: 13 }, (_, i) => i + 8); // 8 AM to 8 PM

export function WeekView() {
    const weekDays = [
        { day: 'Sun', date: 8 },
        { day: 'Mon', date: 9 },
        { day: 'Tue', date: 10 },
        { day: 'Wed', date: 11 },
        { day: 'Thu', date: 12 },
        { day: 'Fri', date: 13 },
        { day: 'Sat', date: 14, isToday: true },
    ];

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-8 border-b border-white/5 bg-zinc-900/40 divide-x divide-white/5">
                <div className="p-4 text-xs font-mono text-zinc-500 text-center">GMT-5</div>
                {weekDays.map(d => (
                    <div key={d.date} className={cn(
                        "py-3 text-center transition-colors",
                        d.isToday ? "bg-purple-500/10" : ""
                    )}>
                        <div className={cn("text-xs font-bold uppercase", d.isToday ? "text-purple-400" : "text-zinc-500")}>{d.day}</div>
                        <div className={cn("text-lg font-bold font-display", d.isToday ? "text-white" : "text-zinc-400")}>{d.date}</div>
                    </div>
                ))}
            </div>

            {/* Scrollable Time Grid */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-8 divide-x divide-white/5 relative">
                    {/* Time Column */}
                    <div>
                        {HOURS.map(h => (
                            <div key={h} className="h-20 border-b border-white/5 text-[10px] text-zinc-500 font-mono p-2 text-right relative">
                                <span className="-top-2 relative">{h > 12 ? h - 12 : h} {h >= 12 ? 'PM' : 'AM'}</span>
                            </div>
                        ))}
                    </div>

                    {/* Days Columns */}
                    {weekDays.map((day, idx) => (
                        <div key={idx} className={cn("relative", day.isToday ? "bg-purple-500/5" : "")}>
                            {/* Background Lines */}
                            {HOURS.map(h => (
                                <div key={h} className="h-20 border-b border-white/5" />
                            ))}

                            {/* Events Mapping (Simplified positioning) */}
                            {day.date === 14 && (
                                <>
                                    <div className="absolute top-[160px] left-1 right-1 h-[40px] bg-purple-500/20 border border-purple-500/40 rounded-sm p-1 text-[10px] text-purple-300 font-bold overflow-hidden cursor-pointer hover:bg-purple-500/30 transition-colors">
                                        10:00 AM - YouTube Upload
                                    </div>
                                    <div className="absolute top-[800px] left-1 right-1 h-[160px] bg-purple-500/20 border border-purple-500/40 rounded-sm p-1 text-[10px] text-purple-300 font-bold overflow-hidden cursor-pointer hover:bg-purple-500/30 transition-colors">
                                        6:00 PM - Live Stream
                                    </div>
                                </>
                            )}
                            {day.date === 10 && (
                                <div className="absolute top-[480px] left-1 right-1 h-[80px] bg-[#a3e635]/20 border border-[#a3e635]/40 rounded-sm p-1 text-[10px] text-[#a3e635] font-bold overflow-hidden cursor-pointer hover:bg-[#a3e635]/30 transition-colors">
                                    2:00 PM - Strategy Call
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
