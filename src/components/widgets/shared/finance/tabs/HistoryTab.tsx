"use client";

import { useState } from "react";
import { Search, Filter, Download, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { PAYMENT_HISTORY } from "@/lib/brand-data";

const formatCurrency = (n: number) => `$${n.toLocaleString()}`;

export function HistoryTab() {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");

    const filtered = PAYMENT_HISTORY.filter(tx => {
        if (search) {
            const q = search.toLowerCase();
            if (!tx.creator.toLowerCase().includes(q) &&
                !tx.campaign.toLowerCase().includes(q) &&
                !tx.id.toLowerCase().includes(q)) return false;
        }
        if (statusFilter !== "all" && tx.status !== statusFilter) return false;
        return true;
    });

    return (
        <div className="space-y-6">
            {/* Controls */}
            <div className="flex flex-wrap justify-between items-center gap-4">
                <div className="flex flex-wrap gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
                        <input
                            type="text"
                            placeholder="Search by creator, campaign..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-9 pr-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-xs text-white font-mono w-64 focus:outline-none focus:border-[#a3e635]"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-xs text-zinc-400 font-mono focus:border-[#a3e635] focus:outline-none"
                    >
                        <option value="all">Status: All</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                        <option value="failed">Failed</option>
                    </select>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-sm text-[10px] font-mono text-zinc-400 hover:text-white transition-colors">
                        <Download className="w-3 h-3" /> Export CSV
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-sm text-[10px] font-mono text-zinc-400 hover:text-white transition-colors">
                        Export Excel
                    </button>
                </div>
            </div>

            {/* Transaction Log */}
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-zinc-800 bg-zinc-900/60">
                    <h3 className="text-xs font-bold text-zinc-300 font-display tracking-widest uppercase">Transaction_Log</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[700px]">
                        <thead>
                            <tr className="border-b border-zinc-800 bg-zinc-950/30 text-[9px] font-mono text-zinc-500 uppercase">
                                <th className="px-4 py-2 text-left">Date</th>
                                <th className="px-4 py-2 text-left">Creator</th>
                                <th className="px-4 py-2 text-left">Campaign</th>
                                <th className="px-4 py-2 text-right">Amount</th>
                                <th className="px-4 py-2 text-left">Method</th>
                                <th className="px-4 py-2 text-center">Status</th>
                                <th className="px-4 py-2 text-right">Invoice</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(tx => (
                                <tr key={tx.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/20 group">
                                    <td className="px-4 py-3 text-xs font-mono text-zinc-400">{tx.date}</td>
                                    <td className="px-4 py-3 text-xs font-bold text-white">{tx.creator}</td>
                                    <td className="px-4 py-3 text-xs text-zinc-400 font-mono">{tx.campaign}</td>
                                    <td className="px-4 py-3 text-right text-xs font-bold text-[#a3e635] font-mono">{formatCurrency(tx.amount)}</td>
                                    <td className="px-4 py-3 text-xs text-zinc-500 font-mono">{tx.method}</td>
                                    <td className="px-4 py-3 text-center">
                                        <span className={cn(
                                            "text-[9px] font-mono px-2 py-0.5 rounded-sm uppercase",
                                            tx.status === 'completed' && "bg-[#a3e635]/10 text-[#a3e635] border border-[#a3e635]/20",
                                            tx.status === 'pending' && "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20",
                                            tx.status === 'failed' && "bg-red-500/10 text-red-500 border border-red-500/20"
                                        )}>
                                            {tx.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <button className="p-1.5 hover:bg-zinc-800 rounded-sm text-zinc-500 hover:text-[#a3e635] opacity-0 group-hover:opacity-100 transition-all">
                                            <FileText className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="px-4 py-2 border-t border-zinc-800 text-[10px] font-mono text-zinc-600">
                    Showing {filtered.length} of {PAYMENT_HISTORY.length}
                </div>
            </div>
        </div>
    );
}
