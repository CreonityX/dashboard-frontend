import { useMemo, useState } from "react";
import { Check, Download, Plus, Send, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFinanceMvp } from "@/components/widgets/shared/finance/FinanceMvpContext";

function downloadFile(fileName: string, content: string, type: string) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
}

export function InvoicesTab() {
    const { invoices, createInvoice, sendInvoice, markInvoicePaid, getInvoiceDownloadText, formatCurrency } = useFinanceMvp();
    const [showOnlyOpen, setShowOnlyOpen] = useState(false);
    const [statusMessage, setStatusMessage] = useState("Invoice operations are synced to finance state.");

    const rows = useMemo(
        () => (showOnlyOpen ? invoices.filter((invoice) => invoice.status !== "paid") : invoices),
        [invoices, showOnlyOpen]
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-end gap-3">
                    <button
                        onClick={() => {
                            setShowOnlyOpen((current) => !current);
                            setStatusMessage(showOnlyOpen ? "Displaying all invoices." : "Showing only draft/sent invoices.");
                        }}
                        className="flex items-center gap-2 px-3 py-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-sm text-xs text-zinc-400 hover:text-white transition-colors"
                    >
                        <Settings className="w-4 h-4" /> Settings
                    </button>
                    <button
                        onClick={() => {
                            const created = createInvoice();
                            setStatusMessage(`Invoice ${created.id} created in draft mode.`);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-[#a3e635] text-black text-xs font-bold font-mono rounded-[2px] uppercase hover:bg-[#a3e635]/90 transition-all"
                    >
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
                    {rows.map((invoice) => (
                        <div key={invoice.id} className="grid grid-cols-6 px-6 py-4 items-center hover:bg-zinc-800/30 transition-colors group">
                            <div className="font-mono text-zinc-400 text-xs">{invoice.id}</div>
                            <div className="col-span-2">
                                <div className="font-bold text-white">{invoice.client}</div>
                                <div className="text-[10px] text-zinc-600 font-mono">{invoice.campaign}</div>
                            </div>
                            <div className="text-xs text-zinc-400 font-mono">{invoice.dateIssued}</div>
                            <div className="text-right">
                                <div className="font-bold text-white text-xs">{formatCurrency(invoice.amount)}</div>
                                <div className={cn(
                                    "text-[9px] font-mono uppercase",
                                    invoice.status === "paid" ? "text-[#a3e635]" : "text-yellow-500"
                                )}>
                                    {invoice.status}
                                </div>
                            </div>
                            <div className="flex justify-end gap-2 text-zinc-500">
                                <button
                                    onClick={() => {
                                        const sent = sendInvoice(invoice.id);
                                        setStatusMessage(sent ? `${invoice.id} sent to ${invoice.client}.` : `${invoice.id} is already sent or paid.`);
                                    }}
                                    className="p-1.5 hover:bg-zinc-800 rounded-sm hover:text-white"
                                    title="Send invoice"
                                >
                                    <Send className="w-3.5 h-3.5" />
                                </button>
                                <button
                                    onClick={() => {
                                        downloadFile(`${invoice.id}.txt`, getInvoiceDownloadText(invoice.id), "text/plain;charset=utf-8");
                                        setStatusMessage(`${invoice.id} downloaded.`);
                                    }}
                                    className="p-1.5 hover:bg-zinc-800 rounded-sm hover:text-[#a3e635]"
                                    title="Download invoice"
                                >
                                    <Download className="w-3.5 h-3.5" />
                                </button>
                                <button
                                    onClick={() => {
                                        const paid = markInvoicePaid(invoice.id);
                                        setStatusMessage(paid ? `${invoice.id} marked as paid.` : `${invoice.id} already marked paid.`);
                                    }}
                                    className="p-1.5 hover:bg-zinc-800 rounded-sm hover:text-[#a3e635]"
                                    title="Mark paid"
                                >
                                    <Check className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">{statusMessage}</div>
        </div>
    );
}
