"use client";

import { SupportSection, SupportInput, SupportTextArea } from "@/components/widgets/shared/support/BrandSupportComponents";
import { Send, Paperclip } from "lucide-react";

export function SubmitTicket() {
    return (
        <div className="max-w-2xl mx-auto pb-20 animate-in fade-in zoom-in-95 duration-500 space-y-8">
            <div className="space-y-2">
                <h2 className="text-xl font-bold text-white uppercase font-display">Submit a Ticket</h2>
                <p className="text-zinc-500 text-xs font-mono">Our support team will get back to you within 24 hours.</p>
            </div>

            <div className="space-y-6 border border-white/5 bg-white/[0.02] p-6 rounded-sm">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-mono text-zinc-400 font-medium uppercase">Select Issue Type</label>
                        <select className="w-full bg-zinc-900/50 border border-zinc-800 rounded-sm px-4 py-2.5 text-xs text-white font-mono outline-none focus:border-[#a3e635]/50">
                            <option>Account Issue</option>
                            <option>Payment & Billing</option>
                            <option>Technical Bug</option>
                            <option>Feature Request</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-mono text-zinc-400 font-medium uppercase">Priority Level</label>
                        <select className="w-full bg-zinc-900/50 border border-zinc-800 rounded-sm px-4 py-2.5 text-xs text-white font-mono outline-none focus:border-[#a3e635]/50">
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                            <option>Critical</option>
                        </select>
                    </div>
                </div>

                <SupportInput label="Subject" placeholder="Brief summary of the issue..." />

                <SupportTextArea label="Description" placeholder="Please describe the issue in detail..." />

                <div className="space-y-2">
                    <label className="text-xs font-mono text-zinc-400 font-medium uppercase">Attachments</label>
                    <div className="border border-dashed border-zinc-700 bg-zinc-900/30 p-8 rounded-sm flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-zinc-500 hover:bg-zinc-900/50 transition-all">
                        <Paperclip className="w-5 h-5 text-zinc-500" />
                        <span className="text-xs text-zinc-400 font-mono">Drag files here or click to upload</span>
                    </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex justify-end">
                    <button className="flex items-center gap-2 bg-[#a3e635] text-black px-6 py-2.5 text-xs font-bold uppercase hover:bg-[#b5f045] transition-all rounded-sm">
                        <Send className="w-4 h-4" />
                        <span>Submit Ticket</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
