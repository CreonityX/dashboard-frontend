import { useMemo, useState } from "react";
import { Calculator, Download, FileText, Landmark } from "lucide-react";
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

export function TaxTab() {
    const {
        lifetimeEarnings,
        taxDocuments,
        taxResidency,
        updateTaxResidency,
        taxIdMasked,
        revealTaxIdTemporarily,
        getTaxDocumentText,
        formatCurrency
    } = useFinanceMvp();
    const [showFullTaxId, setShowFullTaxId] = useState(false);
    const [statusMessage, setStatusMessage] = useState("Tax docs and settings are configurable.");
    const estTax = useMemo(() => lifetimeEarnings * 0.3, [lifetimeEarnings]);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* YTD Summary */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-sm flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Landmark className="w-4 h-4 text-[#a3e635]" />
                                <span className="text-xs font-bold text-zinc-400 font-display uppercase">YTD_Earnings_2026</span>
                            </div>
                            <div className="text-3xl font-bold text-white font-display tracking-tight">{formatCurrency(lifetimeEarnings)}</div>
                        </div>
                        <div className="text-right">
                            <div className="text-[10px] text-zinc-500 font-mono uppercase">Est. Tax Owed</div>
                            <div className="text-xl font-bold text-zinc-300 font-mono">~{formatCurrency(estTax)}</div>
                            <div className="text-[9px] text-zinc-600 font-mono">(Based on 30% rate)</div>
                        </div>
                    </div>

                    <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-sm">
                        <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider mb-4">Tax_Documents</h3>
                        <div className="bg-zinc-950/30 border border-zinc-800 rounded-sm divide-y divide-zinc-800">
                            {taxDocuments.map((doc) => (
                                <div key={doc.id} className="flex justify-between items-center p-4 hover:bg-zinc-900/50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-zinc-900 border border-zinc-800 flex items-center justify-center rounded-sm">
                                            <FileText className="w-4 h-4 text-zinc-500" />
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-white">Form {doc.form}</div>
                                            <div className="text-[10px] text-zinc-500 font-mono">Tax Year {doc.year}</div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            downloadFile(`${doc.form}-${doc.year}.txt`, getTaxDocumentText(doc.id), "text/plain;charset=utf-8");
                                            setStatusMessage(`Downloaded ${doc.form} for ${doc.year}.`);
                                        }}
                                        className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-sm"
                                    >
                                        <Download className="w-3 h-3" /> PDF
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Settings & Calculator */}
                <div className="space-y-6">
                    <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <Calculator className="w-4 h-4 text-purple-500" />
                            <h3 className="text-xs font-bold text-white font-display uppercase tracking-wider">Tax_Settings</h3>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="text-[10px] text-zinc-500 font-mono uppercase block mb-1">Tax Residency</label>
                                <select
                                    value={taxResidency}
                                    onChange={(event) => {
                                        updateTaxResidency(event.target.value as "United States (W-9)" | "International (W-8BEN)");
                                        setStatusMessage(`Tax residency changed to ${event.target.value}.`);
                                    }}
                                    className="w-full bg-zinc-950 border border-zinc-800 text-xs text-white p-2 rounded-sm font-mono outline-none focus:border-zinc-600"
                                >
                                    <option>United States (W-9)</option>
                                    <option>International (W-8BEN)</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-[10px] text-zinc-500 font-mono uppercase block mb-1">Tax ID / SSN</label>
                                <div className="w-full bg-zinc-950 border border-zinc-800 text-xs text-zinc-500 p-2 rounded-sm font-mono flex justify-between items-center">
                                    <span>{showFullTaxId ? revealTaxIdTemporarily() : taxIdMasked}</span>
                                    <button
                                        onClick={() => {
                                            setShowFullTaxId((current) => !current);
                                            setStatusMessage(showFullTaxId ? "Tax ID hidden again." : "Tax ID revealed for review.");
                                        }}
                                        className="text-[9px] underline"
                                    >
                                        {showFullTaxId ? "HIDE" : "EDIT"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">{statusMessage}</div>
        </div>
    );
}
