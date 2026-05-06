"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/lib/UserContext";

// Creator Imports
import { CalendarShell as CreatorCalendarShell } from "@/components/widgets/shared/calendar/CalendarShell";
import { MonthView as CreatorMonthView } from "@/components/widgets/shared/calendar/views/MonthView";
import { WeekView } from "@/components/widgets/shared/calendar/views/WeekView";
import { DayView } from "@/components/widgets/shared/calendar/views/DayView";
import { AgendaView } from "@/components/widgets/shared/calendar/views/AgendaView";
import { AddEventDialog as CreatorAddEventDialog } from "@/components/widgets/shared/calendar/AddEventDialog";

// Brand Imports
import { CalendarShell as BrandCalendarShell } from "@/components/widgets/shared/calendar/BrandCalendarShell";
import { MonthView as BrandMonthView } from "@/components/widgets/shared/calendar/views/MonthView";
import { AddEventDialog as BrandAddEventDialog } from "@/components/widgets/shared/calendar/BrandAddEventDialog";

function CreatorCalendarContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const viewParam = searchParams.get('view');
    const view = (viewParam === 'month' || viewParam === 'week' || viewParam === 'day' || viewParam === 'agenda') ? viewParam : 'month';
    const [isAddEventOpen, setIsAddEventOpen] = useState(false);
    const currentDate = new Date();

    const handleViewChange = (newView: string) => {
        router.push(`/calendar?view=${newView}`);
    };

    return (
        <div className="h-full">
            <CreatorCalendarShell view={view} onViewChange={handleViewChange} onAddEvent={() => setIsAddEventOpen(true)}>
                {view === 'month' && <CreatorMonthView currentDate={currentDate} />}
                {view === 'week' && <WeekView />}
                {view === 'day' && <DayView />}
                {view === 'agenda' && <AgendaView />}
            </CreatorCalendarShell>
            <CreatorAddEventDialog isOpen={isAddEventOpen} onClose={() => setIsAddEventOpen(false)} />
        </div>
    );
}

function BrandCalendarContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const viewParam = searchParams.get('view');
    const view = (viewParam === 'month' || viewParam === 'week' || viewParam === 'day' || viewParam === 'agenda') ? viewParam : 'month';
    const [isAddEventOpen, setIsAddEventOpen] = useState(false);
    const currentDate = new Date();

    const handleViewChange = (newView: string) => {
        router.push(`/calendar?view=${newView}`);
    };

    return (
        <div className="h-full">
            <BrandCalendarShell view={view} onViewChange={handleViewChange} onAddEvent={() => setIsAddEventOpen(true)}>
                {view === 'month' && <BrandMonthView currentDate={currentDate} />}
                {view === 'week' && <WeekView />}
                {view === 'day' && <DayView />}
                {view === 'agenda' && <AgendaView />}
            </BrandCalendarShell>
            <BrandAddEventDialog isOpen={isAddEventOpen} onClose={() => setIsAddEventOpen(false)} />
        </div>
    );
}

export default function CalendarPage() {
    const { isBrand } = useUser();
    return (
        <Suspense fallback={<div className="h-full w-full bg-zinc-900/40" />}>
            {isBrand ? <BrandCalendarContent /> : <CreatorCalendarContent />}
        </Suspense>
    );
}
