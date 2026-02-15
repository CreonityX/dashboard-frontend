import { FileText, Plus, Download, Send, Settings, Check } from "lucide-react";

export function InvoicesTab() {
    return (
        <div className="space-y-6">
            <div className="flex justify-end gap-3">
                    <button className="flex items-center gap-2 px-3 py-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-sm text-xs text-zinc-400 hover:text-white transition-colors">
                        <Settings className="w-4 h-4" /> Settings
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#a3e635] text-black text-xs font-bold font-mono rounded-[2px] uppercase hover:bg-[#a3e635]/90 transition-all">
                        <Plus className="w-4 h-4" /> Create_Invoice
                    </button>
            </div>

            <div className="bg-zinc-900/40 border border-zinc-800 rounded-sm overflow-hidden text-sm">
                <div className="grid grid-cols-6 px-6 py-3 bg-zinc-950/30 text-[10px] font-mono text-zinc-500 uppercase tracking-wider border-b border-zinc-800">
                    <div className="col-span-1">Invoice #</div>
                    <div className="col-span-2">Client / Brand</div>
                    <div className="col-span-1">Date Issued</div>
                    <div className="col-span-1 text-right">Amount</div>
                    <div className="col-span-1 text-right">Actions</div>
                </div>

                <div className="divide-y divide-zinc-800">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="grid grid-cols-6 px-6 py-4 items-center hover:bg-zinc-800/30 transition-colors group">
                            <div className="font-mono text-zinc-400 text-xs">INV-2026-00{i}</div>
                            <div className="col-span-2">
                                <div className="font-bold text-white">Brand Name {i}</div>
                                <div className="text-[10px] text-zinc-600 font-mono">Campaign Alpha</div>
                            </div>
                            <div className="text-xs text-zinc-400 font-mono">Feb {10 - i}, 2026</div>
                            <div className="text-right font-bold text-white text-xs">${(i * 1200) + 500}.00</div>
                            <div className="flex justify-end gap-2 text-zinc-500">
                                <button className="p-1.5 hover:bg-zinc-800 rounded-sm hover:text-white"><Send className="w-3.5 h-3.5" /></button>
                                <button className="p-1.5 hover:bg-zinc-800 rounded-sm hover:text-[#a3e635]"><Download className="w-3.5 h-3.5" /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
