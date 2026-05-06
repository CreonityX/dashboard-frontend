"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronRight, Phone, Video, Info, Paperclip, Send, Film } from "lucide-react";
import { MessageBubble, Avatar } from "../BrandMessagesComponents";
import { MOCK_BRAND_CONVERSATIONS, MESSAGE_TEMPLATES } from "@/lib/brand-data";

// Mock Messages for Demo
const MOCK_MESSAGES = [
    { id: '1', text: 'Hi! We loved your last video. Are you available for a sponsorship on our S26 campaign?', isMe: true, time: '10:30 AM' },
    { id: '2', text: 'Hey! Thanks so much. I\'d love to hear more about the campaign details. What are you thinking?', isMe: false, time: '10:32 AM', isRead: true },
    { id: '3', text: 'We are launching the S26 series and want to focus on the low-light camera capabilities.', isMe: true, time: '10:35 AM' },
    { id: '4', text: 'That sounds perfect. I actually have a trip coming up where I could test that extensively.', isMe: false, time: '10:36 AM', isRead: true },
    { id: '5', text: 'Great! I\'ll send over the creative brief and NDA shortly.', isMe: true, time: '10:40 AM' },
];

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
    const [messageInput, setMessageInput] = useState("");
    const [showTemplates, setShowTemplates] = useState(false);
    const conversation = MOCK_BRAND_CONVERSATIONS.find((c: { id: string }) => c.id === conversationId);

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

    const insertTemplate = (text: string) => {
        setMessageInput(text);
        setShowTemplates(false);
    };

    return (
        <div className="flex flex-col h-full bg-zinc-900/20">
            {/* Header */}
            <div className="h-16 border-b border-zinc-800 flex items-center px-6 justify-between shrink-0 bg-zinc-900/40">
                <div className="flex items-center gap-3">
                    <button
                        onClick={onBack}
                        className="md:hidden mr-2 text-zinc-400 hover:text-white"
                    >
                        <ChevronRight className="w-5 h-5 rotate-180" />
                    </button>
                    <Avatar fallback={conversation.creator.substring(0, 2).toUpperCase()} online={conversation.isOnline} />
                    <div>
                        <div className="text-sm font-bold text-white flex items-center gap-2 font-display tracking-tight">
                            {conversation.creator}
                            {conversation.isOnline && <div className="w-1.5 h-1.5 rounded-full bg-[#a3e635] shadow-[0_0_5px_rgba(163,230,53,0.5)]" />}
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] text-zinc-500 font-mono uppercase">
                                {conversation.isSupport ? 'Official Support' : 'Replies in ~10m'}
                            </span>
                            {conversation.campaign && (
                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#a3e635]/10 border border-[#a3e635]/20 text-[#a3e635] font-mono truncate max-w-[140px]">
                                    {conversation.campaign}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-white/5 rounded-sm text-zinc-400 group relative transition-colors" title="Voice call">
                        <Phone className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-white/5 rounded-sm text-zinc-400 transition-colors" title="Video call">
                        <Video className="w-4 h-4" />
                    </button>
                    <button onClick={onToggleDetails} className={cn("p-2 hover:bg-white/5 rounded-sm transition-colors", showDetails ? "text-[#a3e635] bg-[#a3e635]/10" : "text-zinc-400")}>
                        <Info className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar relative scroll-smooth">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
                <div className="relative z-10">
                    {/* Campaign Context Banner */}
                    {conversation.campaign && !conversation.isSupport && (
                        <div className="flex justify-center">
                            <div className="flex items-center gap-2 px-3 py-2 rounded-sm bg-zinc-900/60 border border-zinc-800">
                                <Film className="w-3.5 h-3.5 text-[#a3e635]" />
                                <span className="text-[10px] text-zinc-400 font-mono">Campaign: {conversation.campaign}</span>
                            </div>
                        </div>
                    )}

                    {/* System Message */}
                    <div className="flex justify-center">
                        <span className="text-[10px] text-[#a3e635] bg-[#a3e635]/5 px-3 py-1.5 rounded-sm border border-[#a3e635]/20 font-mono uppercase tracking-wider">
                            Conversation started Today
                        </span>
                    </div>

                    {MOCK_MESSAGES.map((msg) => (
                        <MessageBubble
                            key={msg.id}
                            isMe={msg.isMe}
                            text={msg.text}
                            time={msg.time}
                            isRead={msg.isRead}
                            theirFallback={conversation.creator.substring(0, 2).toUpperCase()}
                        />
                    ))}
                </div>
            </div>

            {/* Composer */}
            <div className="p-4 border-t border-zinc-800 bg-zinc-900/40">
                {/* Templates dropdown */}
                {showTemplates && (
                    <div className="mb-3 p-2 bg-zinc-900/80 border border-zinc-800 rounded-sm max-h-40 overflow-y-auto custom-scrollbar">
                        <div className="text-[10px] font-bold text-zinc-500 uppercase mb-2 font-mono">Quick Templates</div>
                        <div className="space-y-1">
                            {MESSAGE_TEMPLATES.map(t => (
                                <button
                                    key={t.id}
                                    onClick={() => insertTemplate(t.text)}
                                    className="block w-full text-left px-2 py-1.5 rounded text-xs text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors font-sans truncate"
                                    title={t.text}
                                >
                                    {t.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                <div className="flex gap-2 bg-black/40 border border-zinc-800 rounded-sm p-2 focus-within:border-[#a3e635]/50 transition-colors">
                    <button className="p-2 text-zinc-500 hover:text-white transition-colors" title="Attach file">
                        <Paperclip className="w-4 h-4" />
                    </button>
                    <input
                        type="text"
                        placeholder={`Message ${conversation.creator}...`}
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        className="flex-1 bg-transparent text-sm text-white focus:outline-none placeholder:text-zinc-700 font-sans"
                    />
                    <button className="p-2 bg-[#a3e635] hover:bg-[#bef264] text-black rounded-sm transition-colors font-bold shadow-[0_0_10px_rgba(163,230,53,0.2)]">
                        <Send className="w-4 h-4" />
                    </button>
                </div>
                <div className="flex justify-between mt-2 px-2 font-mono">
                    <button
                        onClick={() => setShowTemplates(!showTemplates)}
                        className={cn(
                            "text-[10px] transition-colors",
                            showTemplates ? "text-[#a3e635]" : "text-zinc-600 hover:text-[#a3e635]"
                        )}
                    >
                        USE_TEMPLATE...
                    </button>
                    <span className="text-[10px] text-zinc-600">PRESS_ENTER_TO_SEND</span>
                </div>
            </div>
        </div>
    );
}
