import { AlertTriangle, AlertCircle, CheckCircle } from "lucide-react";

export function BudgetAlerts() {
    return (
        <div className="flex flex-col h-full">
            <div className="p-6 pb-2">
                <h3 className="text-sm font-bold text-white font-display tracking-wide">BUDGET_ALERTS</h3>
            </div>

            <div className="flex-1 overflow-auto p-6 space-y-4">
                {/* Critical */}
                <div className="flex gap-3">
                    <div className="mt-0.5">
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                    </div>
                    <div>
                        <div className="text-xs font-bold text-white font-mono">CAMPAIGN_ALPHA_01</div>
                        <div className="text-[10px] text-zinc-400 mt-1">
                            Budget depleted 98%. Pausing in <span className="text-white">2 hours</span>.
                        </div>
                        <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-2 overflow-hidden">
                            <div className="bg-red-500 h-full w-[98%]"></div>
                        </div>
                    </div>
                </div>

                {/* Warning */}
                <div className="flex gap-3 pt-4 border-t border-white/5">
                    <div className="mt-0.5">
                        <AlertCircle className="w-4 h-4 text-yellow-500" />
                    </div>
                    <div>
                        <div className="text-xs font-bold text-white font-mono">INFLUENCER_BLITZ</div>
                        <div className="text-[10px] text-zinc-400 mt-1">
                            High burn rate detected. Projected to deplete by <span className="text-white">Friday</span>.
                        </div>
                        <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-2 overflow-hidden">
                            <div className="bg-yellow-500 h-full w-[75%]"></div>
                        </div>
                    </div>
                </div>

                {/* Safe */}
                <div className="flex gap-3 pt-4 border-t border-white/5 opacity-50 hover:opacity-100 transition-opacity">
                    <div className="mt-0.5">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                    </div>
                    <div>
                        <div className="text-xs font-bold text-white font-mono">Q4_RETARGETING</div>
                        <div className="text-[10px] text-zinc-400 mt-1">
                            Spending within limits.
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-4 border-t border-white/5">
                <button className="w-full py-2 border border-zinc-800 bg-zinc-900 text-xs font-mono text-zinc-300 hover:text-white hover:border-zinc-500 transition-all rounded-sm">
                    ADJUST_CAPS
                </button>
            </div>
        </div>
    );
}
