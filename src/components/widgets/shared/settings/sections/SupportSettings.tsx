"use client";

import { SettingsSection, InputGroup, SelectGroup } from "../SettingsComponents";
import { HelpCircle, MessageCircle, FileText } from "lucide-react";

export function SupportSettings() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Quick Links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <SupportCard icon={FileText} title="Documentation" description="Read guides and API references." />
                <SupportCard icon={HelpCircle} title="FAQ" description="Common questions answered." />
                <SupportCard icon={MessageCircle} title="Live Chat" description="Talk to our support team." highlight />
            </div>

            {/* Contact Form */}
            <SettingsSection title="Submit a Ticket">
                <div className="space-y-4 max-w-lg">
                    <SelectGroup
                        label="Issue Type"
                        options={[
                            { label: 'Select a category...', value: '' },
                            { label: 'Billing Issue', value: 'billing' },
                            { label: 'Technical Bug', value: 'tech' },
                            { label: 'Feature Request', value: 'feature' },
                            { label: 'Account Access', value: 'account' }
                        ]}
                    />
                    <InputGroup label="Subject" placeholder="Brief description of the issue" />

                    <div className="space-y-2">
                        <label className="text-xs font-mono text-zinc-400 font-medium uppercase">Message</label>
                        <textarea
                            className="w-full h-32 bg-zinc-900/50 border border-zinc-800 rounded-sm px-4 py-2.5 text-xs text-white font-mono placeholder:text-zinc-700 outline-none resize-none focus:border-[#a3e635]/50 focus:bg-zinc-900 transition-all"
                            placeholder="Describe your issue in detail..."
                        />
                    </div>

                    <button className="px-6 py-2 bg-white text-black font-bold text-xs uppercase hover:bg-zinc-200 transition-colors">
                        Submit_Ticket
                    </button>
                </div>
            </SettingsSection>
        </div>
    );
}

function SupportCard({ icon: Icon, title, description, highlight }: { icon: any, title: string, description: string, highlight?: boolean }) {
    return (
        <button className={`p-6 border rounded-sm text-left transition-all hover:-translate-y-1 ${highlight ? "border-[#a3e635] bg-[#a3e635]/10" : "border-white/10 bg-zinc-900/40 hover:bg-zinc-800/60"}`}>
            <Icon className={`w-6 h-6 mb-3 ${highlight ? "text-[#a3e635]" : "text-white"}`} />
            <h3 className="text-sm font-bold text-white mb-1">{title}</h3>
            <p className="text-xs text-zinc-500">{description}</p>
        </button>
    )
}
