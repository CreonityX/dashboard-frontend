"use client";

import { useState } from "react";
import { CalendarShell } from "@/components/widgets/shared/calendar/CalendarShell";
import { MonthView } from "@/components/widgets/shared/calendar/views/MonthView";
import { WeekView } from "@/components/widgets/shared/calendar/views/WeekView";
import { DayView } from "@/components/widgets/shared/calendar/views/DayView";
import { AgendaView } from "@/components/widgets/shared/calendar/views/AgendaView";
import { AddEventDialog } from "@/components/widgets/shared/calendar/AddEventDialog";

export default function CalendarPage() {
    const [view, setView] = useState<'month' | 'week' | 'day' | 'agenda'>('month');
    const [isAddEventOpen, setIsAddEventOpen] = useState(false);

    // This function will be passed to Shell to trigger the modal from the "Add Event" button
    // For now, we'll just mock it or wire it up if Shell exposes the prop
    // Updating Shell to accept onAddEvent would be better, but for now let's just render Views

    return (
        <div className="h-full">
            <CalendarShell view={view} onViewChange={setView} onAddEvent={() => setIsAddEventOpen(true)}>
                {view === 'month' && <MonthView />}
                {view === 'week' && <WeekView />}
                {view === 'day' && <DayView />}
                {view === 'agenda' && <AgendaView />}
            </CalendarShell>

            <AddEventDialog isOpen={isAddEventOpen} onClose={() => setIsAddEventOpen(false)} />
        </div>
    );
}
