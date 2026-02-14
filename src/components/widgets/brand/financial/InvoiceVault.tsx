import { FileText, Download, Clock, Printer } from "lucide-react";

export function InvoiceVault() {
    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 pb-4">
                <h3 className="text-sm font-bold text-white font-display tracking-wide">INVOICE_VAULT</h3>
                <button className="text-[10px] text-zinc-500 font-mono hover:text-white transition-colors">
                    MANAGE_BILLING
                </button>
            </div>

            <div className="flex-1 overflow-auto px-6 space-y-3 pb-6">
                {[
                    { id: "INV-2024-001", amount: "$12,450.00", date: "OCT 24", status: "PAID" },
                    { id: "INV-2024-002", amount: "$8,200.00", date: "SEP 15", status: "PAID" },
                    { id: "INV-2024-003", amount: "$4,100.00", date: "DUE NOV 01", status: "UNPAID" },
                    { id: "INV-2024-004", amount: "$15,000.00", date: "Processing", status: "PENDING" },
                ].map((inv) => (
                    <div key={inv.id} className="group relative bg-zinc-900/40 border border-zinc-800 p-3 rounded-sm hover:border-zinc-600 transition-all">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 bg-zinc-800 rounded-[2px]">
                                    <FileText className="w-3 h-3 text-zinc-400" />
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-white font-mono">{inv.id}</div>
                                    <div className="text-[10px] text-zinc-500 font-mono">{inv.date}</div>
                                </div>
                            </div>
                            <div className={`text-[10px] font-mono px-1.5 py-0.5 rounded-[2px] ${inv.status === 'PAID' ? 'text-zinc-500 bg-zinc-800' :
                                inv.status === 'UNPAID' ? 'text-red-400 bg-red-900/20' :
                                    'text-yellow-500 bg-yellow-900/20'
                                }`}>
                                {inv.status}
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="text-sm font-mono text-white">{inv.amount}</div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-1 hover:bg-[#a3e635] hover:text-black rounded-[2px] text-zinc-400 transition-colors">
                                    <Download className="w-3 h-3" />
                                </button>
                                <button className="p-1 hover:bg-white hover:text-black rounded-[2px] text-zinc-400 transition-colors">
                                    <Printer className="w-3 h-3" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-6 border-t border-white/5 bg-yellow-500/5">
                <div className="flex gap-3 items-start">
                    <Clock className="w-4 h-4 text-yellow-500 mt-0.5" />
                    <div>
                        <div className="text-[10px] font-bold text-yellow-500 font-mono mb-1">PAYMENT_DUE</div>
                        <p className="text-[10px] text-zinc-400 leading-relaxed">
                            Invoice #INV-2024-003 is due in 12 days. Please ensure payment method is updated.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
