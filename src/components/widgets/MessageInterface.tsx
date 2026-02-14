import { Send, ShieldCheck } from "lucide-react";
import { GlassTechCard } from "../GlassTechCard";

export function MessageInterface() {
    return (
        <GlassTechCard title="Secure_Comms" description="ENCRYPTED_CHANNEL" className="h-full">
            <div className="flex flex-col h-full">

                {/* Chat Area */}
                <div className="flex-1 space-y-3 overflow-y-auto pr-2 custom-scrollbar">
                    {/* Incoming */}
                    <div className="flex flex-col items-start max-w-[90%]">
                        <div className="bg-white/5 border border-white/10 p-2 text-xs text-zinc-300 font-mono rounded-tr-lg rounded-b-lg">
                            {'>'} REQ: High_Res assets for Option_B.
                        </div>
                    </div>

                    {/* Outgoing */}
                    <div className="flex flex-col items-end max-w-[90%] ml-auto">
                        <div className="bg-[#a3e635]/10 border border-[#a3e635]/30 p-2 text-xs text-[#a3e635] font-mono rounded-tl-lg rounded-b-lg shadow-[0_0_10px_rgba(163,230,53,0.1)]">
                            ACKNOWLEDGED.
                        </div>
                        <span className="text-[8px] text-zinc-600 font-mono mt-1">DELIVERED</span>
                    </div>
                </div>

                {/* Input */}
                <div className="mt-4 pt-4 border-t border-white/5 flex gap-2">
                    <input
                        type="text"
                        placeholder="CMD_INPUT..."
                        className="flex-1 bg-black/50 border border-white/10 p-2 text-xs text-white font-mono focus:border-[#a3e635] focus:outline-none transition-colors"
                    />
                    <button className="p-2 border border-white/10 hover:border-[#a3e635] text-zinc-400 hover:text-[#a3e635] transition-colors">
                        <Send className="w-3 h-3" />
                    </button>
                </div>
            </div>
        </GlassTechCard>
    );
}
