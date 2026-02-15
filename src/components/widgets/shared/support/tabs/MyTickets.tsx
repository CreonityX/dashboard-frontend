"use client";

import { SupportSection, TicketRow } from "@/components/widgets/shared/support/SupportComponents";

export function MyTickets() {
    return (
        <div className="max-w-5xl mx-auto pb-20 animate-in fade-in zoom-in-95 duration-500 space-y-8">
            <div className="flex items-center justify-between">
                <p className="text-xs text-zinc-500 font-mono">Showing last 30 days transactions</p>
                <div className="flex gap-2">
                    {['All', 'Open', 'Closed'].map((filter) => (
                        <button key={filter} className="px-3 py-1.5 border border-zinc-800 text-zinc-400 text-xs font-mono uppercase bg-zinc-900/50 hover:bg-zinc-800 hover:text-white transition-colors rounded-sm first:bg-[#a3e635]/10 first:text-[#a3e635] first:border-[#a3e635]/20">
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            <SupportSection title="Active Tickets">
                <TicketRow
                    id="#T-8821"
                    subject="Payment withdrawal pending for > 3 days"
                    status="open"
                    date="Today, 10:42 AM"
                    priority="high"
                />
                <TicketRow
                    id="#T-8819"
                    subject="Profile verification badge missing"
                    status="pending"
                    date="Yesterday, 04:15 PM"
                    priority="medium"
                />
            </SupportSection>

            <SupportSection title="Closed Tickets">
                <TicketRow
                    id="#T-8750"
                    subject="Unable to update portfolio cover image"
                    status="closed"
                    date="Jan 12, 2026"
                    priority="low"
                />
                <TicketRow
                    id="#T-8742"
                    subject="Question about service fees"
                    status="closed"
                    date="Jan 10, 2026"
                    priority="low"
                />
                <TicketRow
                    id="#T-8699"
                    subject="Login issue with 2FA"
                    status="closed"
                    date="Jan 05, 2026"
                    priority="high"
                />
            </SupportSection>
        </div>
    );
}
