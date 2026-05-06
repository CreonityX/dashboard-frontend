"use client";

import { SettingsSection, InputGroup, SelectGroup } from "../BrandSettingsComponents";
import { Building2, Globe, FileText, Hash } from "lucide-react";
import { toast } from "sonner";

export function AccountSettings() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Company Information */}
            <SettingsSection title="Company Information" description="Manage your brand's public profile and business details.">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputGroup label="Company Name" defaultValue="Creonity Inc." />
                    <InputGroup
                        label="Website"
                        defaultValue="https://creonity.com"
                        action={<a href="#" className="text-[10px] text-[#a3e635] hover:underline flex items-center gap-1 font-mono"><Globe className="w-3 h-3" /> VISIT</a>}
                    />
                    <SelectGroup
                        label="Industry"
                        options={[
                            { label: 'Technology', value: 'tech' },
                            { label: 'E-commerce', value: 'ecom' },
                            { label: 'Fashion & Apparel', value: 'fashion' },
                            { label: 'Health & Wellness', value: 'health' },
                            { label: 'Finance', value: 'finance' }
                        ]}
                    />
                    <InputGroup label="Tax ID / VAT Number" defaultValue="US-987654321" />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-mono text-zinc-400 font-medium uppercase">Company Description</label>
                    <textarea
                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-sm px-4 py-2.5 text-xs text-white font-mono outline-none focus:border-[#a3e635]/50 min-h-[100px] resize-y"
                        defaultValue="Leading provider of influencer marketing solutions for modern brands."
                    />
                    <div className="text-[10px] text-zinc-600 font-mono text-right">0 / 500 CHARACTERS</div>
                </div>
            </SettingsSection>

            {/* Primary Contact */}
            <SettingsSection title="Primary Contact" description="Who should we contact for account-related matters?">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputGroup label="Contact Name" defaultValue="Kai Zen" />
                    <InputGroup label="Job Title" defaultValue="Marketing Director" />
                    <InputGroup label="Work Email" type="email" defaultValue="kai.zen@creonity.com" />
                    <InputGroup label="Phone Number" type="tel" defaultValue="+1 (555) 012-3456" />
                </div>
            </SettingsSection>

            <div className="flex justify-end pt-4 border-t border-white/5">
                <button onClick={() => toast.success("Account settings saved")} className="px-6 py-2 bg-[#a3e635] text-black font-bold text-xs uppercase hover:bg-[#b5f045] transition-colors rounded-sm shadow-[0_0_10px_rgba(163,230,53,0.2)]">
                    Save_Changes
                </button>
            </div>
        </div>
    );
}
