"use client";

import { AgendaItem, CalendarEvent } from "@/components/widgets/shared/calendar/CalendarComponents";

const EVENTS: CalendarEvent[] = [
    { id: '1', title: 'Tech Review Gig Deadline', type: 'deadline', date: '2026-02-05', brand: 'Samsung' },
    { id: '3', title: 'Vlog Edit Milestone 1', type: 'milestone', date: '2026-02-12' },
    { id: '4', title: 'YouTube Upload: "Setup Tour"', type: 'publishing', date: '2026-02-14', time: '10:00 AM' },
    { id: '5', title: 'Payment for Logitech Campaign', type: 'payment', date: '2026-02-15', brand: 'Logitech' },
    { id: '6', title: 'Brand Pitch Meeting', type: 'meeting', date: '2026-02-18', time: '11:00 AM', brand: 'Canon' },
    { id: '7', title: 'Reels Draft Review', type: 'deadline', date: '2026-02-20', brand: 'Adidas' },
];

export function AgendaView() {
    return (
        <div className="max-w-4xl mx-auto p-4 lg:p-8 space-y-4">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Upcoming Schedule</h3>
                <span className="text-[10px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-sm">6 Events Found</span>
            </div>

            {EVENTS.map(event => (
                <AgendaItem key={event.id} event={event} />
            ))}

            <div className="text-center py-8">
                <p className="text-xs text-zinc-600 font-mono">You're all caught up!</p>
            </div>
        </div>
    );
}
