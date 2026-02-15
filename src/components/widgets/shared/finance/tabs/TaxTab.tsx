import { Landmark, FileText, Calculator, Download, ExternalLink } from "lucide-react";

export function TaxTab() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-lg font-bold text-white font-display tracking-wide">TAX_CENTER</h2>
                <p className="text-zinc-500 font-mono text-xs">COMPLIANCE // FISCAL_YEAR_2026</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* YTD Summary */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-sm flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Landmark className="w-4 h-4 text-[#a3e635]" />
                                <span className="text-xs font-bold text-zinc-400 font-display uppercase">YTD_Earnings_2026</span>
                            </div>
                            <div className="text-3xl font-bold text-white font-display tracking-tight">$24,560.00</div>
                        </div>
                        <div className="text-right">
                            <div className="text-[10px] text-zinc-500 font-mono uppercase">Est. Tax Owed</div>
                            <div className="text-xl font-bold text-zinc-300 font-mono">~$7,368</div>
                            <div className="text-[9px] text-zinc-600 font-mono">(Based on 30% rate)</div>
                        </div>
                    </div>

                    <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-sm">
                        <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider mb-4">Tax_Documents</h3>
                        <div className="bg-zinc-950/30 border border-zinc-800 rounded-sm divide-y divide-zinc-800">
                            {[{ form: '1099-NEC', year: '2025' }, { form: '1099-NEC', year: '2024' }].map((doc, i) => (
                                <div key={i} className="flex justify-between items-center p-4 hover:bg-zinc-900/50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-zinc-900 border border-zinc-800 flex items-center justify-center rounded-sm">
                                            <FileText className="w-4 h-4 text-zinc-500" />
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-white">Form {doc.form}</div>
                                            <div className="text-[10px] text-zinc-500 font-mono">Tax Year {doc.year}</div>
                                        </div>
                                    </div>
                                    <button className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-sm">
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
                                <select className="w-full bg-zinc-950 border border-zinc-800 text-xs text-white p-2 rounded-sm font-mono outline-none focus:border-zinc-600">
                                    <option>United States (W-9)</option>
                                    <option>International (W-8BEN)</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-[10px] text-zinc-500 font-mono uppercase block mb-1">Tax ID / SSN</label>
                                <div className="w-full bg-zinc-950 border border-zinc-800 text-xs text-zinc-500 p-2 rounded-sm font-mono flex justify-between items-center">
                                    <span>***-**-8821</span>
                                    <button className="text-[9px] underline">EDIT</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
