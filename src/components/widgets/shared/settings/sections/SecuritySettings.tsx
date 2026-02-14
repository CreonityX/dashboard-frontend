"use client";

import { SettingsSection, ToggleGroup } from "../SettingsComponents";
import { Shield, Smartphone, Key } from "lucide-react";
import { GlassTechCard } from "@/components/GlassTechCard";

export function SecuritySettings() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* 2FA */}
            <SettingsSection title="Two-Factor Authentication" description="Add an extra layer of security to your account.">
                <GlassTechCard title="2FA_STATUS" className="h-auto p-4 border-dashed border-[#a3e635]/30 bg-[#a3e635]/5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-[#a3e635]/20 flex items-center justify-center">
                                <Shield className="w-5 h-5 text-[#a3e635]" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-white">Authenticator App</h4>
                                <p className="text-[10px] text-zinc-400 font-mono">CODE_GENERATOR_ACTIVE</p>
                            </div>
                        </div>
                        <button className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs hover:text-white hover:border-red-500 hover:text-red-500 transition-colors uppercase">
                            Disable
                        </button>
                    </div>
                </GlassTechCard>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <ToggleGroup
                        label="SMS Backup"
                        description="Use phone number as a fallback method."
                        checked={false}
                        onChange={() => { }}
                    />
                    <div className="flex items-center justify-between p-3 border border-white/5 bg-white/[0.02] rounded-sm">
                        <div>
                            <div className="text-xs font-bold text-zinc-300 font-mono">Recovery Codes</div>
                            <div className="text-[10px] text-zinc-600 font-mono mt-0.5">10 codes remaining</div>
                        </div>
                        <button className="text-xs text-[#a3e635] hover:underline font-mono uppercase">View</button>
                    </div>
                </div>
            </SettingsSection>

            {/* Login History */}
            <SettingsSection title="Active Sessions" description="Manage devices where you are currently logged in.">
                <div className="border border-white/5 rounded-sm overflow-hidden">
                    <table className="w-full text-left text-xs text-zinc-400">
                        <thead className="bg-white/5 font-mono uppercase text-[10px] text-zinc-500">
                            <tr>
                                <th className="p-3">Device</th>
                                <th className="p-3">Location</th>
                                <th className="p-3">Last Active</th>
                                <th className="p-3 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            <tr className="bg-white/[0.02]">
                                <td className="p-3 flex items-center gap-2">
                                    <MonitorIcon className="w-3 h-3" />
                                    <span className="text-white">MacBook Pro (This Device)</span>
                                </td>
                                <td className="p-3">San Francisco, US</td>
                                <td className="p-3 text-[#a3e635]">Now</td>
                                <td className="p-3 text-right">
                                    <span className="text-[10px] text-zinc-600">CURRENT_SESSION</span>
                                </td>
                            </tr>
                            <tr>
                                <td className="p-3 flex items-center gap-2">
                                    <Smartphone className="w-3 h-3" />
                                    <span>iPhone 15 Pro</span>
                                </td>
                                <td className="p-3">San Francisco, US</td>
                                <td className="p-3">2h ago</td>
                                <td className="p-3 text-right">
                                    <button className="text-zinc-500 hover:text-white transition-colors">Revoke</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-end">
                    <button className="text-[10px] text-red-500 hover:text-red-400 font-mono uppercase border-b border-red-500/20 hover:border-red-500 transition-colors pb-0.5">
                        Log_Out_All_Other_Sessions
                    </button>
                </div>
            </SettingsSection>
        </div>
    );
}

function MonitorIcon({ className }: { className?: string }) {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="3" rx="2" /><line x1="8" x2="16" y1="21" y2="21" /><line x1="12" x2="12" y1="17" y2="21" /></svg>
    )
}
