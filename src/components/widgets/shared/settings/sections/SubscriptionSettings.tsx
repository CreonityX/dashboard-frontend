"use client";

import { SettingsSection } from "../SettingsComponents";
import { Check, Download } from "lucide-react";
import { cn } from "@/lib/utils";

export function SubscriptionSettings() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Current Plan */}
            <SettingsSection title="Current Subscription">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Free Tier */}
                    <PlanCard
                        title="Free"
                        price="$0"
                        features={['Basic Analytics', '3 Active Gigs', 'Standard Support']}
                    />

                    {/* Pro Tier (Active) */}
                    <PlanCard
                        title="Pro"
                        price="$29"
                        features={['Advanced Analytics', 'Unlimited Gigs', 'Priority Support', 'Custom Branding', 'API Access']}
                        active={true}
                    />

                    {/* Enterprise */}
                    <PlanCard
                        title="Agency"
                        price="$99"
                        features={['Team Management', 'White-label', 'Dedicated Account Manager', 'SSO']}
                    />
                </div>
            </SettingsSection>

            {/* Billing History */}
            <SettingsSection title="Billing History" description="Download past invoices.">
                <div className="border border-white/5 rounded-sm overflow-hidden">
                    <table className="w-full text-left text-xs text-zinc-400">
                        <thead className="bg-white/5 font-mono uppercase text-[10px] text-zinc-500">
                            <tr>
                                <th className="p-3">Date</th>
                                <th className="p-3">Description</th>
                                <th className="p-3">Amount</th>
                                <th className="p-3 text-right">Invoice</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {[1, 2, 3].map((i) => (
                                <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                                    <td className="p-3 font-mono">2026-0{i + 1}-01</td>
                                    <td className="p-3">Creonity Pro Subscription</td>
                                    <td className="p-3 text-white">$29.00</td>
                                    <td className="p-3 text-right">
                                        <button className="text-zinc-500 hover:text-white transition-colors">
                                            <Download className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </SettingsSection>
        </div>
    );
}

function PlanCard({ title, price, features, active = false }: { title: string, price: string, features: string[], active?: boolean }) {
    return (
        <div className={cn(
            "p-6 border rounded-lg relative flex flex-col h-full",
            active ? "border-[#a3e635] bg-[#a3e635]/5 shadow-[0_0_20px_rgba(163,230,53,0.1)]" : "border-white/10 bg-zinc-900/40"
        )}>
            {active && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#a3e635] text-black text-[10px] font-bold font-mono rounded-full uppercase tracking-wider">
                    Current_Plan
                </div>
            )}

            <div className="mb-4">
                <h3 className="text-lg font-bold text-white font-display mb-1">{title}</h3>
                <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-white">{price}</span>
                    <span className="text-xs text-zinc-500">/month</span>
                </div>
            </div>

            <ul className="space-y-3 flex-1 mb-6">
                {features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-xs text-zinc-300">
                        <Check className={cn("w-4 h-4 shrink-0 mt-0.5", active ? "text-[#a3e635]" : "text-zinc-600")} />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>

            <button className={cn(
                "w-full py-2 text-xs font-bold uppercase tracking-wide border transition-all",
                active
                    ? "border-[#a3e635] text-[#a3e635] hover:bg-[#a3e635] hover:text-black"
                    : "border-zinc-700 text-zinc-400 hover:border-white hover:text-white"
            )}>
                {active ? "Manage_Subscription" : "Upgrade"}
            </button>
        </div>
    )
}
