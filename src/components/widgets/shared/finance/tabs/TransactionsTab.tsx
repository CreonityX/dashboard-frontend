import { useMemo, useState } from "react";
import { ArrowDownLeft, ArrowUpRight, Search, Filter, Download, FileText } from "lucide-react";
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

export function TransactionsTab() {
    const {
        searchQuery,
        setSearchQuery,
        cycleTypeFilter,
        cycleStatusFilter,
        transactionTypeFilter,
        transactionStatusFilter,
        filteredTransactions,
        getTransactionsCsv,
        getInvoiceDownloadText,
        formatCurrency
    } = useFinanceMvp();
    const [page, setPage] = useState(1);
    const [actionMessage, setActionMessage] = useState("Filtering is active across this transaction feed.");

    const perPage = 5;
    const totalPages = Math.max(1, Math.ceil(filteredTransactions.length / perPage));
    const currentPage = Math.min(page, totalPages);
    const visibleRows = useMemo(
        () => filteredTransactions.slice((currentPage - 1) * perPage, currentPage * perPage),
        [currentPage, filteredTransactions]
    );

    return (
        <div className="space-y-6">
            {/* Controls */}
            <div className="flex justify-end">
                <button
                    onClick={() => {
                        downloadFile("transactions.csv", getTransactionsCsv(), "text/csv;charset=utf-8");
                        setActionMessage("Transactions CSV exported successfully.");
                    }}
                    className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-sm text-[10px] font-mono text-zinc-400 hover:text-white transition-colors uppercase"
                >
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
                            value={searchQuery}
                            onChange={(event) => {
                                setPage(1);
                                setSearchQuery(event.target.value);
                            }}
                            className="w-full bg-zinc-950/50 border border-zinc-800 rounded-sm pl-9 pr-3 py-2 text-xs text-white font-mono placeholder:text-zinc-700 focus:outline-none focus:border-[#a3e635]/50 transition-colors"
                        />
                    </div>

                    {/* Filters */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => {
                                setPage(1);
                                cycleTypeFilter();
                            }}
                            className="flex items-center gap-2 px-3 py-2 bg-zinc-950/50 border border-zinc-800 hover:bg-zinc-900 rounded-sm text-xs text-zinc-400 font-mono transition-colors"
                        >
                            <Filter className="w-3.5 h-3.5" />
                            TYPE: {transactionTypeFilter.toUpperCase()}
                        </button>
                        <button
                            onClick={() => {
                                setPage(1);
                                cycleStatusFilter();
                            }}
                            className="flex items-center gap-2 px-3 py-2 bg-zinc-950/50 border border-zinc-800 hover:bg-zinc-900 rounded-sm text-xs text-zinc-400 font-mono transition-colors"
                        >
                            STATUS: {transactionStatusFilter.toUpperCase()}
                        </button>
                    </div>
                </div>

            {/* Table */}
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-sm overflow-hidden overflow-x-auto">
                <div className="min-w-[800px]">
                    <div className="grid grid-cols-12 px-4 py-3 bg-zinc-950/30 text-[9px] font-mono text-zinc-500 uppercase tracking-wider border-b border-zinc-800">
                        <div className="col-span-2">Date / ID</div>
                        <div className="col-span-5">Description</div>
                        <div className="col-span-2 text-center">Status</div>
                        <div className="col-span-2 text-right">Amount</div>
                        <div className="col-span-1 text-right">Invoice</div>
                    </div>

                    <div className="divide-y divide-zinc-800">
                        {visibleRows.map((tx) => (
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
                                        tx.type === "credit" ? "text-[#a3e635]" : "text-white"
                                    )}>
                                        {formatCurrency(tx.amount, tx.type)}
                                    </span>
                                </div>

                                {/* Action */}
                                <div className="col-span-1 flex justify-end">
                                    <button
                                        onClick={() => {
                                            const invoiceId = tx.invoiceId;
                                            if (!invoiceId) {
                                                setActionMessage(`No invoice attached to ${tx.id}.`);
                                                return;
                                            }
                                            downloadFile(`${invoiceId}.txt`, getInvoiceDownloadText(invoiceId), "text/plain;charset=utf-8");
                                            setActionMessage(`Invoice ${invoiceId} exported from ${tx.id}.`);
                                        }}
                                        className="p-1.5 hover:bg-zinc-800 rounded-sm text-zinc-600 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                                    >
                                        <FileText className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Pagination Mock */}
            <div className="flex justify-between items-center text-[10px] font-mono text-zinc-600">
                <span>
                    SHOWING {filteredTransactions.length === 0 ? 0 : (currentPage - 1) * perPage + 1}-{Math.min(currentPage * perPage, filteredTransactions.length)} OF {filteredTransactions.length}
                </span>
                <div className="flex gap-2">
                    <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        PREV
                    </button>
                    <span className="text-zinc-400">{currentPage}</span>
                    <button
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        NEXT
                    </button>
                </div>
            </div>
            <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">{actionMessage}</div>
        </div>
    );
}
