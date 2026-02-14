"use client";

import { X, Paperclip, Briefcase, Calendar } from "lucide-react";
import { Avatar } from "../MessagesComponents";
import { MOCK_CONVERSATIONS } from "@/lib/mock-data";

export function DetailsPanel({
    conversationId,
    onClose
}: {
    conversationId: string | null;
    onClose: () => void;
}) {
    const conversation = MOCK_CONVERSATIONS.find(c => c.id === conversationId);

    if (!conversation) return null;

    return (
        <div className="hidden lg:flex w-72 flex-col border-l border-zinc-800 bg-zinc-900/40 backdrop-blur-sm h-full">
            {/* Header */}
            <div className="h-16 border-b border-zinc-800 flex items-center px-4 justify-between shrink-0 bg-zinc-900/50">
                <h3 className="text-xs font-bold text-zinc-400 font-display tracking-widest uppercase">Details</h3>
                <button
                    onClick={onClose}
                    className="text-zinc-500 hover:text-white hover:bg-white/5 p-1 rounded-sm transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>

            {/* Profile */}
            <div className="p-6 text-center border-b border-zinc-800">
                <div className="mx-auto mb-3 flex justify-center">
                    <Avatar
                        fallback={conversation.brand.substring(0, 2).toUpperCase()}
                        size="lg"
                        online={conversation.isOnline}
                    />
                </div>
                <h3 className="text-lg font-bold text-white mb-1 font-display tracking-tight">{conversation.brand}</h3>
                <p className="text-xs text-zinc-500 font-mono">
                    {conversation.isSupport ? 'Customer Experience' : 'Tech & Gadgets • Tokyo, JP'}
                </p>

                <div className="flex justify-center gap-2 mt-4">
                    <button className="px-3 py-1.5 bg-zinc-900/50 hover:bg-zinc-800 text-xs text-zinc-300 rounded-sm border border-zinc-800 transition-colors font-mono uppercase tracking-wider">
                        Profile
                    </button>
                    <button className="px-3 py-1.5 bg-zinc-900/50 hover:bg-zinc-800 text-xs text-zinc-300 rounded-sm border border-zinc-800 transition-colors font-mono uppercase tracking-wider">
                        Website
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-6 flex-1 overflow-y-auto custom-scrollbar">
                {/* Active Gig */}
                {!conversation.isSupport && (
                    <div>
                        <h4 className="text-[10px] font-bold text-zinc-500 uppercase mb-3 flex items-center gap-2 font-mono tracking-wider">
                            <Briefcase className="w-3 h-3 text-[#a3e635]" /> Active Gig
                        </h4>
                        <div className="p-3 bg-black/40 border border-zinc-800 rounded-sm hover:border-[#a3e635]/50 transition-colors cursor-pointer group">
                            <div className="text-xs font-bold text-white group-hover:text-[#a3e635] mb-1 transition-colors font-display tracking-wide">
                                Samsung S26 Review
                            </div>
                            <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Due in 2 days</span>
                                <span className="text-[#a3e635]">$3,500</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Shared Files */}
                <div>
                    <h4 className="text-[10px] font-bold text-zinc-500 uppercase mb-3 flex items-center gap-2 font-mono tracking-wider">
                        <Paperclip className="w-3 h-3 text-[#a3e635]" /> Shared Files
                    </h4>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white cursor-pointer group transition-colors">
                            <div className="w-8 h-8 bg-zinc-900 rounded-sm flex items-center justify-center shrink-0 border border-zinc-800 group-hover:border-[#a3e635]/50 transition-colors">
                                <span className="text-[8px] font-bold font-mono">PDF</span>
                            </div>
                            <div className="truncate group-hover:text-[#a3e635] transition-colors font-mono">Creative_Brief_v2.pdf</div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white cursor-pointer group transition-colors">
                            <div className="w-8 h-8 bg-zinc-900 rounded-sm flex items-center justify-center shrink-0 border border-zinc-800 group-hover:border-[#a3e635]/50 transition-colors">
                                <span className="text-[8px] font-bold font-mono">DOC</span>
                            </div>
                            <div className="truncate group-hover:text-[#a3e635] transition-colors font-mono">Contract_Signed.docx</div>
                        </div>
                    </div>
                </div>

                {/* Notes */}
                <div>
                    <h4 className="text-[10px] font-bold text-zinc-500 uppercase mb-3 font-mono tracking-wider">Private Notes</h4>
                    <textarea
                        className="w-full h-32 bg-black/40 border border-zinc-800 rounded-sm p-3 text-xs text-white placeholder:text-zinc-700 resize-none focus:outline-none focus:border-[#a3e635] transition-colors font-mono"
                        placeholder="Add notes about this client..."
                    />
                </div>
            </div>
        </div>
    );
}
