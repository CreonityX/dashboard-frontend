import { ArrowUpRight, ArrowDownLeft, Clock } from "lucide-react";
import { GlassTechCard } from "../GlassTechCard";

const TRANSACTIONS = [
    { id: "TX_8829", entity: "Stripe_Inc", status: "completed", amount: "+$4,290", type: "in" },
    { id: "TX_8828", entity: "Adobe_Sub", status: "completed", amount: "-$59.99", type: "out" },
    { id: "TX_8827", entity: "Upwork_Escrow", status: "pending", amount: "$850.00", type: "pending" },
    { id: "TX_8826", entity: "AWS_Cloud", status: "completed", amount: "-$142.50", type: "out" },
    { id: "TX_8825", entity: "Client_Refund", status: "failed", amount: "-$250.00", type: "out" },
];

export function TransactionList() {
    return (
        <GlassTechCard title="Ledger_Log" description="RECENT_ACTIVITY" className="h-full">
            <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse">
                    <tbody className="divide-y divide-white/5 text-xs font-mono">
                        {TRANSACTIONS.map((tx) => (
                            <tr key={tx.id} className="group hover:bg-white/5 transition-colors">
                                <td className="py-3 pl-2">
                                    <div className="flex items-center gap-2">
                                        {tx.type === 'in' ? <div className="p-1 bg-[#a3e635]/10 rounded-sm"><ArrowDownLeft className="w-3 h-3 text-[#a3e635]" /></div> :
                                            tx.type === 'out' ? <div className="p-1 bg-white/5 rounded-sm"><ArrowUpRight className="w-3 h-3 text-zinc-500" /></div> :
                                                <div className="p-1 bg-yellow-500/10 rounded-sm"><Clock className="w-3 h-3 text-yellow-500" /></div>}
                                        <div className="flex flex-col">
                                            <span className="text-zinc-300 font-bold group-hover:text-white transition-colors">{tx.entity}</span>
                                            <span className="text-[8px] text-zinc-600">{tx.id}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className={`py-3 pr-2 text-right font-bold ${tx.type === 'in' ? 'text-white' : 'text-zinc-500'}`}>
                                    {tx.amount}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </GlassTechCard>
    );
}
