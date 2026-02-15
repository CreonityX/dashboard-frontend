"use client";

import { SettingsSection, ToggleGroup, SelectGroup, InputGroup } from "../SettingsComponents";
import { CreditCard, Banknote, Building, Plus } from "lucide-react";
import { GlassTechCard } from "@/components/GlassTechCard";

export function PaymentSettings() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Payout Methods */}
            <SettingsSection title="Payout Methods" description="Where should we send your earnings?">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <GlassTechCard title="PRIMARY_METHOD" className="h-auto p-4 border-dashed border-[#a3e635]/30 bg-[#a3e635]/5 relative overflow-hidden">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-[#a3e635]/20 flex items-center justify-center">
                                <Banknote className="w-5 h-5 text-[#a3e635]" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-white">Bank Transfer (ACH)</h4>
                                <p className="text-[10px] text-zinc-400 font-mono">Chase (**** 8821)</p>
                            </div>
                        </div>
                        <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-[#a3e635] text-black text-[9px] font-bold font-mono rounded-sm">DEFAULT</div>
                    </GlassTechCard>

                    <button className="h-full min-h-[80px] border border-dashed border-zinc-700 bg-zinc-900/30 rounded-sm flex items-center justify-center gap-2 text-zinc-500 hover:text-white hover:border-zinc-500 transition-colors group">
                        <div className="w-6 h-6 rounded-full border border-zinc-600 flex items-center justify-center group-hover:border-white">
                            <Plus className="w-3 h-3" />
                        </div>
                        <span className="text-xs font-mono font-medium">ADD_NEW_METHOD</span>
                    </button>
                </div>

                <div className="space-y-4 max-w-lg mt-6">
                    <h4 className="text-xs font-bold text-zinc-400 font-mono uppercase mb-2">Auto-Withdrawal Configuration</h4>
                    <ToggleGroup
                        label="Enable Auto-Withdrawal"
                        description="Automatically transfer funds when balance exceeds threshold."
                        checked={true}
                        onChange={() => { }}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <InputGroup label="Minimum Threshold" defaultValue="$500.00" />
                        <SelectGroup
                            label="Frequency"
                            options={[
                                { label: 'Weekly (Every Friday)', value: 'weekly' },
                                { label: 'Bi-Weekly', value: 'biweekly' },
                                { label: 'Monthly (1st)', value: 'monthly' }
                            ]}
                        />
                    </div>
                </div>
            </SettingsSection>

            {/* Tax Info */}
            <SettingsSection title="Tax Residency" description="Required for compliance and invoicing.">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SelectGroup
                        label="Tax Residency"
                        options={[
                            { label: 'United States', value: 'us' },
                            { label: 'Canada', value: 'ca' },
                            { label: 'European Union', value: 'eu' },
                            { label: 'Other', value: 'other' }
                        ]}
                    />
                    <InputGroup label="Tax ID / SSN" placeholder="XXX-XX-XXXX" />
                </div>
                <div className="mt-4 p-4 border border-zinc-800 bg-zinc-900/50 rounded-sm flex items-start gap-4">
                    <Building className="w-5 h-5 text-zinc-500 mt-1" />
                    <div>
                        <h4 className="text-xs font-bold text-white mb-1">W-9 Form Status</h4>
                        <p className="text-[10px] text-zinc-500 font-mono">Submitted on 2025-12-15. <span className="text-[#a3e635]">VERIFIED</span></p>
                    </div>
                    <button className="ml-auto text-xs text-zinc-400 hover:text-white underline font-mono">View_Form</button>
                </div>
            </SettingsSection>
        </div>
    );
}
