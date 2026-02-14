"use client";

import { ProfileSection } from "@/components/widgets/shared/profile/ProfileComponents";
import { ToggleGroup } from "@/components/widgets/shared/settings/SettingsComponents";
import { Lock, EyeOff, Search } from "lucide-react";

export function PrivacyTab() {
    return (
        <div className="max-w-4xl mx-auto px-6 pb-20 animate-in fade-in zoom-in-95 duration-500 space-y-12">
            <ProfileSection title="Visibility Settings">
                <div className="space-y-4">
                    <ToggleGroup
                        label="Public Profile"
                        description="Allow anyone to view your profile."
                        checked={true}
                        onChange={() => { }}
                    />
                    <ToggleGroup
                        label="Search Engine Indexing"
                        description="Allow Google to show your profile in results."
                        checked={true}
                        onChange={() => { }}
                    />
                    <ToggleGroup
                        label="Show Real Name"
                        description="Display your legal name alongside your username."
                        checked={false}
                        onChange={() => { }}
                    />
                </div>
            </ProfileSection>

            <ProfileSection title="Content Access">
                <div className="p-4 border border-zinc-800 bg-zinc-900/40 rounded-sm space-y-4">
                    <div className="flex items-center gap-3 mb-2">
                        <Lock className="w-4 h-4 text-zinc-400" />
                        <span className="text-sm font-bold text-white">Rate Card Visibility</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <button className="px-4 py-2 bg-[#a3e635]/20 border border-[#a3e635] text-[#a3e635] text-xs font-bold uppercase rounded-sm">
                            Public
                        </button>
                        <button className="px-4 py-2 border border-zinc-700 text-zinc-400 hover:text-white hover:border-white transition-colors text-xs uppercase rounded-sm">
                            Brands Only
                        </button>
                        <button className="px-4 py-2 border border-zinc-700 text-zinc-400 hover:text-white hover:border-white transition-colors text-xs uppercase rounded-sm">
                            Direct Link Only
                        </button>
                    </div>
                    <p className="text-[10px] text-zinc-500 mt-2">
                        Controls who can see your pricing information. "Brands Only" requires a verified brand account to view.
                    </p>
                </div>
            </ProfileSection>
        </div>
    );
}
