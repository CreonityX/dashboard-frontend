"use client";

import { SettingsSection, ToggleGroup } from "../SettingsComponents";
import { Instagram, Youtube, Twitter, Code, Key } from "lucide-react";

export function IntegrationSettings() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Social Accounts */}
            <SettingsSection title="Connected Accounts" description="Link your social profiles to showcase your reach.">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SocialCard icon={Instagram} label="Instagram" connected={true} username="@kai_zen_creative" />
                    <SocialCard icon={Youtube} label="YouTube" connected={true} username="Kai Zen TV" />
                    <SocialCard icon={Twitter} label="Twitter / X" connected={false} />
                </div>
            </SettingsSection>

            {/* Developer Settings */}
            <SettingsSection title="Developer API">
                <div className="p-4 border border-dashed border-zinc-700 bg-zinc-900/20 rounded-sm space-y-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <h4 className="text-sm font-bold text-white mb-1">API Keys</h4>
                            <p className="text-xs text-zinc-500">Manage access tokens for external tools.</p>
                        </div>
                        <button className="px-3 py-1.5 bg-[#a3e635]/10 text-[#a3e635] text-xs font-mono border border-[#a3e635]/20 hover:bg-[#a3e635]/20 uppercase">
                            Generate_New_Key
                        </button>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 bg-black/50 border border-zinc-800 rounded-sm">
                            <div className="flex items-center gap-3">
                                <Key className="w-3 h-3 text-zinc-500" />
                                <code className="text-[10px] text-zinc-300 font-mono">sk_live_...9f2A</code>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-[9px] text-zinc-600 font-mono uppercase">Created 2d ago</span>
                                <button className="text-zinc-500 hover:text-red-500 transition-colors">
                                    <TrashIcon className="w-3 h-3" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </SettingsSection>
        </div>
    );
}

function SocialCard({ icon: Icon, label, connected, username }: { icon: any, label: string, connected: boolean, username?: string }) {
    return (
        <div className="flex items-center justify-between p-4 border border-white/5 bg-white/[0.02] rounded-sm">
            <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${connected ? "bg-white text-black" : "bg-zinc-800 text-zinc-500"}`}>
                    <Icon className="w-4 h-4" />
                </div>
                <div>
                    <div className="text-xs font-bold text-white">{label}</div>
                    {connected ? (
                        <div className="text-[10px] text-[#a3e635] font-mono">{username}</div>
                    ) : (
                        <div className="text-[10px] text-zinc-500 font-mono">Not Connected</div>
                    )}
                </div>
            </div>
            <button className={`text-xs font-mono uppercase hover:underline ${connected ? "text-zinc-500 hover:text-red-400" : "text-zinc-300 hover:text-white"}`}>
                {connected ? "Disconnect" : "Connect"}
            </button>
        </div>
    )
}

function TrashIcon({ className }: { className?: string }) {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
    )
}
