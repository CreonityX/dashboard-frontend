"use client";

import { CAMPAIGNS_LIST } from "@/lib/brand-data";
import { PENDING_PAYMENTS } from "@/lib/brand-data";

export function BudgetTab({ campaignId }: { campaignId: string }) {
    const campaign = CAMPAIGNS_LIST.find(c => c.id === campaignId);
    if (!campaign) return null;

    const committed = campaign.spent;
    const remaining = campaign.budget - campaign.spent;
    const payouts = PENDING_PAYMENTS.filter(p => p.campaign?.includes(campaign.name.split(' ')[0]));

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-zinc-900/40 border border-zinc-800 rounded-sm p-4">
                    <div className="text-[10px] font-mono text-zinc-500 mb-1">Total allocated</div>
                    <div className="text-lg font-bold text-white font-mono">${campaign.budget.toLocaleString()}</div>
                </div>
                <div className="bg-zinc-900/40 border border-zinc-800 rounded-sm p-4">
                    <div className="text-[10px] font-mono text-zinc-500 mb-1">Committed</div>
                    <div className="text-lg font-bold text-[#a3e635] font-mono">${committed.toLocaleString()}</div>
                </div>
                <div className="bg-zinc-900/40 border border-zinc-800 rounded-sm p-4">
                    <div className="text-[10px] font-mono text-zinc-500 mb-1">Spent</div>
                    <div className="text-lg font-bold text-white font-mono">${campaign.spent.toLocaleString()}</div>
                </div>
                <div className="bg-zinc-900/40 border border-zinc-800 rounded-sm p-4">
                    <div className="text-[10px] font-mono text-zinc-500 mb-1">Remaining</div>
                    <div className="text-lg font-bold text-zinc-400 font-mono">${remaining.toLocaleString()}</div>
                </div>
            </div>
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-sm overflow-hidden">
                <h3 className="text-[10px] font-bold text-zinc-500 font-display tracking-widest uppercase p-4 border-b border-zinc-800">Per-creator breakdown</h3>
                <div className="divide-y divide-zinc-800">
                    {payouts.map(p => (
                        <div key={p.id} className="flex justify-between items-center px-4 py-3">
                            <span className="text-sm font-mono text-white">{p.creator}</span>
                            <span className="text-[10px] font-mono text-zinc-400">${p.amount.toLocaleString()} • Due {p.dueDate}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-sm p-4">
                <h3 className="text-[10px] font-bold text-zinc-500 font-display tracking-widest uppercase mb-3">Payment schedule</h3>
                <div className="h-24 flex items-center justify-center border border-dashed border-zinc-700 rounded-sm text-[10px] font-mono text-zinc-600">Timeline placeholder</div>
            </div>
        </div>
    );
}
