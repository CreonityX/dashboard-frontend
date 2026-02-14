import { BadgeCheck, Clock, Briefcase, ChevronRight, DollarSign } from "lucide-react";

export function GigBoard() {
    return (
        <div className="h-full flex flex-col bg-black/20">
            {/* Tabs / Filters (Visual Only) */}
            <div className="flex border-b border-white/5">
                <button className="flex-1 py-3 text-xs font-bold text-white border-b-2 border-[#a3e635] bg-white/5">
                    ACTIVE (3)
                </button>
                <button className="flex-1 py-3 text-xs font-bold text-zinc-500 hover:text-white transition-colors">
                    PENDING (5)
                </button>
                <button className="flex-1 py-3 text-xs font-bold text-zinc-500 hover:text-white transition-colors">
                    COMPLETED
                </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">

                {/* Card 1 */}
                <GigCard
                    title="Cyberpunk Aesthetic Reel"
                    brand="Neon Motors"
                    status="IN_PROGRESS"
                    deadline="2 Days"
                    payout="$2,500"
                />
                {/* Card 2 */}
                <GigCard
                    title="UGC Unboxing Series"
                    brand="TechGear Inc"
                    status="REVIEW"
                    deadline="12 Hrs"
                    payout="$850"
                />
                {/* Card 3 */}
                <GigCard
                    title="Global Brand Ambassador"
                    brand="Vogue Future"
                    status="NEW_OFFER"
                    deadline="Accept in 24h"
                    payout="$15k"
                />
            </div>

            {/* Footer Action */}
            <div className="p-3 border-t border-white/5 bg-zinc-900/50">
                <button className="w-full py-2 bg-[#a3e635] hover:bg-[#b0f545] text-black font-bold text-xs font-mono uppercase tracking-wide transition-colors flex items-center justify-center gap-2">
                    <Briefcase className="w-3 h-3" /> Find_More_Gigs
                </button>
            </div>
        </div>
    );
}

function GigCard({ title, brand, status, deadline, payout }: any) {
    const statusColor =
        status === "IN_PROGRESS" ? "text-amber-500 bg-amber-500/10 border-amber-500/20" :
            status === "REVIEW" ? "text-blue-500 bg-blue-500/10 border-blue-500/20" :
                "text-[#a3e635] bg-[#a3e635]/10 border-[#a3e635]/20";

    return (
        <div className="group p-4 bg-zinc-900/40 border border-zinc-800 hover:border-zinc-600 transition-all rounded-sm hover:translate-x-1">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <BadgeCheck className="w-3 h-3 text-[#a3e635]" />
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">{brand}</span>
                    </div>
                    <h4 className="font-bold text-sm text-white leading-tight group-hover:text-[#a3e635] transition-colors">{title}</h4>
                </div>
                <div className="bg-zinc-950 border border-zinc-800 px-2 py-1 rounded-sm">
                    <span className="font-mono text-xs font-bold text-white">{payout}</span>
                </div>
            </div>

            <div className="flex items-center justify-between mt-4">
                <div className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${statusColor}`}>
                    {status}
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-500">
                    <Clock className="w-3 h-3" /> {deadline}
                </div>
            </div>
        </div>
    )
}
