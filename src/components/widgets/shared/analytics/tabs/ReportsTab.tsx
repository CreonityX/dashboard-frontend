"use client";

import { useState } from "react";
import { FileText, Download, Plus, Mail, Calendar, Image, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const REPORT_TEMPLATES = [
    { id: 'executive', label: 'Executive Summary', desc: 'High-level KPIs for leadership' },
    { id: 'campaign', label: 'Campaign Performance', desc: 'Per-campaign metrics and ROI' },
    { id: 'creator', label: 'Creator Performance', desc: 'Creator rankings and ROI' },
    { id: 'budget', label: 'Budget Utilization', desc: 'Spend breakdown and efficiency' },
];

const WIDGET_TYPES = [
    { id: 'kpi', label: 'KPI Card' },
    { id: 'chart', label: 'Trend Chart' },
    { id: 'table', label: 'Data Table' },
    { id: 'comparison', label: 'Comparison' },
];

export function ReportsTab() {
    const [showBuilder, setShowBuilder] = useState(false);
    const [selectedWidgets, setSelectedWidgets] = useState<string[]>([]);

    return (
        <div className="space-y-6">
            {/* Actions */}
            <div className="flex flex-wrap justify-between items-center gap-4">
                <div className="flex gap-2">
                    <button
                        onClick={() => setShowBuilder(!showBuilder)}
                        className="flex items-center gap-2 px-4 py-2 bg-[#a3e635] text-black text-xs font-bold font-mono rounded-sm uppercase hover:bg-[#b5f045] transition-all"
                    >
                        <Plus className="w-4 h-4" /> Report_Builder
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-mono rounded-sm hover:bg-zinc-700 transition-all">
                        <Calendar className="w-4 h-4" /> Scheduled_Reports
                    </button>
                </div>
            </div>

            {/* Report Builder (Drag and drop widgets) */}
            {showBuilder && (
                <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-sm">
                    <h3 className="text-xs font-bold text-zinc-400 font-display tracking-widest uppercase mb-4">Report_Builder</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="space-y-3">
                            <div className="text-[10px] font-mono text-zinc-500 uppercase">Select Metrics</div>
                            <div className="space-y-1">
                                {['Total Reach', 'Impressions', 'Engagements', 'Conversions', 'ROI', 'Spend'].map(m => (
                                    <label key={m} className="flex items-center gap-2 p-2 rounded-sm hover:bg-zinc-800/50 cursor-pointer">
                                        <input type="checkbox" className="rounded border-zinc-600 text-[#a3e635]" />
                                        <span className="text-xs font-mono text-zinc-400">{m}</span>
                                    </label>
                                ))}
                            </div>
                            <div className="text-[10px] font-mono text-zinc-500 uppercase mt-4">Date Range</div>
                            <select className="w-full bg-zinc-950/50 border border-zinc-800 rounded-sm px-3 py-2 text-xs text-zinc-400 font-mono">
                                <option>Last 30 Days</option>
                                <option>Last 90 Days</option>
                                <option>Year to Date</option>
                            </select>
                            <div className="text-[10px] font-mono text-zinc-500 uppercase mt-2">Campaign Selection</div>
                            <select className="w-full bg-zinc-950/50 border border-zinc-800 rounded-sm px-3 py-2 text-xs text-zinc-400 font-mono">
                                <option>All Campaigns</option>
                                <option>S26 Launch</option>
                                <option>Spring Ad Set</option>
                            </select>
                            <div className="text-[10px] font-mono text-zinc-500 uppercase mt-2">Add Branding</div>
                            <button className="w-full flex items-center justify-center gap-2 py-2 border border-dashed border-zinc-700 rounded-sm text-zinc-500 hover:border-[#a3e635]/50 hover:text-[#a3e635] transition-colors">
                                <Image className="w-4 h-4" /> Logo
                            </button>
                        </div>
                        <div className="lg:col-span-2">
                            <div className="text-[10px] font-mono text-zinc-500 uppercase mb-2">Drag & Drop Widgets</div>
                            <div className="min-h-[200px] p-4 bg-zinc-950/50 border border-zinc-800 rounded-sm border-dashed space-y-2">
                                {WIDGET_TYPES.map(w => (
                                    <div
                                        key={w.id}
                                        className="flex items-center gap-2 p-3 bg-zinc-900/60 border border-zinc-800 rounded-sm cursor-move hover:border-[#a3e635]/30 transition-colors"
                                    >
                                        <GripVertical className="w-4 h-4 text-zinc-600" />
                                        <span className="text-xs font-mono text-zinc-400">{w.label}</span>
                                    </div>
                                ))}
                                <p className="text-[10px] text-zinc-600 font-mono pt-2">Drop widgets here to build report</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Report Templates */}
            <div>
                <h3 className="text-xs font-bold text-zinc-500 font-display tracking-widest uppercase mb-4">Report_Templates</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {REPORT_TEMPLATES.map(t => (
                        <div key={t.id} className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-sm hover:border-zinc-600 transition-colors group cursor-pointer flex flex-col items-center text-center">
                            <div className="w-12 h-16 bg-zinc-800 border border-zinc-700 mb-4 group-hover:-translate-y-1 transition-transform relative">
                                <div className="absolute top-2 left-2 right-2 h-[1px] bg-zinc-600" />
                                <div className="absolute top-4 left-2 right-4 h-[1px] bg-zinc-700" />
                                <div className="absolute top-6 left-2 right-6 h-[1px] bg-zinc-700" />
                            </div>
                            <h4 className="text-xs font-bold text-zinc-300 font-display uppercase">{t.label}</h4>
                            <p className="text-[10px] text-zinc-600 font-mono mt-1">{t.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scheduled Reports */}
            <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-sm">
                <h3 className="text-xs font-bold text-zinc-400 font-display tracking-widest uppercase mb-4 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#a3e635]" /> Scheduled_Reports
                </h3>
                <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-zinc-950/50 border border-zinc-800 rounded-sm">
                        <div>
                            <div className="text-xs font-bold text-zinc-300">Weekly Performance Digest</div>
                            <div className="text-[10px] text-zinc-600 font-mono">Every Monday 9:00 AM • 3 recipients</div>
                        </div>
                        <button className="text-[10px] text-[#a3e635] font-mono hover:underline">Edit</button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-zinc-950/50 border border-zinc-800 rounded-sm">
                        <div>
                            <div className="text-xs font-bold text-zinc-300">Monthly Executive Summary</div>
                            <div className="text-[10px] text-zinc-600 font-mono">1st of month • 5 recipients</div>
                        </div>
                        <button className="text-[10px] text-[#a3e635] font-mono hover:underline">Edit</button>
                    </div>
                </div>
            </div>

            {/* Export Options */}
            <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-sm">
                <h3 className="text-xs font-bold text-zinc-400 font-display tracking-widest uppercase mb-4">Export_Options</h3>
                <div className="flex flex-wrap gap-2">
                    {['PDF', 'Excel', 'PowerPoint', 'Google Sheets'].map(fmt => (
                        <button
                            key={fmt}
                            onClick={() => toast.success(`Exporting as ${fmt}`, { description: "Your report will be ready shortly." })}
                            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-sm text-xs font-mono text-zinc-400 hover:border-[#a3e635]/50 hover:text-[#a3e635] transition-colors"
                        >
                            <Download className="w-3.5 h-3.5" /> {fmt}
                        </button>
                    ))}
                </div>
            </div>

            {/* Recent Exports */}
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-sm">
                <div className="px-4 py-3 border-b border-zinc-800">
                    <h3 className="text-xs font-bold text-zinc-300 font-display tracking-widest uppercase">Recent_Exports</h3>
                </div>
                <div className="divide-y divide-zinc-800">
                    {[
                        { name: 'Jan_2026_Report.pdf', date: 'Feb 01, 2026', size: '2.4 MB' },
                        { name: 'S26_Campaign_Final.pdf', date: 'Jan 28, 2026', size: '4.1 MB' },
                        { name: '2025_Year_End.xlsx', date: 'Jan 15, 2026', size: '1.2 MB' },
                    ].map((file, i) => (
                        <div key={i} className="flex items-center justify-between px-4 py-3 hover:bg-zinc-800/30 transition-colors">
                            <div className="flex items-center gap-3">
                                <FileText className="w-4 h-4 text-zinc-500" />
                                <div>
                                    <div className="text-xs font-bold text-zinc-300">{file.name}</div>
                                    <div className="text-[10px] text-zinc-600 font-mono">{file.date} • {file.size}</div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-1.5 hover:bg-zinc-800 rounded-sm text-zinc-500 hover:text-white"><Mail className="w-3.5 h-3.5" /></button>
                                <button className="p-1.5 hover:bg-zinc-800 rounded-sm text-zinc-500 text-[#a3e635]"><Download className="w-3.5 h-3.5" /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
