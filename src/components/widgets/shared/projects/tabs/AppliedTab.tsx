import { Clock, CheckCircle2, XCircle, MoreHorizontal, MessageSquare, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const APPLICATIONS = [
    {
        id: 1,
        brand: "Adidas",
        title: "Originals Campaign",
        date: "Feb 12, 2026",
        status: "Under Review",
        step: 1,
        viewed: true,
        logoBg: "bg-black text-white"
    },
    {
        id: 2,
        brand: "Sony",
        title: "Alpha 7 Launch",
        date: "Feb 10, 2026",
        status: "Shortlisted",
        step: 2,
        viewed: true,
        logoBg: "bg-black text-white"
    },
    {
        id: 3,
        brand: "Airbnb",
        title: "Travel Vlog Series",
        date: "Feb 05, 2026",
        status: "Interviewing",
        step: 3,
        viewed: true,
        logoBg: "bg-[#FF5A5F] text-white"
    },
    {
        id: 4,
        brand: "Lululemon",
        title: "Yoga Challenge",
        date: "Jan 28, 2026",
        status: "Rejected",
        step: 0,
        viewed: true,
        logoBg: "bg-[#D31332] text-white"
    }
];

const STEPS = ["Applied", "Under Review", "Shortlisted", "Interview", "Offer"];

export function AppliedTab() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <p className="text-zinc-500 font-mono text-xs">TRACKING // {APPLICATIONS.length}_ACTIVE</p>
                <div className="flex gap-2">
                    {['All', 'Reviewing', 'Shortlisted', 'Interview'].map(filter => (
                        <button key={filter} className="px-3 py-1 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-sm text-[10px] font-mono text-zinc-400 hover:text-white transition-colors uppercase">
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {APPLICATIONS.map((app) => (
                    <div key={app.id} className="bg-zinc-900/40 border border-zinc-800 rounded-sm p-6 hover:border-zinc-700 transition-colors relative overflow-hidden">
                        {/* Status Stripe */}
                        <div className={cn(
                            "absolute left-0 top-0 bottom-0 w-1",
                            app.status === 'Rejected' ? "bg-red-500/50" :
                                app.status === 'Interviewing' ? "bg-[#a3e635]" :
                                    app.status === 'Shortlisted' ? "bg-blue-500" :
                                        "bg-zinc-700"
                        )} />

                        <div className="flex flex-col lg:flex-row gap-6 lg:items-center justify-between pl-4">
                            {/* Info */}
                            <div className="flex items-start gap-4">
                                <div className={cn("w-12 h-12 rounded-sm flex items-center justify-center text-sm font-bold tracking-tighter border border-zinc-700/50 shrink-0", app.logoBg)}>
                                    {app.brand[0]}
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                                        {app.brand}
                                        {app.viewed && <span className="text-[9px] font-mono font-normal text-zinc-500 flex items-center gap-1 bg-zinc-950 px-1.5 rounded-sm border border-zinc-800"><CheckCircle2 className="w-3 h-3 text-blue-500" /> VIEWED</span>}
                                    </h3>
                                    <div className="text-xs text-zinc-300 font-medium mb-1">{app.title}</div>
                                    <div className="text-[10px] text-zinc-500 font-mono">Applied on {app.date}</div>
                                </div>
                            </div>

                            {/* Timeline */}
                            {app.status !== 'Rejected' ? (
                                <div className="flex-1 max-w-xl self-center w-full">
                                    <div className="flex justify-between relative mb-2">
                                        {/* Line */}
                                        <div className="absolute top-1.5 left-0 right-0 h-[1px] bg-zinc-800 -z-10" />

                                        {STEPS.map((step, i) => {
                                            const isCompleted = i <= app.step;
                                            const isCurrent = i === app.step;

                                            return (
                                                <div key={step} className="flex flex-col items-center">
                                                    <div className={cn(
                                                        "w-3 h-3 rounded-full border-2 mb-2 transition-colors",
                                                        isCompleted ? "bg-[#a3e635] border-[#a3e635]" : "bg-zinc-950 border-zinc-700",
                                                        isCurrent && "ring-2 ring-[#a3e635]/20 ring-offset-2 ring-offset-zinc-950"
                                                    )} />
                                                    <span className={cn(
                                                        "text-[9px] font-mono uppercase transition-colors hidden sm:block",
                                                        isCompleted ? "text-zinc-300" : "text-zinc-600"
                                                    )}>{step}</span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex-1 max-w-xl self-center w-full bg-red-500/10 border border-red-500/20 rounded-sm p-3 flex items-center gap-3">
                                    <XCircle className="w-4 h-4 text-red-500" />
                                    <div className="text-[10px] text-red-200 font-mono">
                                        <span className="font-bold">APPLICATION_DECLINED:</span> "Thank you for your interest. We have decided to move forward with other creators who better match our current campaign needs."
                                    </div>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex items-center gap-3">
                                <button className="px-3 py-2 bg-zinc-950 border border-zinc-800 hover:border-zinc-600 rounded-sm text-[10px] font-mono text-zinc-400 hover:text-white transition-colors flex items-center gap-2 uppercase">
                                    <MessageSquare className="w-3 h-3" /> Message
                                </button>
                                <button className="p-2 bg-zinc-950 border border-zinc-800 hover:border-zinc-600 rounded-sm text-zinc-400 hover:text-white transition-colors">
                                    <ExternalLink className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
