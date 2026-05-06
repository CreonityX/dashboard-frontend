"use client";

import { useState } from "react";
import { CreditCard, Calendar, Check, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { PENDING_PAYMENTS, SCHEDULED_PAYMENTS } from "@/lib/brand-data";

const formatCurrency = (n: number) => `$${n.toLocaleString()}`;

export function PaymentsTab() {
    const [selected, setSelected] = useState<Set<string>>(new Set());
    const [showBulkModal, setShowBulkModal] = useState(false);

    const toggleSelect = (id: string) => {
        setSelected(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const selectAll = () => {
        if (selected.size === PENDING_PAYMENTS.length) setSelected(new Set());
        else setSelected(new Set(PENDING_PAYMENTS.map(p => p.id)));
    };

    const totalSelected = Array.from(selected).reduce((sum, id) => {
        const p = PENDING_PAYMENTS.find(x => x.id === id);
        return sum + (p?.amount ?? 0);
    }, 0);

    return (
        <div className="space-y-6">
            {/* Pending Payments Table */}
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-zinc-800 bg-zinc-900/60 flex justify-between items-center">
                    <h3 className="text-xs font-bold text-zinc-300 font-display tracking-widest uppercase flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-[#a3e635]" /> Pending_Payments
                    </h3>
                    <div className="flex gap-2">
                        {selected.size > 0 && (
                            <button
                                onClick={() => setShowBulkModal(true)}
                                className="px-3 py-1.5 bg-[#a3e635] text-black text-[10px] font-bold font-mono uppercase rounded-sm"
                            >
                                Process Bulk ({selected.size})
                            </button>
                        )}
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px]">
                        <thead>
                            <tr className="border-b border-zinc-800 bg-zinc-950/30">
                                <th className="px-4 py-2 text-left">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" checked={selected.size === PENDING_PAYMENTS.length} onChange={selectAll} className="rounded border-zinc-600 text-[#a3e635]" />
                                        <span className="text-[9px] font-mono text-zinc-500 uppercase">Select</span>
                                    </label>
                                </th>
                                <th className="px-4 py-2 text-left text-[9px] font-mono text-zinc-500 uppercase">Creator</th>
                                <th className="px-4 py-2 text-left text-[9px] font-mono text-zinc-500 uppercase">Campaign</th>
                                <th className="px-4 py-2 text-right text-[9px] font-mono text-zinc-500 uppercase">Amount</th>
                                <th className="px-4 py-2 text-left text-[9px] font-mono text-zinc-500 uppercase">Due Date</th>
                                <th className="px-4 py-2 text-center text-[9px] font-mono text-zinc-500 uppercase">Milestones</th>
                                <th className="px-4 py-2 text-right text-[9px] font-mono text-zinc-500 uppercase">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {PENDING_PAYMENTS.map(p => (
                                <tr key={p.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/20">
                                    <td className="px-4 py-3">
                                        <input
                                            type="checkbox"
                                            checked={selected.has(p.id)}
                                            onChange={() => toggleSelect(p.id)}
                                            className="rounded border-zinc-600 text-[#a3e635]"
                                        />
                                    </td>
                                    <td className="px-4 py-3 text-xs font-bold text-white">{p.creator}</td>
                                    <td className="px-4 py-3 text-xs text-zinc-400 font-mono">{p.campaign}</td>
                                    <td className="px-4 py-3 text-right text-xs font-bold text-[#a3e635] font-mono">{formatCurrency(p.amount)}</td>
                                    <td className="px-4 py-3 text-xs text-zinc-500 font-mono">{p.dueDate}</td>
                                    <td className="px-4 py-3 text-center text-[10px] font-mono text-zinc-400">{p.milestones}</td>
                                    <td className="px-4 py-3 text-right">
                                        <button className="px-2 py-1 bg-[#a3e635]/10 border border-[#a3e635]/30 text-[#a3e635] text-[10px] font-mono uppercase rounded-sm hover:bg-[#a3e635]/20 transition-colors">
                                            Approve
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Scheduled Payments */}
            <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-sm">
                <h3 className="text-xs font-bold text-zinc-400 font-display tracking-widest uppercase mb-4 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-purple-500" /> Scheduled_Payments
                </h3>
                <div className="space-y-2">
                    {SCHEDULED_PAYMENTS.map(p => (
                        <div key={p.id} className="flex items-center justify-between p-3 bg-zinc-950/50 border border-zinc-800 rounded-sm">
                            <div>
                                <div className="text-xs font-bold text-white">{p.creator}</div>
                                <div className="text-[10px] text-zinc-500 font-mono">{p.campaign} • {p.scheduledDate}</div>
                            </div>
                            <div className="text-xs font-bold text-[#a3e635] font-mono">{formatCurrency(p.amount)}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bulk Payment Modal */}
            {showBulkModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                    <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-sm p-6">
                        <h3 className="text-sm font-bold text-white font-display uppercase mb-4">Process_Bulk_Payment</h3>
                        <p className="text-xs text-zinc-400 font-mono mb-4">
                            Pay {selected.size} creator(s) • Total: {formatCurrency(totalSelected)}
                        </p>
                        <div className="flex gap-2 justify-end">
                            <button onClick={() => setShowBulkModal(false)} className="px-4 py-2 text-xs font-mono text-zinc-400 border border-zinc-800 rounded-sm hover:bg-zinc-800">
                                Cancel
                            </button>
                            <button className="px-4 py-2 bg-[#a3e635] text-black text-xs font-bold font-mono uppercase rounded-sm">
                                Confirm_Payment
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
