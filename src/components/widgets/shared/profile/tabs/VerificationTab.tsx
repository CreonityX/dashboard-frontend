"use client";

import { ProfileSection } from "@/components/widgets/shared/profile/ProfileComponents";
import { ShieldCheck, Fingerprint, CheckCircle2 } from "lucide-react";
import { GlassTechCard } from "@/components/GlassTechCard";

export function VerificationTab() {
    return (
        <div className="max-w-4xl mx-auto px-6 pb-20 animate-in fade-in zoom-in-95 duration-500 space-y-12">
            {/* Identity Status */}
            <ProfileSection title="Identity Verification">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <GlassTechCard title="GOVT_ID_STATUS" className="h-auto p-6 border-dashed border-[#a3e635]/30 bg-[#a3e635]/5">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-[#a3e635]/20 rounded-full">
                                <ShieldCheck className="w-6 h-6 text-[#a3e635]" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-white mb-1">Identity Verified</h3>
                                <p className="text-xs text-zinc-400 mb-4">Your government ID has been authenticated.</p>
                                <div className="flex items-center gap-2 text-[10px] text-[#a3e635] font-mono bg-[#a3e635]/10 px-2 py-1 rounded-sm w-fit">
                                    <CheckCircle2 className="w-3 h-3" /> VERIFIED_ON_2025_01_12
                                </div>
                            </div>
                        </div>
                    </GlassTechCard>

                    <div className="p-6 border border-zinc-700 bg-zinc-900/50 rounded-sm opacity-50">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-zinc-800 rounded-full">
                                <Fingerprint className="w-6 h-6 text-zinc-500" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-zinc-300 mb-1">Biometric Verification</h3>
                                <p className="text-xs text-zinc-500 mb-4">Enhance security with facial recognition.</p>
                                <button className="px-4 py-1.5 border border-zinc-600 text-zinc-400 text-xs uppercase cursor-not-allowed">
                                    Coming_Soon
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </ProfileSection>

            {/* Social Proof */}
            <ProfileSection title="Platform Connections">
                <div className="space-y-4">
                    <SocialVerifyRow platform="Instagram" handle="@kai_zen_creative" verified={true} />
                    <SocialVerifyRow platform="YouTube" handle="Kai Zen TV" verified={true} />
                    <SocialVerifyRow platform="TikTok" handle="@kai_zen" verified={false} />
                    <SocialVerifyRow platform="Twitter / X" handle="Not Connected" verified={false} />
                </div>
            </ProfileSection>
        </div>
    );
}

function SocialVerifyRow({ platform, handle, verified }: { platform: string, handle: string, verified: boolean }) {
    return (
        <div className="flex items-center justify-between p-4 border border-white/5 bg-white/[0.02] rounded-sm">
            <div>
                <div className="text-sm font-bold text-white mb-0.5">{platform}</div>
                <div className="text-xs text-zinc-500 font-mono">{handle}</div>
            </div>
            {verified ? (
                <div className="flex items-center gap-2 text-xs text-[#a3e635] font-bold uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4" /> Verified
                </div>
            ) : (
                <button className="text-xs text-zinc-400 hover:text-white border-b border-zinc-600 hover:border-white transition-colors pb-0.5 font-mono uppercase">
                    Connect_Account
                </button>
            )}
        </div>
    )
}
