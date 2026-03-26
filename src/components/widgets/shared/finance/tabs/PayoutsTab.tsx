import { CreditCard, Building2, Plus, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useFinanceMvp } from "@/components/widgets/shared/finance/FinanceMvpContext";

export function PayoutsTab() {
    const {
        availableToWithdraw,
        withdrawalAmount,
        setWithdrawalAmount,
        setMaxWithdrawalAmount,
        paymentMethods,
        selectedMethodId,
        cycleSelectedMethod,
        requestWithdrawal,
        addPaymentMethod,
        setDefaultMethod,
        payoutHistory,
        formatCurrency
    } = useFinanceMvp();
    const [statusMessage, setStatusMessage] = useState("Select destination and initiate transfer.");
    const selectedMethod = paymentMethods.find((method) => method.id === selectedMethodId) ?? paymentMethods[0];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Withdrawal & Methods */}
            <div className="lg:col-span-2 space-y-6">
                {/* Withdrawal Card */}
                <div className="tech-border p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <CreditCard className="w-32 h-32 text-zinc-500" />
                    </div>

                    <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider mb-6 relative z-10 flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-[#a3e635]" /> Request_Withdrawal
                    </h3>

                    <div className="relative z-10 space-y-6">
                        <div>
                            <label className="text-[10px] text-zinc-500 font-mono uppercase mb-2 block tracking-wider">Amount to Withdraw</label>
                            <div className="flex items-center gap-4">
                                <div className="flex-1 bg-zinc-950 border border-zinc-800 px-4 py-3 flex items-center focus-within:border-[#a3e635]/50 transition-colors">
                                    <span className="text-zinc-500 mr-2 font-mono">$</span>
                                    <input
                                        type="text"
                                        value={withdrawalAmount}
                                        onChange={(event) => setWithdrawalAmount(event.target.value)}
                                        className="bg-transparent border-none outline-none text-xl font-bold text-white font-mono w-full placeholder:text-zinc-800"
                                    />
                                </div>
                                <button
                                    onClick={setMaxWithdrawalAmount}
                                    className="text-[10px] font-bold text-[#a3e635] bg-[#a3e635]/10 px-4 py-3 border border-[#a3e635]/20 hover:bg-[#a3e635]/20 font-mono uppercase transition-colors"
                                >
                                    MAX
                                </button>
                            </div>
                            <p className="text-[10px] text-zinc-500 font-mono mt-2">Available Balance: <span className="text-white font-bold">{formatCurrency(availableToWithdraw)}</span></p>
                        </div>

                        <div>
                            <label className="text-[10px] text-zinc-500 font-mono uppercase mb-2 block tracking-wider">Destination</label>
                            <button
                                onClick={() => {
                                    cycleSelectedMethod();
                                    setStatusMessage("Destination changed to the next payout method.");
                                }}
                                className="w-full bg-zinc-950 border border-zinc-800 p-3 flex items-center justify-between cursor-pointer hover:border-[#a3e635]/30 transition-colors group/dest"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-zinc-900/50 flex items-center justify-center border border-zinc-800 group-hover/dest:border-zinc-700">
                                        {selectedMethod?.type === "bank" ? (
                                            <Building2 className="w-5 h-5 text-zinc-400 group-hover/dest:text-white transition-colors" />
                                        ) : (
                                            <CreditCard className="w-5 h-5 text-zinc-400 group-hover/dest:text-white transition-colors" />
                                        )}
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-white mb-0.5">{selectedMethod?.name}</div>
                                        <div className="text-[10px] text-zinc-500 font-mono">Click to cycle methods (1.5% fee)</div>
                                    </div>
                                </div>
                                <div className="w-8 h-8 flex items-center justify-center bg-zinc-900 border border-zinc-800 group-hover/dest:bg-[#a3e635] group-hover/dest:text-black transition-all">
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </button>
                        </div>

                        <button
                            onClick={() => {
                                const result = requestWithdrawal();
                                setStatusMessage(result.message);
                            }}
                            className="w-full py-4 bg-[#a3e635] text-black font-bold font-mono text-xs uppercase tracking-widest hover:bg-[#b2eb59] transition-colors relative overflow-hidden group/btn"
                        >
                            <span className="relative z-10">Initiate_Transfer</span>
                            <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300" />
                        </button>
                    </div>
                </div>

                {/* Payment Methods */}
                <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider">Payout_Methods</h3>
                        <button
                            onClick={() => {
                                addPaymentMethod();
                                setStatusMessage("New bank payout method added.");
                            }}
                            className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 hover:text-white transition-colors bg-zinc-950 px-3 py-1.5 rounded-sm border border-zinc-800"
                        >
                            <Plus className="w-3 h-3" /> ADD_NEW
                        </button>
                    </div>

                    <div className="space-y-3">
                        {paymentMethods.map((method) => (
                            <div key={method.id} className="flex items-center justify-between p-4 bg-zinc-950/30 border border-zinc-800 rounded-sm">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-sm bg-zinc-900 flex items-center justify-center border border-zinc-800 text-zinc-500">
                                        {method.type === "bank" ? <Building2 className="w-5 h-5" /> : <CreditCard className="w-5 h-5" />}
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-white flex items-center gap-2">
                                            {method.name}
                                            {method.default && <span className="text-[9px] bg-zinc-800 text-zinc-400 px-1.5 rounded-[1px] py-0.5 font-mono font-normal">DEFAULT</span>}
                                        </div>
                                        <div className="text-[10px] text-zinc-500 font-mono capitalize">{method.type} Account</div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        setDefaultMethod(method.id);
                                        setStatusMessage(`${method.name} set as default payout route.`);
                                    }}
                                    className="text-[10px] text-zinc-500 hover:text-white underline decoration-zinc-700 font-mono"
                                >
                                    {method.default ? "DEFAULT" : "SET_DEFAULT"}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Column: History */}
            <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-sm flex flex-col h-full">
                <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider mb-6">Payout_History</h3>

                <div className="flex-1 space-y-6 relative">
                    {/* Timeline Line */}
                    <div className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-zinc-800"></div>

                    {payoutHistory.map((payout) => (
                        <div key={payout.id} className="relative pl-6">
                            {/* Dot */}
                            <div className={cn(
                                "absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 bg-zinc-950 z-10",
                                payout.status === 'Processing' ? "border-[#a3e635] animate-pulse" : "border-zinc-700"
                            )} />

                            <div className="mb-1 flex justify-between items-start">
                                <span className="text-xs font-bold text-white">{formatCurrency(payout.amount)}</span>
                                <span className={cn(
                                    "text-[9px] font-mono px-1.5 py-0.5 rounded-sm uppercase border",
                                    payout.status === 'Processing' ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" : "bg-zinc-800 text-zinc-500 border-zinc-700"
                                )}>{payout.status}</span>
                            </div>
                            <div className="text-[10px] text-zinc-500 font-mono mb-1">{payout.date} via {payout.method}</div>
                            <div className="text-[10px] text-zinc-600 font-mono">ETA: {payout.eta}</div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 pt-6 border-t border-zinc-800">
                    <div className="flex gap-3 items-start p-3 bg-zinc-950/50 border border-zinc-800 rounded-sm">
                        <AlertCircle className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
                        <p className="text-[10px] text-zinc-500 font-mono leading-relaxed">
                            Payouts are processed daily. Allow 1-3 business days for bank transfers to appear in your account.
                        </p>
                    </div>
                    <div className="mt-3 flex gap-2 items-center text-[10px] text-[#a3e635] font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {statusMessage}
                    </div>
                </div>
            </div>
        </div>
    );
}
