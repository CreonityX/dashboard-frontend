"use client";

import { ProfileSection } from "@/components/widgets/shared/profile/ProfileComponents";
import { ToggleGroup, SelectGroup } from "@/components/widgets/shared/settings/SettingsComponents";
import { Lock, Eye, EyeOff } from "lucide-react";

export function PrivacyTab() {
    return (
        <div className="max-w-3xl mx-auto px-6 pb-20 animate-in fade-in zoom-in-95 duration-500 space-y-12">

            <div className="p-6 border border-zinc-800 bg-zinc-900/50 rounded-sm flex items-start gap-4">
                <Lock className="w-6 h-6 text-zinc-500 shrink-0 mt-1" />
                <div>
                    <h3 className="text-lg font-bold text-white font-display mb-1">Privacy & Visibility</h3>
                    <p className="text-sm text-zinc-400">Control who can see your brand profile and contact you.</p>
                </div>
            </div>

            <ProfileSection title="Profile Visibility">
                <div className="space-y-6">
                    <SelectGroup
                        label="Who can see your profile?"
                        options={[
                            { label: 'Public (Everyone)', value: 'public' },
                            { label: 'Verified Creators Only', value: 'verified' },
                            { label: 'Private (Invite Only)', value: 'private' }
                        ]}
                    />
                    <ToggleGroup
                        label="Show in Search Results"
                        description="Allow creators to find you in the directory."
                        checked={true}
                        onChange={() => { }}
                    />
                </div>
            </ProfileSection>

            <ProfileSection title="Content Access">
                <div className="space-y-4">
                    <ToggleGroup
                        label="Public Case Studies"
                        description="Allow anyone to view your Past Campaigns."
                        checked={true}
                        onChange={() => { }}
                    />
                    <ToggleGroup
                        label="Asset Library Access"
                        description="Require NDA acceptance before download."
                        checked={false}
                        onChange={() => { }}
                    />
                </div>
            </ProfileSection>

            <ProfileSection title="Communication">
                <div className="space-y-4">
                    <SelectGroup
                        label="Who can contact you?"
                        options={[
                            { label: 'Anyone', value: 'all' },
                            { label: 'Verified Creators Only', value: 'verified' },
                            { label: 'No one (Outbound Only)', value: 'none' }
                        ]}
                    />
                    <ToggleGroup
                        label="Allow Direct Messages"
                        description="Receive messages from creators outside of active campaigns."
                        checked={true}
                        onChange={() => { }}
                    />
                </div>
            </ProfileSection>

            <div className="flex justify-end pt-6 border-t border-white/5">
                <button className="px-6 py-2 bg-[#a3e635] text-black font-bold text-xs uppercase hover:bg-[#b0f545] transition-colors shadow-[0_0_15px_rgba(163,230,53,0.2)]">
                    Update_Privacy
                </button>
            </div>
        </div>
    );
}
