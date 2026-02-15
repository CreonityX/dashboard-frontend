import { FileText, Download, Plus, Mail } from "lucide-react";

export function ReportsTab() {
    return (
        <div className="space-y-6">
            {/* Action Button */}
            <div className="flex justify-end">
                <button className="flex items-center gap-2 px-4 py-2 bg-[#a3e635] text-black text-xs font-bold font-mono rounded-[2px] uppercase hover:bg-[#a3e635]/90 transition-all">
                    <Plus className="w-4 h-4" /> New_Report
                </button>
            </div>

            {/* Templates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {['Monthly Performance', 'Campaign Summary', 'Yearly Overview', 'Media Kit One-Pager'].map((title, i) => (
                    <div key={i} className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-sm hover:border-zinc-600 transition-colors group cursor-pointer flex flex-col items-center text-center">
                        <div className="w-12 h-16 bg-zinc-800 border border-zinc-700 mb-4 shadow-lg group-hover:-translate-y-1 transition-transform relative">
                            <div className="absolute top-2 left-2 right-2 h-[1px] bg-zinc-600"></div>
                            <div className="absolute top-4 left-2 right-4 h-[1px] bg-zinc-700"></div>
                            <div className="absolute top-6 left-2 right-6 h-[1px] bg-zinc-700"></div>
                        </div>
                        <h4 className="text-xs font-bold text-zinc-300 font-display uppercase">{title}</h4>
                        <p className="text-[10px] text-zinc-600 font-mono mt-1">AUTO_GENERATED</p>
                    </div>
                ))}
            </div>

            {/* Recent Exports */}
            <h3 className="text-xs font-bold text-zinc-500 font-display tracking-widest uppercase mt-4">Recent_Exports</h3>
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-sm">
                {[
                    { name: 'Jan_2026_Report.pdf', date: 'Feb 01, 2026', size: '2.4 MB' },
                    { name: 'Nike_Campaign_Final.pdf', date: 'Jan 28, 2026', size: '4.1 MB' },
                    { name: '2025_Year_End.pdf', date: 'Jan 15, 2026', size: '8.5 MB' },
                ].map((file, i) => (
                    <div key={i} className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 last:border-0 hover:bg-zinc-800/30 transition-colors">
                        <div className="flex items-center gap-3">
                            <FileText className="w-4 h-4 text-zinc-500" />
                            <div>
                                <div className="text-xs font-bold text-zinc-300">{file.name}</div>
                                <div className="text-[10px] text-zinc-600 font-mono">{file.date} • {file.size}</div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="p-1.5 hover:bg-zinc-800 rounded-sm text-zinc-500 hover:text-white transition-colors"><Mail className="w-3.5 h-3.5" /></button>
                            <button className="p-1.5 hover:bg-zinc-800 rounded-sm text-zinc-500 hover:text-[#a3e635] transition-colors"><Download className="w-3.5 h-3.5" /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
