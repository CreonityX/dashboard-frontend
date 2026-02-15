import { ArrowDownLeft, ArrowUpRight, Search, Filter, Download, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const TRANSACTIONS = [
    { id: 'TX-8821', date: 'Feb 12, 2026', desc: 'Nike - Air Max Launch', type: 'credit', amount: '+$4,500.00', status: 'completed', brand: 'Nike' },
    { id: 'TX-8820', date: 'Feb 10, 2026', desc: 'Withdrawal to Chase Bank', type: 'debit', amount: '-$2,100.00', status: 'completed', brand: 'Transfer' },
    { id: 'TX-8819', date: 'Feb 08, 2026', desc: 'Samsung - Galaxy S26', type: 'credit', amount: '+$3,200.00', status: 'pending', brand: 'Samsung' },
    { id: 'TX-8818', date: 'Feb 05, 2026', desc: 'Adobe - Creative Cloud', type: 'credit', amount: '+$1,800.00', status: 'completed', brand: 'Adobe' },
    { id: 'TX-8817', date: 'Feb 01, 2026', desc: 'Monthly Subscription', type: 'debit', amount: '-$29.00', status: 'completed', brand: 'Service' },
];

export function TransactionsTab() {
    return (
        <div className="space-y-6">
            {/* Header & Controls */}
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-end">
                    <div>
                        <h2 className="text-lg font-bold text-white font-display tracking-wide">TRANSACTION_LEDGER</h2>
                        <p className="text-zinc-500 font-mono text-xs">HISTORY // {TRANSACTIONS.length}_RECORDS</p>
                    </div>
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-sm text-[10px] font-mono text-zinc-400 hover:text-white transition-colors uppercase">
                        <Download className="w-3 h-3" /> Export_CSV
                    </button>
                </div>

                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row gap-3 p-1 bg-zinc-900/40 border border-zinc-800 rounded-sm">
                    {/* Search */}
                    <div className="flex-1 relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                        <input
                            type="text"
                            placeholder="SEARCH_ID_OR_BRAND..."
                            className="w-full bg-zinc-950/50 border border-zinc-800 rounded-sm pl-9 pr-3 py-2 text-xs text-white font-mono placeholder:text-zinc-700 focus:outline-none focus:border-[#a3e635]/50 transition-colors"
                        />
                    </div>

                    {/* Filters */}
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-3 py-2 bg-zinc-950/50 border border-zinc-800 hover:bg-zinc-900 rounded-sm text-xs text-zinc-400 font-mono transition-colors">
                            <Filter className="w-3.5 h-3.5" />
                            TYPE: ALL
                        </button>
                        <button className="flex items-center gap-2 px-3 py-2 bg-zinc-950/50 border border-zinc-800 hover:bg-zinc-900 rounded-sm text-xs text-zinc-400 font-mono transition-colors">
                            STATUS: ALL
                        </button>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-sm overflow-hidden">
                <div className="grid grid-cols-12 px-4 py-3 bg-zinc-950/30 text-[9px] font-mono text-zinc-500 uppercase tracking-wider border-b border-zinc-800">
                    <div className="col-span-2">Date / ID</div>
                    <div className="col-span-5">Description</div>
                    <div className="col-span-2 text-center">Status</div>
                    <div className="col-span-2 text-right">Amount</div>
                    <div className="col-span-1 text-right">Invoice</div>
                </div>

                <div className="divide-y divide-zinc-800">
                    {TRANSACTIONS.map((tx) => (
                        <div key={tx.id} className="grid grid-cols-12 px-4 py-4 items-center hover:bg-zinc-800/30 transition-colors group">
                            {/* Date/ID */}
                            <div className="col-span-2">
                                <div className="text-xs font-bold text-white">{tx.date}</div>
                                <div className="text-[10px] text-zinc-600 font-mono">{tx.id}</div>
                            </div>

                            {/* Description */}
                            <div className="col-span-5 flex items-center gap-3">
                                <div className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center border",
                                    tx.type === 'credit' ? "bg-[#a3e635]/10 border-[#a3e635]/20 text-[#a3e635]" : "bg-zinc-800 border-zinc-700 text-zinc-400"
                                )}>
                                    {tx.type === 'credit' ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-zinc-200">{tx.desc}</div>
                                    <div className="text-[10px] text-zinc-500 font-mono">{tx.brand}</div>
                                </div>
                            </div>

                            {/* Status */}
                            <div className="col-span-2 text-center">
                                <span className={cn(
                                    "text-[9px] font-bold font-mono px-2 py-0.5 rounded-sm uppercase border",
                                    tx.status === 'completed'
                                        ? "bg-zinc-900 text-zinc-400 border-zinc-700"
                                        : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                                )}>
                                    {tx.status}
                                </span>
                            </div>

                            {/* Amount */}
                            <div className="col-span-2 text-right">
                                <span className={cn(
                                    "text-sm font-bold font-mono",
                                    tx.type === 'credit' ? "text-[#a3e635]" : "text-white"
                                )}>
                                    {tx.amount}
                                </span>
                            </div>

                            {/* Action */}
                            <div className="col-span-1 flex justify-end">
                                <button className="p-1.5 hover:bg-zinc-800 rounded-sm text-zinc-600 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                                    <FileText className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pagination Mock */}
            <div className="flex justify-between items-center text-[10px] font-mono text-zinc-600">
                <span>SHOWING 1-5 OF 42</span>
                <div className="flex gap-2">
                    <button className="hover:text-white">PREV</button>
                    <span className="text-zinc-400">1</span>
                    <button className="hover:text-white">2</button>
                    <button className="hover:text-white">3</button>
                    <button className="hover:text-white">NEXT</button>
                </div>
            </div>
        </div>
    );
}
