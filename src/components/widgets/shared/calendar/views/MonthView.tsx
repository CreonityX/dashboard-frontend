"use client";

import { CalendarGridCell, CalendarEvent } from "@/components/widgets/shared/calendar/CalendarComponents";

// Mock Data for Feb 2026
const EVENTS: CalendarEvent[] = [
    { id: '1', title: 'Tech Review Gig', type: 'deadline', date: '2026-02-05', brand: 'Samsung' },
    { id: '2', title: 'Strategy Call', type: 'meeting', date: '2026-02-10', time: '2:00 PM', brand: 'Sony' },
    { id: '3', title: 'Vlog Edit Due', type: 'milestone', date: '2026-02-12' },
    { id: '4', title: 'YouTube Upload', type: 'publishing', date: '2026-02-14', time: '10:00 AM' },
    { id: '5', title: 'Invoice Paid', type: 'payment', date: '2026-02-15', brand: 'Logitech' },
    { id: '6', title: 'Brand Pitch', type: 'meeting', date: '2026-02-18', time: '11:00 AM', brand: 'Canon' },
    { id: '7', title: 'Reels Draft', type: 'deadline', date: '2026-02-20', brand: 'Adidas' },
    { id: '8', title: 'Sponsorship $$', type: 'payment', date: '2026-02-25', brand: 'Nike' },
    { id: '9', title: 'Live Stream', type: 'publishing', date: '2026-02-28', time: '6:00 PM' },
];

export function MonthView() {
    // Feb 2026 starts on Sunday (1st) and ends on Saturday (28th)
    // Simple logic for prototype: 28 days exactly matching 4 weeks
    const days = Array.from({ length: 35 }, (_, i) => {
        const day = i - 0 + 1; // Start from 1st (Sunday)
        if (day > 28) return { date: day - 28, isCurrentMonth: false }; // March
        return { date: day, isCurrentMonth: true };
    });

    return (
        <div className="flex flex-col h-full">
            {/* Header Days */}
            <div className="grid grid-cols-7 border-b border-white/5 bg-zinc-900/40">
                {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                    <div key={day} className="py-2 text-center text-xs font-bold text-zinc-500">{day}</div>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-7 flex-1 auto-rows-fr">
                {days.map((day, idx) => {
                    const dateStr = `2026-02-${String(day.date).padStart(2, '0')}`;
                    const dayEvents = day.isCurrentMonth ? EVENTS.filter(e => e.date === dateStr) : [];
                    const isToday = day.date === 14 && day.isCurrentMonth; // Mocking today as Feb 14

                    return (
                        <CalendarGridCell
                            key={idx}
                            date={day.date}
                            isCurrentMonth={day.isCurrentMonth}
                            events={dayEvents}
                            isToday={isToday}
                        />
                    );
                })}
            </div>
        </div>
    );
}
