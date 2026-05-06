"use client";

import { useState } from "react";
import { Bell, AlertTriangle, Pause, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { BUDGET_ALERTS } from "@/lib/brand-data";

const formatCurrency = (n: number) => `$${n.toLocaleString()}`;

export function AlertsTab() {
    const [alertThreshold, setAlertThreshold] = useState(80);
    const [autoPause, setAutoPause] = useState(true);
    const [approvalWorkflow, setApprovalWorkflow] = useState(true);

    return (
        <div className="space-y-6">
            <h2 className="text-xs font-bold text-zinc-500 font-display tracking-widest uppercase">Budget_Alerts_And_Controls</h2>

            {/* Active Alerts */}
            <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-sm">
                <h3 className="text-xs font-bold text-zinc-400 font-display tracking-widest uppercase mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" /> Active_Alerts
                </h3>
                <div className="space-y-3">
                    {BUDGET_ALERTS.map(a => (
                        <div
                            key={a.campaign}
                            className={cn(
                                "p-4 rounded-sm border flex items-center justify-between",
                                a.pctUsed >= a.alertAt
                                    ? "bg-amber-500/5 border-amber-500/30"
                                    : "bg-zinc-950/50 border-zinc-800"
                            )}
                        >
                            <div>
                                <div className="text-xs font-bold text-white">{a.campaign}</div>
                                <div className="text-[10px] text-zinc-500 font-mono mt-1">
                                    Cap: {formatCurrency(a.cap)} • Spent: {formatCurrency(a.spent)} ({a.pctUsed}%)
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-24 bg-zinc-800 rounded-sm overflow-hidden">
                                    <div
                                        className={cn(
                                            "h-full rounded-sm",
                                            a.pctUsed >= 100 ? "bg-red-500" : a.pctUsed >= a.alertAt ? "bg-amber-500" : "bg-[#a3e635]"
                                        )}
                                        style={{ width: `${Math.min(a.pctUsed, 100)}%` }}
                                    />
                                </div>
                                {a.pctUsed >= a.alertAt && (
                                    <span className="text-[9px] font-mono text-amber-500 uppercase">Alert</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Budget Caps */}
            <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-sm">
                <h3 className="text-xs font-bold text-zinc-400 font-display tracking-widest uppercase mb-4">Campaign_Budget_Caps</h3>
                <p className="text-[11px] text-zinc-500 font-mono mb-4">
                    Set maximum spend per campaign. Alerts fire when threshold is reached.
                </p>
                <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-zinc-950/50 border border-zinc-800 rounded-sm">
                        <span className="text-xs font-mono text-zinc-400">S26 Launch Campaign</span>
                        <span className="text-xs font-bold text-white font-mono">$20,000</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-zinc-950/50 border border-zinc-800 rounded-sm">
                        <span className="text-xs font-mono text-zinc-400">Spring Ad Set</span>
                        <span className="text-xs font-bold text-white font-mono">$15,000</span>
                    </div>
                </div>
            </div>

            {/* Alert Settings */}
            <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-sm">
                <h3 className="text-xs font-bold text-zinc-400 font-display tracking-widest uppercase mb-4 flex items-center gap-2">
                    <Bell className="w-4 h-4 text-[#a3e635]" /> Alert_Settings
                </h3>
                <div className="space-y-4">
                    <label className="flex items-center justify-between cursor-pointer">
                        <span className="text-xs text-zinc-400">Alert when X% spent</span>
                        <div className="flex items-center gap-2">
                            <input
                                type="range"
                                min="50"
                                max="95"
                                value={alertThreshold}
                                onChange={(e) => setAlertThreshold(Number(e.target.value))}
                                className="w-24"
                            />
                            <span className="text-xs font-mono text-[#a3e635] w-8">{alertThreshold}%</span>
                        </div>
                    </label>
                    <label className="flex items-center justify-between cursor-pointer p-3 bg-zinc-950/50 rounded-sm hover:bg-zinc-900/50">
                        <div className="flex items-center gap-2">
                            <Pause className="w-4 h-4 text-zinc-500" />
                            <span className="text-xs text-zinc-400">Auto-pause campaigns at budget limit</span>
                        </div>
                        <input
                            type="checkbox"
                            checked={autoPause}
                            onChange={(e) => setAutoPause(e.target.checked)}
                            className="rounded border-zinc-600 text-[#a3e635]"
                        />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer p-3 bg-zinc-950/50 rounded-sm hover:bg-zinc-900/50">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-zinc-500" />
                            <span className="text-xs text-zinc-400">Approval workflow for over-budget requests</span>
                        </div>
                        <input
                            type="checkbox"
                            checked={approvalWorkflow}
                            onChange={(e) => setApprovalWorkflow(e.target.checked)}
                            className="rounded border-zinc-600 text-[#a3e635]"
                        />
                    </label>
                </div>
            </div>
        </div>
    );
}
