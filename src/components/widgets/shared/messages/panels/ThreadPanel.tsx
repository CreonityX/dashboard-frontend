"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronRight, Phone, Video, Info, Paperclip, Send } from "lucide-react";
import { MessageBubble, Avatar } from "../MessagesComponents";
import { useMessagesMvp } from "../MessagesMvpContext";

export function ThreadPanel({
    conversationId,
    onBack,
    onToggleDetails,
    showDetails
}: {
    conversationId: string | null;
    onBack: () => void;
    onToggleDetails: () => void;
    showDetails: boolean;
}) {
    const { getConversationById, getMessagesForConversation, sendMessage, markConversationRead, isLoading } = useMessagesMvp();
    const conversation = getConversationById(conversationId);
    const messages = useMemo(() => getMessagesForConversation(conversationId), [conversationId, getMessagesForConversation]);
    const [draft, setDraft] = useState("");
    const [actionNote, setActionNote] = useState("");

    useEffect(() => {
        if (conversationId) {
            markConversationRead(conversationId);
        }
    }, [conversationId, markConversationRead]);

    const handleSend = () => {
        if (!conversationId) return;
        if (!draft.trim()) return;
        sendMessage(conversationId, draft);
        setDraft("");
        setActionNote("Message sent");
    };

    const insertTemplate = () => {
        setDraft("Hi team, quick update: deliverables are on track. I will share the next draft by tomorrow.");
        setActionNote("Template inserted");
    };

    const attachMockFile = () => {
        if (!conversationId) return;
        sendMessage(conversationId, "[Attachment] campaign-draft-v1.pdf");
        setActionNote("Mock attachment sent");
    };

    const triggerCallAction = (mode: "voice" | "video") => {
        setActionNote(mode === "voice" ? "Voice call request sent" : "Video call request sent");
    };

    if (!conversationId || !conversation) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-zinc-500">
                <div className="w-16 h-16 bg-zinc-900/50 rounded-sm flex items-center justify-center mb-4 border border-zinc-800">
                    <Send className="w-6 h-6 text-zinc-700" />
                </div>
                <p className="text-sm font-mono">SELECT_CONVERSATION</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-zinc-900/20">
            <div className="h-16 border-b border-zinc-800 flex items-center px-6 justify-between shrink-0 bg-zinc-900/40">
                <div className="flex items-center gap-3">
                    <button onClick={onBack} className="md:hidden mr-2 text-zinc-400 hover:text-white">
                        <ChevronRight className="w-5 h-5 rotate-180" />
                    </button>
                    <Avatar fallback={conversation.brand.substring(0, 2).toUpperCase()} online={conversation.isOnline} />
                    <div>
                        <div className="text-sm font-bold text-white flex items-center gap-2 font-display tracking-tight">
                            {conversation.brand}
                            {conversation.isOnline && <div className="w-1.5 h-1.5 rounded-full bg-[#a3e635] shadow-[0_0_5px_rgba(163,230,53,0.5)]" />}
                        </div>
                        <div className="text-[10px] text-zinc-500 font-mono uppercase">
                            {conversation.isSupport ? "Official Support" : "Replies in ~10m"}
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={() => triggerCallAction("voice")} className="p-2 hover:bg-white/5 rounded-sm text-zinc-400 transition-colors"><Phone className="w-4 h-4" /></button>
                    <button onClick={() => triggerCallAction("video")} className="p-2 hover:bg-white/5 rounded-sm text-zinc-400 transition-colors"><Video className="w-4 h-4" /></button>
                    <button onClick={onToggleDetails} className={cn("p-2 hover:bg-white/5 rounded-sm transition-colors", showDetails ? "text-[#a3e635] bg-[#a3e635]/10" : "text-zinc-400")}>
                        <Info className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-opacity-5 scroll-smooth">
                <div className="flex justify-center">
                    <span className="text-[10px] text-[#a3e635] bg-[#a3e635]/5 px-3 py-1.5 rounded-sm border border-[#a3e635]/20 font-mono uppercase tracking-wider">
                        Conversation active
                    </span>
                </div>

                {isLoading && (
                    <div className="space-y-3">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div key={index} className="h-14 rounded-sm border border-zinc-800 bg-zinc-900/40 animate-pulse" />
                        ))}
                    </div>
                )}

                {!isLoading && messages.map((msg) => (
                    <MessageBubble key={msg.id} isMe={msg.isMe} text={msg.text} time={msg.time} isRead={msg.isRead} />
                ))}

                {!isLoading && messages.length === 0 && (
                    <div className="text-center text-zinc-500 text-xs font-mono">NO_MESSAGES_YET</div>
                )}

                {actionNote && (
                    <div className="flex justify-center">
                        <span className="text-[10px] text-zinc-300 bg-zinc-900/70 border border-zinc-800 rounded-sm px-2.5 py-1 font-mono uppercase">
                            {actionNote}
                        </span>
                    </div>
                )}
            </div>

            <div className="p-4 border-t border-zinc-800 bg-zinc-900/40">
                <div className="flex gap-2 bg-black/40 border border-zinc-800 rounded-sm p-2 focus-within:border-[#a3e635]/50 transition-colors">
                    <button onClick={attachMockFile} className="p-2 text-zinc-500 hover:text-white transition-colors"><Paperclip className="w-4 h-4" /></button>
                    <input
                        type="text"
                        value={draft}
                        onChange={(event) => setDraft(event.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                event.preventDefault();
                                handleSend();
                            }
                        }}
                        placeholder={`Message ${conversation.brand}...`}
                        className="flex-1 bg-transparent text-sm text-white focus:outline-none placeholder:text-zinc-700 font-sans"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!draft.trim()}
                        className={cn(
                            "p-2 rounded-sm transition-colors font-bold shadow-[0_0_10px_rgba(163,230,53,0.2)]",
                            draft.trim()
                                ? "bg-[#a3e635] hover:bg-[#bef264] text-black"
                                : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
                        )}
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
                <div className="flex justify-between mt-2 px-2 font-mono">
                    <button onClick={insertTemplate} className="text-[10px] text-zinc-600 hover:text-[#a3e635] transition-colors">USE_TEMPLATE...</button>
                    <span className="text-[10px] text-zinc-600">PRESS_ENTER_TO_SEND</span>
                </div>
            </div>
        </div>
    );
}
