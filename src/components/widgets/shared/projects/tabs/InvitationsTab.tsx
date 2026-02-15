import { Mail, ArrowRight, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const INVITES = [
    {
        id: 1,
        brand: "Dyson",
        title: "Product Launch - Tech Reviewer",
        offer: "$3,500",
        message: "We love your recent tech content and think you'd be perfect for our new Airwrap launch campaign.",
        deadline: "Respond by Feb 20",
        logoBg: "bg-black text-white"
    },
    {
        id: 2,
        brand: "Canva",
        title: "Design Tutorials Series",
        offer: "$2,000",
        message: "Looking for creators to showcase our new AI magic edit features.",
        deadline: "Respond by Feb 18",
        logoBg: "bg-[#00C4CC] text-white"
    }
];

export function InvitationsTab() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-lg font-bold text-white font-display tracking-wide">Direct_Invitations</h2>
                <p className="text-zinc-500 font-mono text-xs">EXCLUSIVE_OFFERS // {INVITES.length}_PENDING</p>
            </div>

            <div className="space-y-4 max-w-2xl">
                {INVITES.map((invite) => (
                    <div key={invite.id} className="bg-zinc-900/40 border border-zinc-800 rounded-sm p-6 relative overflow-hidden group">
                        {/* Decor */}
                        <div className="absolute top-0 left-0 w-1 h-full bg-[#a3e635]" />

                        <div className="flex items-start gap-4 mb-4">
                            <div className={cn("w-12 h-12 rounded-sm flex items-center justify-center text-sm font-bold tracking-tighter border border-zinc-700/50 shrink-0", invite.logoBg)}>
                                {invite.brand[0]}
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                                    {invite.brand}
                                    <span className="text-[9px] bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded-sm font-mono font-normal">VERIFIED_BRAND</span>
                                </h3>
                                <div className="text-xs text-zinc-300 font-medium">{invite.title}</div>
                            </div>
                            <div className="ml-auto text-right">
                                <div className="text-sm font-bold text-[#a3e635] font-mono">{invite.offer}</div>
                                <div className="text-[9px] text-zinc-500 font-mono uppercase">Offered</div>
                            </div>
                        </div>

                        <div className="bg-zinc-950/50 p-4 rounded-sm border border-zinc-800/50 mb-5 relative">
                            <Mail className="absolute top-4 left-4 w-4 h-4 text-zinc-700" />
                            <p className="text-xs text-zinc-400 pl-8 leading-relaxed italic">
                                "{invite.message}"
                            </p>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="text-[10px] text-zinc-600 font-mono flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse" />
                                {invite.deadline}
                            </div>
                            <div className="flex gap-3">
                                <button className=" px-4 py-2 bg-zinc-950 border border-zinc-800 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-500 rounded-sm text-xs font-bold font-mono uppercase transition-colors flex items-center gap-2">
                                    <X className="w-3.5 h-3.5" /> Decline
                                </button>
                                <button className=" px-4 py-2 bg-[#a3e635] text-black border border-[#a3e635] rounded-sm text-xs font-bold font-mono uppercase hover:opacity-90 transition-colors flex items-center gap-2">
                                    <Check className="w-3.5 h-3.5" /> Accept_Offer
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
