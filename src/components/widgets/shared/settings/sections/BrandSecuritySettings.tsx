"use client";

import { useState } from "react";
import { SettingsSection, ToggleGroup } from "../BrandSettingsComponents";
import { Shield, Smartphone } from "lucide-react";
import { GlassTechCard } from "@/components/GlassTechCard";
import { toast } from "sonner";
import { ConfirmModal } from "../../ConfirmModal";

const MOCK_RECOVERY_CODES = [
    "XKQP-M8VN", "WR7T-4LBJ", "ZN2Y-HCDF", "GTSX-P9QA",
    "BV6M-RWEK", "YU3N-LQDP", "HMFA-8CZX", "TRJB-6NWY",
    "CDVK-M2PQ", "SXFH-7TBR",
];

export function SecuritySettings() {
    const [smsBackup, setSmsBackup] = useState(false);
    const [showDisable2FA, setShowDisable2FA] = useState(false);
    const [showRecoveryCodes, setShowRecoveryCodes] = useState(false);
    const [showRevokeConfirm, setShowRevokeConfirm] = useState(false);
    const [showLogoutAll, setShowLogoutAll] = useState(false);
    const [twoFAActive, setTwoFAActive] = useState(true);

    const handleDisable2FA = () => {
        setTwoFAActive(false);
        toast.error("2FA disabled — your account is less secure. Re-enable it as soon as possible.");
    };

    const handleRevokeSession = () => {
        toast.success("Session revoked — iPhone 15 Pro has been signed out.");
    };

    const handleLogoutAll = () => {
        toast.success("All other sessions signed out successfully.");
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* 2FA */}
            <SettingsSection title="Two-Factor Authentication" description="Add an extra layer of security to your account.">
                <GlassTechCard title="2FA_STATUS" className={`h-auto p-4 border-dashed relative ${twoFAActive ? "border-[#a3e635]/30 bg-[#a3e635]/5" : "border-red-500/30 bg-red-950/10"}`}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${twoFAActive ? "bg-[#a3e635]/20" : "bg-red-500/20"}`}>
                                <Shield className={`w-5 h-5 ${twoFAActive ? "text-[#a3e635]" : "text-red-500"}`} />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-white">Authenticator App</h4>
                                <p className={`text-[10px] font-mono ${twoFAActive ? "text-zinc-400" : "text-red-400"}`}>
                                    {twoFAActive ? "CODE_GENERATOR_ACTIVE" : "2FA_DISABLED"}
                                </p>
                            </div>
                        </div>
                        {twoFAActive ? (
                            <button onClick={() => setShowDisable2FA(true)} className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs hover:border-red-500 hover:text-red-500 transition-colors uppercase">
                                Disable
                            </button>
                        ) : (
                            <button onClick={() => { setTwoFAActive(true); toast.success("2FA re-enabled successfully."); }} className="px-3 py-1.5 bg-[#a3e635]/10 border border-[#a3e635]/30 text-[#a3e635] text-xs hover:bg-[#a3e635]/20 transition-colors uppercase">
                                Enable
                            </button>
                        )}
                    </div>
                </GlassTechCard>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <ToggleGroup
                        label="SMS Backup"
                        description="Use phone number as a fallback method."
                        checked={smsBackup}
                        onChange={(v) => { setSmsBackup(v); toast.success(v ? "SMS backup enabled" : "SMS backup disabled"); }}
                    />
                    <div className="flex items-center justify-between p-3 border border-white/5 bg-white/[0.02] rounded-sm">
                        <div>
                            <div className="text-xs font-bold text-zinc-300 font-mono">Recovery Codes</div>
                            <div className="text-[10px] text-zinc-600 font-mono mt-0.5">10 codes remaining</div>
                        </div>
                        <button onClick={() => setShowRecoveryCodes(true)} className="text-xs text-[#a3e635] hover:underline font-mono uppercase">View</button>
                    </div>
                </div>
            </SettingsSection>

            {/* Active Sessions */}
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
                                    <button onClick={() => setShowRevokeConfirm(true)} className="text-zinc-500 hover:text-red-400 transition-colors text-xs font-mono">Revoke</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-end">
                    <button onClick={() => setShowLogoutAll(true)} className="text-[10px] text-red-500 hover:text-red-400 font-mono uppercase border-b border-red-500/20 hover:border-red-500 transition-colors pb-0.5">
                        Log_Out_All_Other_Sessions
                    </button>
                </div>
            </SettingsSection>

            {/* Recovery Codes Modal */}
            {showRecoveryCodes && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowRecoveryCodes(false)} />
                    <div className="relative z-10 w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-sm shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
                            <div>
                                <h3 className="text-sm font-bold text-white font-display uppercase tracking-wide">Recovery Codes</h3>
                                <p className="text-[10px] text-zinc-500 font-mono mt-0.5">Store these in a safe place. Each can only be used once.</p>
                            </div>
                            <button onClick={() => setShowRecoveryCodes(false)} className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-sm transition-colors">✕</button>
                        </div>
                        <div className="px-6 py-5">
                            <div className="grid grid-cols-2 gap-2 bg-zinc-900/60 border border-zinc-800 rounded-sm p-4">
                                {MOCK_RECOVERY_CODES.map((code, i) => (
                                    <div key={i} className="text-xs font-mono text-zinc-300 tracking-widest">{code}</div>
                                ))}
                            </div>
                            <p className="text-[10px] text-amber-500 font-mono mt-3 flex items-start gap-1">
                                ⚠ These codes won't be shown again. Download or print them now.
                            </p>
                        </div>
                        <div className="flex gap-3 px-6 py-4 border-t border-zinc-800">
                            <button onClick={() => { navigator.clipboard?.writeText(MOCK_RECOVERY_CODES.join("\n")); toast.success("Recovery codes copied"); }} className="flex-1 py-2 border border-zinc-700 text-zinc-400 hover:text-white text-xs uppercase font-mono rounded-sm transition-colors">Copy All</button>
                            <button onClick={() => { toast.success("Recovery codes downloaded"); setShowRecoveryCodes(false); }} className="flex-1 py-2 bg-[#a3e635] text-black font-bold text-xs uppercase rounded-sm hover:bg-[#b0f545] transition-colors">Download</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Disable 2FA Confirm */}
            <ConfirmModal
                open={showDisable2FA}
                onClose={() => setShowDisable2FA(false)}
                onConfirm={handleDisable2FA}
                title="Disable Two-Factor Authentication"
                description="This will remove an important security layer from your account. Anyone who gains access to your password will be able to sign in without a second factor."
                confirmLabel="Yes, Disable 2FA"
                variant="danger"
            />

            {/* Revoke Session Confirm */}
            <ConfirmModal
                open={showRevokeConfirm}
                onClose={() => setShowRevokeConfirm(false)}
                onConfirm={handleRevokeSession}
                title="Revoke Session"
                description="iPhone 15 Pro will be signed out immediately. This cannot be undone."
                confirmLabel="Revoke Session"
                variant="danger"
            />

            {/* Log out all confirm */}
            <ConfirmModal
                open={showLogoutAll}
                onClose={() => setShowLogoutAll(false)}
                onConfirm={handleLogoutAll}
                title="Sign Out All Other Sessions"
                description="All sessions except this one (MacBook Pro) will be terminated immediately."
                confirmLabel="Sign Out All"
                variant="danger"
            />
        </div>
    );
}

function MonitorIcon({ className }: { className?: string }) {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="14" x="2" y="3" rx="2" /><line x1="8" x2="16" y1="21" y2="21" /><line x1="12" x2="12" y1="17" y2="21" />
        </svg>
    );
}
