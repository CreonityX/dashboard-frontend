"use client";

import { SupportSection } from "@/components/widgets/shared/support/SupportComponents";
import { InputGroup, SelectGroup } from "@/components/widgets/shared/settings/SettingsComponents";
import { Paperclip, Send } from "lucide-react";

export function ContactSupport() {
    return (
        <div className="max-w-3xl mx-auto pb-20 animate-in fade-in zoom-in-95 duration-500 space-y-8">
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-sm mb-6">
                <h2 className="text-lg font-bold text-white font-display mb-1">Submit a Request</h2>
                <p className="text-sm text-zinc-400">Our support team typically responds within 24 hours.</p>
            </div>

            <SupportSection title="Ticket Details">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SelectGroup
                        label="Issue Category"
                        options={[
                            { label: 'Account & Security', value: 'account' },
                            { label: 'Payments & Billing', value: 'billing' },
                            { label: 'Technical Issue', value: 'tech' },
                            { label: 'Report a Bug', value: 'bug' },
                            { label: 'Other', value: 'other' }
                        ]}
                    />
                    <SelectGroup
                        label="Priority Level"
                        options={[
                            { label: 'Low', value: 'low' },
                            { label: 'Normal', value: 'normal' },
                            { label: 'High', value: 'high' },
                            { label: 'Critical', value: 'critical' }
                        ]}
                    />
                    <InputGroup label="Subject" placeholder="Brief summary of the issue" className="md:col-span-2" />

                    <div className="md:col-span-2 space-y-2">
                        <label className="text-xs font-mono text-zinc-400 font-medium uppercase">Description</label>
                        <textarea
                            className="w-full h-48 bg-zinc-900/50 border border-zinc-800 rounded-sm px-4 py-2.5 text-xs text-white font-mono placeholder:text-zinc-700 outline-none resize-none focus:border-[#a3e635]/50 focus:bg-zinc-900 transition-all custom-scrollbar"
                            placeholder="Please provide as much detail as possible..."
                        />
                    </div>
                </div>
            </SupportSection>

            <SupportSection title="Attachments">
                <div className="border-2 border-dashed border-zinc-800 rounded-sm p-8 flex flex-col items-center justify-center text-center hover:border-zinc-600 transition-colors cursor-pointer bg-black/20">
                    <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center mb-3">
                        <Paperclip className="w-5 h-5 text-zinc-500" />
                    </div>
                    <p className="text-sm text-zinc-400 font-bold">Click to upload or drag and drop</p>
                    <p className="text-xs text-zinc-600 mt-1">SVG, PNG, JPG or GIF (max. 10MB)</p>
                </div>
            </SupportSection>

            <div className="flex justify-end pt-6 border-t border-white/5">
                <button className="px-6 py-3 bg-[#a3e635] text-black font-bold text-sm uppercase rounded-sm hover:bg-[#b0f545] transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(163,230,53,0.2)]">
                    <Send className="w-4 h-4" /> Submit_Ticket
                </button>
            </div>
        </div>
    );
}
