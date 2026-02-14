"use client";

import { User, Shield, BellRing, Smartphone, LogOut, ChevronRight, ToggleLeft, ToggleRight } from "lucide-react";
import { useState } from "react";

export function SettingsHub() {
    const [darkMode, setDarkMode] = useState(true);
    const [notifications, setNotifications] = useState(true);

    return (
        <div className="flex flex-col h-full bg-zinc-950 font-sans">
            <div className="p-6 pb-4 border-b border-white/5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 overflow-hidden">
                    {/* Placeholder Avatar */}
                    <div className="w-full h-full bg-gradient-to-tr from-zinc-700 to-zinc-600" />
                </div>
                <div>
                    <h3 className="text-sm font-bold text-white font-display">User_01</h3>
                    <p className="text-[10px] text-[#a3e635] font-mono">PRO_LICENSED</p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto min-h-0 divide-y divide-white/5">
                {/* Account */}
                <div className="p-4 space-y-1">
                    <div className="text-[10px] font-bold text-zinc-500 font-mono mb-2 uppercase">Account_Settings</div>
                    <button className="w-full flex items-center justify-between p-2 hover:bg-zinc-900 rounded-sm group transition-colors">
                        <div className="flex items-center gap-3 text-zinc-300">
                            <User className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
                            <span className="text-xs font-medium">Profile Details</span>
                        </div>
                        <ChevronRight className="w-3 h-3 text-zinc-600 group-hover:text-zinc-400" />
                    </button>
                    <button className="w-full flex items-center justify-between p-2 hover:bg-zinc-900 rounded-sm group transition-colors">
                        <div className="flex items-center gap-3 text-zinc-300">
                            <Shield className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
                            <span className="text-xs font-medium">Security & 2FA</span>
                        </div>
                        <ChevronRight className="w-3 h-3 text-zinc-600 group-hover:text-zinc-400" />
                    </button>
                </div>

                {/* Preferences */}
                <div className="p-4 space-y-1">
                    <div className="text-[10px] font-bold text-zinc-500 font-mono mb-2 uppercase">Preferences</div>
                    <div className="flex items-center justify-between p-2">
                        <div className="flex items-center gap-3 text-zinc-300">
                            <BellRing className="w-4 h-4 text-zinc-500" />
                            <span className="text-xs font-medium">Push Notifications</span>
                        </div>
                        <button onClick={() => setNotifications(!notifications)} className="text-zinc-400 hover:text-white transition-colors">
                            {notifications ? <ToggleRight className="w-8 h-8 text-[#a3e635] fill-current/10" /> : <ToggleLeft className="w-8 h-8 text-zinc-600" />}
                        </button>
                    </div>
                    <div className="flex items-center justify-between p-2">
                        <div className="flex items-center gap-3 text-zinc-300">
                            <Smartphone className="w-4 h-4 text-zinc-500" />
                            <span className="text-xs font-medium">Holographic Mode</span>
                        </div>
                        <button onClick={() => setDarkMode(!darkMode)} className="text-zinc-400 hover:text-white transition-colors">
                            {darkMode ? <ToggleRight className="w-8 h-8 text-[#a3e635] fill-current/10" /> : <ToggleLeft className="w-8 h-8 text-zinc-600" />}
                        </button>
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="p-4">
                    <button className="w-full flex items-center gap-2 p-2 text-red-400 hover:bg-red-500/10 rounded-sm transition-colors text-xs font-bold font-mono">
                        <LogOut className="w-4 h-4" /> DISCONNECT_SESSION
                    </button>
                </div>
            </div>
        </div>
    );
}
