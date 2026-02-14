"use client";

import { Send, Hash, AtSign, MoreVertical, Plus } from "lucide-react";

export function MessageTerminal() {
    const messages = [
        { id: 1, user: "system", text: "Welcome to Creonity OS v15.0. Systems optimal.", time: "09:00", type: "system" },
        { id: 2, user: "Kai_Zen", text: "Hey! Just uploaded the final draft. Let me know what you think.", time: "10:15", type: "user" },
        { id: 3, user: "You", text: "Received. Reviewing now. Visuals look tight!", time: "10:18", type: "me" },
        { id: 4, user: "Kai_Zen", text: "Awesome. I can tweak the ending if needed.", time: "10:20", type: "user" },
    ];

    return (
        <div className="flex flex-col h-full bg-zinc-950 font-mono">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-900/50">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#a3e635] animate-pulse" />
                    <span className="text-xs font-bold text-zinc-300"># GENERAL_CHANNEL</span>
                </div>
                <button className="text-zinc-500 hover:text-white transition-colors">
                    <MoreVertical className="w-4 h-4" />
                </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex flex-col gap-1 ${msg.type === 'me' ? 'items-end' : 'items-start'}`}>
                        <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-bold ${msg.type === 'system' ? 'text-blue-400' : msg.type === 'me' ? 'text-[#a3e635]' : 'text-purple-400'}`}>
                                {msg.type === 'system' ? '>' : msg.type === 'me' ? '@YOU' : `@${msg.user}`}
                            </span>
                            <span className="text-[9px] text-zinc-600">{msg.time}</span>
                        </div>
                        <div className={`text-xs p-2 rounded-sm max-w-[80%] ${msg.type === 'system' ? 'text-zinc-500 italic border-l-2 border-zinc-700 pl-2' :
                                msg.type === 'me' ? 'bg-[#a3e635]/10 text-zinc-300 border border-[#a3e635]/20' :
                                    'bg-zinc-900 text-zinc-300 border border-zinc-700'
                            }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-zinc-800 bg-zinc-900/30">
                <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 rounded-sm p-1.5 focus-within:border-zinc-600 transition-colors">
                    <Plus className="w-4 h-4 text-zinc-600 cursor-pointer hover:text-zinc-400" />
                    <input type="text" placeholder="TYPE_MESSAGE..." className="flex-1 bg-transparent text-xs text-white focus:outline-none placeholder:text-zinc-700 font-mono" />
                    <button className="p-1 text-[#a3e635] hover:text-white transition-colors">
                        <Send className="w-3 h-3" />
                    </button>
                </div>
            </div>
        </div>
    );
}
