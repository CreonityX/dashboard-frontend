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

// Assuming these types and helper functions are defined elsewhere or will be added.
// For the purpose of this edit, I'm adding placeholder definitions to make the snippet syntactically valid.
interface MonthViewProps {
    currentDate: Date;
}

function getDaysInMonth(date: Date) {
    // Placeholder for actual logic
    const year = date.getFullYear();
    const month = date.getMonth();
    const numDays = new Date(year, month + 1, 0).getDate();
    const daysArray = Array.from({ length: numDays }, (_, i) => ({
        date: i + 1,
        isCurrentMonth: true,
    }));
    // Add some previous/next month days for a full grid (e.g., 35 or 42 cells)
    // For simplicity, let's just return current month days for now,
    // as the original code also had a simplified 28-day Feb logic.
    // The original code had 35 cells, so let's mimic that structure for now.
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 for Sunday, 1 for Monday, etc.
    const prevMonthDays = Array.from({ length: firstDayOfMonth }, (_, i) => ({
        date: new Date(year, month, 0).getDate() - (firstDayOfMonth - 1 - i),
        isCurrentMonth: false,
    }));
    const totalCells = 35; // 5 rows * 7 days
    const nextMonthDaysCount = totalCells - (prevMonthDays.length + daysArray.length);
    const nextMonthDays = Array.from({ length: nextMonthDaysCount }, (_, i) => ({
        date: i + 1,
        isCurrentMonth: false,
    }));

    return [...prevMonthDays, ...daysArray, ...nextMonthDays];
}

function getStartDayOfMonth(date: Date) {
    // Placeholder for actual logic
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
}


export function MonthView({ currentDate }: MonthViewProps) {
    const days = getDaysInMonth(currentDate);
    const startDay = getStartDayOfMonth(currentDate);

    return (
        <div className="h-full flex flex-col min-w-[800px] lg:min-w-0">
            {/* Days Header */}
            <div className="grid grid-cols-7 border-b border-zinc-800 bg-zinc-900/40">
                {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                    <div key={day} className="py-2 text-center text-[10px] font-bold text-zinc-500 font-mono tracking-wider border-r border-zinc-800 last:border-r-0">
                        {day}
                    </div>
                ))}
            </div>
            {/* Grid */}
            <div className="grid grid-cols-7 flex-1 auto-rows-fr">
                {days.map((day, idx) => {
                    const dateStr = `2026-02-${String(day.date).padStart(2, '0')}`; // This mock date will need to be dynamic based on currentDate
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
