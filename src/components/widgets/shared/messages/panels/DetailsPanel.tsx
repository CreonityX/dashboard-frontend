"use client";

import { X, Paperclip, Briefcase, Calendar } from "lucide-react";
import { Avatar } from "../MessagesComponents";
import { useMessagesMvp } from "../MessagesMvpContext";

export function DetailsPanel({
    conversationId,
    onClose
}: {
    conversationId: string | null;
    onClose: () => void;
}) {
    const { getConversationById, setConversationNote } = useMessagesMvp();
    const conversation = getConversationById(conversationId);

    if (!conversation) return null;

    return (
        <div className="hidden lg:flex w-72 flex-col border-l border-zinc-800 bg-zinc-900/40 backdrop-blur-sm h-full">
            <div className="h-16 border-b border-zinc-800 flex items-center px-4 justify-between shrink-0 bg-zinc-900/50">
                <h3 className="text-xs font-bold text-zinc-400 font-display tracking-widest uppercase">Details</h3>
                <button onClick={onClose} className="text-zinc-500 hover:text-white hover:bg-white/5 p-1 rounded-sm transition-colors">
                    <X className="w-4 h-4" />
                </button>
            </div>

            <div className="p-6 text-center border-b border-zinc-800">
                <div className="mx-auto mb-3 flex justify-center">
                    <Avatar fallback={conversation.brand.substring(0, 2).toUpperCase()} size="lg" online={conversation.isOnline} />
                </div>
                <h3 className="text-lg font-bold text-white mb-1 font-display tracking-tight">{conversation.brand}</h3>
                <p className="text-xs text-zinc-500 font-mono">
                    {conversation.isSupport ? "Customer Experience" : "Campaign Partner"}
                </p>
            </div>

            <div className="p-4 space-y-6 flex-1 overflow-y-auto custom-scrollbar">
                {!conversation.isSupport && (
                    <div>
                        <h4 className="text-[10px] font-bold text-zinc-500 uppercase mb-3 flex items-center gap-2 font-mono tracking-wider">
                            <Briefcase className="w-3 h-3 text-[#a3e635]" /> Active Relationship
                        </h4>
                        <div className="p-3 bg-black/40 border border-zinc-800 rounded-sm">
                            <div className="text-xs font-bold text-white mb-1 font-display tracking-wide">{conversation.brand} Campaign</div>
                            <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Ongoing</span>
                                <span className="text-[#a3e635]">Priority</span>
                            </div>
                        </div>
                    </div>
                )}

                <div>
                    <h4 className="text-[10px] font-bold text-zinc-500 uppercase mb-3 flex items-center gap-2 font-mono tracking-wider">
                        <Paperclip className="w-3 h-3 text-[#a3e635]" /> Shared Files
                    </h4>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs text-zinc-400">
                            <div className="w-8 h-8 bg-zinc-900 rounded-sm flex items-center justify-center shrink-0 border border-zinc-800">
                                <span className="text-[8px] font-bold font-mono">PDF</span>
                            </div>
                            <div className="truncate font-mono">Creative_Brief.pdf</div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-zinc-400">
                            <div className="w-8 h-8 bg-zinc-900 rounded-sm flex items-center justify-center shrink-0 border border-zinc-800">
                                <span className="text-[8px] font-bold font-mono">DOC</span>
                            </div>
                            <div className="truncate font-mono">Contract.docx</div>
                        </div>
                    </div>
                </div>

                <div>
                    <h4 className="text-[10px] font-bold text-zinc-500 uppercase mb-3 font-mono tracking-wider">Private Notes</h4>
                    <textarea
                        value={conversation.notes || ""}
                        onChange={(event) => {
                            if (!conversationId) return;
                            setConversationNote(conversationId, event.target.value);
                        }}
                        className="w-full h-32 bg-black/40 border border-zinc-800 rounded-sm p-3 text-xs text-white placeholder:text-zinc-700 resize-none focus:outline-none focus:border-[#a3e635] transition-colors font-mono"
                        placeholder="Add notes about this client..."
                    />
                </div>
            </div>
        </div>
    );
}
