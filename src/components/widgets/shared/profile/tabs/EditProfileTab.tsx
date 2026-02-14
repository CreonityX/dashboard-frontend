"use client";

import { ProfileSection } from "@/components/widgets/shared/profile/ProfileComponents";
import { InputGroup, SelectGroup, ToggleGroup } from "@/components/widgets/shared/settings/SettingsComponents";
import { Plus } from "lucide-react";

export function EditProfileTab() {
    return (
        <div className="max-w-4xl mx-auto px-6 pb-20 animate-in fade-in zoom-in-95 duration-500 space-y-12">
            {/* Basic Info */}
            <ProfileSection title="Identity Details">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputGroup label="Display Name" defaultValue="Kai_Zen_Official" />
                    <InputGroup label="Username" defaultValue="@kai_zen" />
                    <InputGroup label="Tagline" defaultValue="Visual Alchemist & 3D Motion Designer" className="md:col-span-2" />
                    <div className="md:col-span-2 space-y-2">
                        <label className="text-xs font-mono text-zinc-400 font-medium uppercase">Bio</label>
                        <textarea
                            className="w-full h-32 bg-zinc-900/50 border border-zinc-800 rounded-sm px-4 py-2.5 text-xs text-white font-mono placeholder:text-zinc-700 outline-none resize-none focus:border-[#a3e635]/50 focus:bg-zinc-900 transition-all"
                            defaultValue="Senior Motion Designer with 7+ years of experience crafting immersive digital experiences. Specializing in Houdini simulations, C4D, and Unreal Engine real-time environments."
                        />
                        <div className="text-[10px] text-zinc-600 font-mono text-right">240/500 CHARS</div>
                    </div>
                </div>
            </ProfileSection>

            {/* Expertise */}
            <ProfileSection title="Expertise & Skills">
                <div className="space-y-6">
                    <div>
                        <InputGroup label="Add New Skill Tag" placeholder="e.g. Character Design, VFX..." action={<button className="text-xs text-[#a3e635] uppercase font-mono">Add</button>} />
                        <div className="flex flex-wrap gap-2 mt-3">
                            {['3D Motion Design', 'Visual Effects', 'Art Direction', 'Brand Identity', 'Cinema 4D', 'Houdini'].map((tag) => (
                                <span key={tag} className="px-3 py-1 bg-zinc-800 border border-zinc-700 rounded-full text-xs text-white flex items-center gap-2 group cursor-pointer hover:border-red-500">
                                    {tag}
                                    <span className="hidden group-hover:inline text-red-500">×</span>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </ProfileSection>

            {/* Availability */}
            <ProfileSection title="Collaboration Status">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ToggleGroup label="Accepting New Gigs" checked={true} onChange={() => { }} />
                    <SelectGroup
                        label="Response Time"
                        options={[
                            { label: 'Within 24 Hours', value: '24h' },
                            { label: 'Within 2 Days', value: '48h' },
                            { label: 'Usually a week', value: 'week' }
                        ]}
                    />
                </div>
            </ProfileSection>

            {/* Save Actions */}
            <div className="flex justify-end gap-4 pt-6 border-t border-white/5">
                <button className="px-6 py-2 border border-zinc-700 text-zinc-400 hover:text-white hover:border-white transition-colors text-xs uppercase font-mono">
                    Discard_Changes
                </button>
                <button className="px-6 py-2 bg-[#a3e635] text-black font-bold text-xs uppercase hover:bg-[#b0f545] transition-colors shadow-[0_0_15px_rgba(163,230,53,0.2)]">
                    Save_Profile
                </button>
            </div>
        </div>
    );
}
