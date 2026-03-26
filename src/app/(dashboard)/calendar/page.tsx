"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CalendarShell } from "@/components/widgets/shared/calendar/CalendarShell";
import { MonthView } from "@/components/widgets/shared/calendar/views/MonthView";
import { WeekView } from "@/components/widgets/shared/calendar/views/WeekView";
import { DayView } from "@/components/widgets/shared/calendar/views/DayView";
import { AgendaView } from "@/components/widgets/shared/calendar/views/AgendaView";
import { AddEventDialog } from "@/components/widgets/shared/calendar/AddEventDialog";

function CalendarContent() {
    // const router = useRouter();
    // const searchParams = useSearchParams();
    // const viewParam = searchParams.get('view');
    // // Ensure view is one of the allowed types, default to 'month'
    // const view = (viewParam === 'month' || viewParam === 'week' || viewParam === 'day' || viewParam === 'agenda') ? viewParam : 'month';
    // const [isAddEventOpen, setIsAddEventOpen] = useState(false);
    // const currentDate = new Date(); // Use current date for now, could be state driven later

    // const handleViewChange = (newView: string) => {
    //     router.push(`/calendar?view=${newView}`);
    // };

    return (
        <div className="h-full">
            {/* Calendar section hidden */}
            {/* <CalendarShell view={view} onViewChange={handleViewChange} onAddEvent={() => setIsAddEventOpen(true)}>
                {view === 'month' && <MonthView currentDate={currentDate} />}
                {view === 'week' && <WeekView />}
                {view === 'day' && <DayView />}
                {view === 'agenda' && <AgendaView />}
            </CalendarShell>

            <AddEventDialog isOpen={isAddEventOpen} onClose={() => setIsAddEventOpen(false)} */}
        </div>
    );
}

export default function CalendarPage() {
    return (
        <Suspense fallback={<div className="h-full w-full bg-zinc-900/40" />}>
            <CalendarContent />
        </Suspense>
    );
}
