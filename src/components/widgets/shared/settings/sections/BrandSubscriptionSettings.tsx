"use client";

import { SettingsSection } from "../BrandSettingsComponents";
import { Check, Download, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function SubscriptionSettings() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Current Plan */}
            <SettingsSection title="Subscription Plan">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Starter */}
                    <PlanCard
                        title="Starter"
                        price="$499"
                        features={['5 Active Campaigns', 'Basic Influencer Search', 'Standard Reporting']}
                    />

                    {/* Growth */}
                    <PlanCard
                        title="Growth"
                        price="$1,499"
                        features={['Unlimited Campaigns', 'Advanced Discovery', 'Competitor Analysis', 'API Access', '3 Team Members']}
                        active={true}
                    />

                    {/* Enterprise */}
                    <PlanCard
                        title="Enterprise"
                        price="Custom"
                        features={['Dedicated Success Manager', 'SSO & Advanced Security', 'Custom Contracts', 'Unlimited Seats', 'White-label Reports']}
                    />
                </div>
            </SettingsSection>

            {/* Billing History */}
            <SettingsSection title="Billing History" description="Recent invoices and charges.">
                <div className="border border-white/5 rounded-sm overflow-hidden">
                    <table className="w-full text-left text-xs text-zinc-400">
                        <thead className="bg-white/5 font-mono uppercase text-[10px] text-zinc-500">
                            <tr>
                                <th className="p-3">Date</th>
                                <th className="p-3">Description</th>
                                <th className="p-3">Amount</th>
                                <th className="p-3">Status</th>
                                <th className="p-3 text-right">Invoice</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            <BillingRow date="2026-02-01" desc="Growth Plan Subscription" amount="$1,499.00" status="Paid" />
                            <BillingRow date="2026-01-15" desc="Campaign Ad Spend" amount="$3,240.50" status="Paid" />
                            <BillingRow date="2026-01-01" desc="Growth Plan Subscription" amount="$1,499.00" status="Paid" />
                        </tbody>
                    </table>
                </div>
            </SettingsSection>
        </div>
    );
}

function BillingRow({ date, desc, amount, status }: { date: string, desc: string, amount: string, status: string }) {
    return (
        <tr className="hover:bg-white/[0.02] transition-colors">
            <td className="p-3 font-mono">{date}</td>
            <td className="p-3 text-white">{desc}</td>
            <td className="p-3 font-mono">{amount}</td>
            <td className="p-3">
                <span className="text-[10px] font-bold text-[#a3e635] bg-[#a3e635]/10 px-2 py-0.5 rounded-sm uppercase">{status}</span>
            </td>
            <td className="p-3 text-right">
                <button onClick={() => toast.success("Invoice downloaded")} className="text-zinc-500 hover:text-white transition-colors">
                    <Download className="w-4 h-4" />
                </button>
            </td>
        </tr>
    );
}

function PlanCard({ title, price, features, active = false }: { title: string, price: string, features: string[], active?: boolean }) {
    return (
        <div className={cn(
            "p-6 border rounded-sm relative flex flex-col h-full transition-all duration-300",
            active ? "border-[#a3e635] bg-[#a3e635]/5 shadow-[0_0_20px_rgba(163,230,53,0.1)] scale-[1.02]" : "border-white/10 bg-zinc-900/40 hover:border-white/20"
        )}>
            {active && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#a3e635] text-black text-[10px] font-bold font-mono rounded-full uppercase tracking-wider flex items-center gap-1">
                    <Zap className="w-3 h-3 fill-current" /> Current_Plan
                </div>
            )}

            <div className="mb-6">
                <h3 className="text-lg font-bold text-white font-display mb-1">{title}</h3>
                <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-white tracking-tight">{price}</span>
                    {price !== "Custom" && <span className="text-xs text-zinc-500">/month</span>}
                </div>
            </div>

            <ul className="space-y-3 flex-1 mb-8">
                {features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-xs text-zinc-300">
                        <Check className={cn("w-4 h-4 shrink-0 mt-0.5", active ? "text-[#a3e635]" : "text-zinc-600")} />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>

            <button onClick={() => active ? toast("Current plan", { description: "Contact support to manage your plan." }) : toast.success(`Upgrade to ${title}`, { description: "Our team will be in touch to complete your upgrade." })} className={cn(
                "w-full py-2.5 text-xs font-bold uppercase tracking-wide border transition-all",
                active
                    ? "border-[#a3e635] text-[#a3e635] hover:bg-[#a3e635] hover:text-black"
                    : "border-zinc-700 text-zinc-400 hover:border-white hover:text-white"
            )}>
                {active ? "Manage_Plan" : "Upgrade"}
            </button>
        </div>
    )
}
