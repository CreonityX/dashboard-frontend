"use client";

import { Bell, AlertTriangle, CheckCircle, Info, X } from "lucide-react";

export function NotificationCenter() {
    const notifications = [
        { id: 1, title: "Payout Processed", msg: "$12,450 sent to Wallet 0x82...9A", time: "2m ago", type: "success" },
        { id: 2, title: "Campaign Budget Low", msg: "Summer_Launch_v3 at 85% spend.", time: "15m ago", type: "warning" },
        { id: 3, title: "New Feature", msg: "Creonity v15.0 update applied.", time: "1h ago", type: "info" },
        { id: 4, title: "Contract Signed", msg: "Logitech approved terms.", time: "3h ago", type: "success" },
    ];

    return (
        <div className="flex flex-col h-full bg-zinc-950 font-sans">
            <div className="flex items-center justify-between p-6 pb-2">
                <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-white" />
                    <h3 className="text-sm font-bold text-white font-display tracking-wide">NOTIFICATIONS</h3>
                </div>
                <button className="text-[10px] text-zinc-500 hover:text-white font-mono underline decoration-zinc-800 underline-offset-4 transition-colors">CLEAR_ALL</button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-2 min-h-0">
                {notifications.map((n) => (
                    <div key={n.id} className="relative group bg-zinc-900/40 border border-zinc-800 p-3 pl-4 rounded-sm hover:bg-zinc-900/60 transition-colors">
                        <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-sm ${n.type === 'success' ? 'bg-[#a3e635]' :
                                n.type === 'warning' ? 'bg-orange-500' :
                                    'bg-blue-500'
                            }`} />

                        <div className="flex justify-between items-start">
                            <h4 className="text-xs font-bold text-white font-display">{n.title}</h4>
                            <span className="text-[9px] text-zinc-600 font-mono">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-zinc-400 mt-1 leading-snug pr-4">{n.msg}</p>

                        <button className="absolute top-2 right-2 text-zinc-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            <X className="w-3 h-3" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
