"use client";

import { useEffect, useState } from "react";
import { Send, Paperclip, AlertCircle, CheckCircle, Clock } from "lucide-react";

export function LiveChat() {
    const [messages, setMessages] = useState<{ id: string, sender: 'user' | 'agent', text: string, time: string }[]>([
        { id: '1', sender: 'agent', text: 'Hello! Welcome to Creonity Live Support. How can I assist you today?', time: '10:00 AM' }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const handleSend = () => {
        if (!input.trim()) return;

        const newMessage = {
            id: Date.now().toString(),
            sender: 'user' as const,
            text: input,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, newMessage]);
        setInput("");
        setIsTyping(true);

        // Simulate agent reply
        setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                sender: 'agent',
                text: "Thanks for reaching out! An agent will be with you shortly.",
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
        }, 2000);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-200px)] max-h-[600px] border border-white/5 bg-white/[0.02] rounded-sm overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            {/* Chat Header */}
            <div className="p-4 border-b border-white/5 bg-zinc-900/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-[#a3e635]/20 flex items-center justify-center border border-[#a3e635]/30">
                            <span className="font-bold text-[#a3e635]">CS</span>
                        </div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#a3e635] border-2 border-zinc-900 rounded-full animate-pulse"></div>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-wide font-display">Live Support</h3>
                        <p className="text-[10px] text-zinc-400 font-mono">Typically replies in under 2 minutes</p>
                    </div>
                </div>
                <div className="hidden md:flex items-center gap-4 text-xs font-mono text-zinc-500">
                    <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3" />
                        <span>9:00 AM - 6:00 PM EST</span>
                    </div>
                </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                <div className="flex justify-center mb-4">
                    <span className="text-[10px] text-zinc-600 bg-zinc-900/50 px-3 py-1 rounded-full border border-white/5 font-mono">Today</span>
                </div>

                {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-sm p-3 ${msg.sender === 'user'
                                ? 'bg-[#a3e635] text-black rounded-tr-none'
                                : 'bg-zinc-800 text-white rounded-tl-none'
                            }`}>
                            <p className="text-xs leading-relaxed font-sans">{msg.text}</p>
                            <p className={`text-[9px] mt-1 font-mono text-right ${msg.sender === 'user' ? 'text-black/60' : 'text-zinc-500'
                                }`}>{msg.time}</p>
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-zinc-800 text-white p-3 rounded-sm rounded-tl-none flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce delay-0"></span>
                            <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce delay-150"></span>
                            <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce delay-300"></span>
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/5 bg-zinc-900/50">
                <div className="flex items-end gap-2 bg-zinc-950 border border-zinc-800 p-2 rounded-sm focus-within:border-[#a3e635]/50 transition-colors">
                    <button className="p-2 text-zinc-500 hover:text-white transition-colors">
                        <Paperclip className="w-4 h-4" />
                    </button>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                        placeholder="Type your message..."
                        className="flex-1 bg-transparent border-none text-xs text-white placeholder:text-zinc-600 focus:ring-0 resize-none max-h-24 min-h-[40px] py-2 font-mono"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim()}
                        className="p-2 bg-[#a3e635] text-black rounded-sm hover:bg-[#b5f045] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
                <div className="text-[9px] text-zinc-600 font-mono mt-2 text-center">
                    Chats are monitored for quality assurance.
                </div>
            </div>
        </div>
    );
}
