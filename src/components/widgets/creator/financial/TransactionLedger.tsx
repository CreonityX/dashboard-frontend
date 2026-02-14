import { ArrowUpRight, ArrowDownLeft, Clock, CheckCircle2, Download } from "lucide-react";

export function TransactionLedger() {
    const transactions = [
        { id: "TX_9921", date: "TODAY", client: "NEO_CORP", amount: "+$850.00", status: "PENDING", type: "IN" },
        { id: "TX_9920", date: "YESTERDAY", client: "ARASAKA_IND", amount: "+$2,400.00", status: "CLEARED", type: "IN" },
        { id: "TX_9919", date: "OCT 24", client: "SERVICE_FEE", amount: "-$12.50", status: "CLEARED", type: "OUT" },
        { id: "TX_9918", date: "OCT 22", client: "WITHDRAWAL", amount: "-$4,000.00", status: "CLEARED", type: "OUT" },
        { id: "TX_9917", date: "OCT 18", client: "MILITECH_ARM", amount: "+$1,200.00", status: "CLEARED", type: "IN" },
    ];

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6">
                <h3 className="text-sm font-bold text-white font-display tracking-wide">LATEST_TRANSACTIONS</h3>
                <button className="text-[10px] text-[#a3e635] font-mono hover:text-white transition-colors flex items-center gap-1">
                    <Download className="w-3 h-3" /> EXPORT_CSV
                </button>
            </div>

            <div className="overflow-auto border-t border-white/5">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-white/5 sticky top-0">
                        <tr>
                            <th className="p-3 pl-6 text-[10px] font-mono text-zinc-500 font-normal">ID</th>
                            <th className="p-3 text-[10px] font-mono text-zinc-500 font-normal">ENTITY</th>
                            <th className="p-3 text-[10px] font-mono text-zinc-500 font-normal">DATE</th>
                            <th className="p-3 text-[10px] font-mono text-zinc-500 font-normal">STATUS</th>
                            <th className="p-3 pr-6 text-[10px] font-mono text-zinc-500 font-normal text-right">AMOUNT</th>
                        </tr>
                    </thead>
                    <tbody className="text-xs font-mono">
                        {transactions.map((tx) => (
                            <tr key={tx.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                                <td className="p-3 pl-6 text-zinc-500 group-hover:text-white transition-colors">{tx.id}</td>
                                <td className="p-3 font-bold text-white">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-1.5 h-1.5 rounded-full ${tx.type === 'IN' ? 'bg-[#a3e635]' : 'bg-red-500'}`}></div>
                                        {tx.client}
                                    </div>
                                </td>
                                <td className="p-3 text-zinc-500">{tx.date}</td>
                                <td className="p-3">
                                    {tx.status === 'PENDING' ? (
                                        <div className="inline-flex items-center gap-1.5 text-yellow-500 bg-yellow-500/10 px-1.5 py-0.5 rounded-[2px] text-[10px]">
                                            <Clock className="w-3 h-3" /> PENDING
                                        </div>
                                    ) : (
                                        <div className="inline-flex items-center gap-1.5 text-zinc-400 bg-zinc-800 px-1.5 py-0.5 rounded-[2px] text-[10px]">
                                            <CheckCircle2 className="w-3 h-3" /> CLEARED
                                        </div>
                                    )}
                                </td>
                                <td className={`p-3 pr-6 text-right font-bold ${tx.type === 'IN' ? 'text-white' : 'text-zinc-600'}`}>
                                    {tx.amount}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-auto p-4 border-t border-white/5 text-center">
                <button className="text-[10px] font-mono text-zinc-500 hover:text-white transition-colors">VIEW_ALL_ACTIVITY</button>
            </div>
        </div>
    );
}
