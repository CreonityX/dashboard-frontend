import { CreditCard, Banknote, CalendarDays, Settings2, Wallet } from "lucide-react";

export function PayoutManager() {
    return (
        <div className="flex flex-col h-full p-6">
            <h3 className="text-sm font-bold text-white font-display tracking-wide mb-6">PAYOUT_SETTINGS</h3>

            {/* Next Payout Card */}
            <div className="mb-6 bg-gradient-to-br from-[#a3e635]/20 to-transparent border border-[#a3e635]/30 p-4 rounded-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-20">
                    <Banknote className="w-16 h-16 text-[#a3e635]" />
                </div>
                <div className="relative z-10">
                    <div className="text-[10px] font-mono text-[#a3e635] mb-1">NEXT_SCHEDULED_PAYOUT</div>
                    <div className="text-2xl font-display font-black text-white">NOV 01, 2026</div>
                    <div className="text-xs font-mono text-zinc-400 mt-1">EST. AMOUNT: <span className="text-white">$4,820.00</span></div>
                </div>
            </div>

            {/* Methods */}
            <div className="space-y-3 mb-6">
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2">ACTIVE_METHODS</div>

                <div className="flex items-center justify-between p-3 bg-zinc-900/50 border border-zinc-800 rounded-sm hover:border-zinc-600 transition-colors group cursor-pointer">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-black border border-zinc-700 rounded-sm flex items-center justify-center">
                            <CreditCard className="w-4 h-4 text-purple-400" />
                        </div>
                        <div>
                            <div className="text-xs font-bold text-white font-mono">STRIPE_CONNECT</div>
                            <div className="text-[10px] text-zinc-500 font-mono">**** 4242</div>
                        </div>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-[#a3e635] shadow-[0_0_8px_rgba(163,230,53,0.5)]"></div>
                </div>

                <div className="flex items-center justify-between p-3 bg-zinc-900/50 border border-zinc-800 rounded-sm hover:border-zinc-600 transition-colors group cursor-pointer opacity-60 hover:opacity-100">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-black border border-zinc-700 rounded-sm flex items-center justify-center">
                            <Wallet className="w-4 h-4 text-blue-400" />
                        </div>
                        <div>
                            <div className="text-xs font-bold text-white font-mono">PAYPAL</div>
                            <div className="text-[10px] text-zinc-500 font-mono">user@example.com</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-auto space-y-2">
                <button className="w-full flex items-center justify-center gap-2 py-2 border border-zinc-800 bg-zinc-950 text-zinc-400 font-mono text-xs hover:text-white hover:border-zinc-600 transition-all rounded-sm">
                    <Settings2 className="w-3 h-3" /> MANAGE_METHODS
                </button>
            </div>
        </div>
    );
}
