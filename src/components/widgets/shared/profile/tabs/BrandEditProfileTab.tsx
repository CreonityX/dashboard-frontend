"use client";

import { ProfileSection } from "@/components/widgets/shared/profile/ProfileComponents";
import { InputGroup, SelectGroup, ToggleGroup } from "@/components/widgets/shared/settings/BrandSettingsComponents";
import { Plus, Upload, Globe, Twitter, Instagram, Linkedin } from "lucide-react";
import { toast } from "sonner";

export function EditProfileTab() {
    return (
        <div className="max-w-4xl mx-auto px-6 pb-20 animate-in fade-in zoom-in-95 duration-500 space-y-12">
            {/* Basic Info */}
            <ProfileSection title="Company Essentials">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2 flex items-center gap-6">
                        <div className="w-24 h-24 bg-zinc-900 border border-zinc-700 rounded-full flex items-center justify-center relative overflow-hidden group cursor-pointer">
                            <span className="text-zinc-500 text-xs font-mono group-hover:hidden">LOGO</span>
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Upload className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="h-32 bg-zinc-900 border border-zinc-700 rounded-sm relative overflow-hidden group cursor-pointer flex items-center justify-center">
                                <span className="text-zinc-500 text-xs font-mono group-hover:hidden">COVER IMAGE (1200x300)</span>
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Upload className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <InputGroup label="Company Name" defaultValue="Creonity Inc." />
                    <SelectGroup
                        label="Industry"
                        options={[
                            { label: 'Technology', value: 'tech' },
                            { label: 'E-commerce', value: 'ecom' },
                            { label: 'Fashion', value: 'fashion' }
                        ]}
                    />
                    <InputGroup label="Headquarters" defaultValue="San Francisco, CA" />
                    <SelectGroup
                        label="Company Size"
                        options={[
                            { label: '1-10 Employees', value: '1-10' },
                            { label: '11-50 Employees', value: '11-50' },
                            { label: '51-200 Employees', value: '51-200' },
                            { label: '200+ Employees', value: '200+' }
                        ]}
                    />
                    <InputGroup label="Founded Year" defaultValue="2022" />
                    <InputGroup label="Website URL" defaultValue="https://creonity.com" />
                </div>
            </ProfileSection>

            {/* About Section */}
            <ProfileSection title="About The Brand">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-mono text-zinc-400 font-medium uppercase">Company Description</label>
                        <textarea
                            className="w-full h-32 bg-zinc-900/50 border border-zinc-800 rounded-sm px-4 py-2.5 text-xs text-white font-mono placeholder:text-zinc-700 outline-none resize-none focus:border-[#a3e635]/50 focus:bg-zinc-900 transition-all"
                            defaultValue="Creonity is the leading platform for creator economy infrastructure. We build tools that empower the next generation of digital entrepreneurs."
                        />
                        <div className="text-[10px] text-zinc-600 font-mono text-right">145/500 WORDS</div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-mono text-zinc-400 font-medium uppercase">Mission Statement</label>
                        <textarea
                            className="w-full h-20 bg-zinc-900/50 border border-zinc-800 rounded-sm px-4 py-2.5 text-xs text-white font-mono placeholder:text-zinc-700 outline-none resize-none focus:border-[#a3e635]/50 focus:bg-zinc-900 transition-all"
                            defaultValue="To democratize access to professional-grade tools for creators worldwide."
                        />
                    </div>
                </div>
            </ProfileSection>

            {/* Requirements */}
            <ProfileSection title="Partnership Criteria">
                <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-sm space-y-4">
                    <h4 className="text-xs font-bold text-white uppercase font-mono mb-2">Ideal Creator Profile</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <SelectGroup label="Primary Platforms" options={[{ label: 'YouTube & Instagram', value: 'yt_ig' }]} />
                        <SelectGroup label="Minimum Audience Size" options={[{ label: '10k - 50k Followers', value: 'micro' }]} />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-mono text-zinc-400 font-medium uppercase">Collaboration Preferences</label>
                        <div className="flex flex-wrap gap-2">
                            {['Product Reviews', 'Sponsored Integration', 'Brand Ambassador'].map((tag) => (
                                <span key={tag} className="px-3 py-1 bg-zinc-800 border border-zinc-700 rounded-full text-xs text-white flex items-center gap-2 group cursor-pointer hover:border-[#a3e635]">
                                    {tag}
                                </span>
                            ))}
                            <button className="px-3 py-1 border border-dashed border-zinc-600 rounded-full text-xs text-zinc-500 font-mono hover:text-white hover:border-white flex items-center gap-1">
                                <Plus className="w-3 h-3" /> ADD_TYPE
                            </button>
                        </div>
                    </div>
                </div>
            </ProfileSection>

            {/* Social Links */}
            <ProfileSection title="Social Presence">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <InputGroup label="Twitter / X" placeholder="@handle" icon={<Twitter className="w-4 h-4" />} />
                    <InputGroup label="Instagram" placeholder="@handle" icon={<Instagram className="w-4 h-4" />} />
                    <InputGroup label="LinkedIn" placeholder="Company Page" icon={<Linkedin className="w-4 h-4" />} />
                </div>
            </ProfileSection>

            {/* Save Actions */}
            <div className="flex justify-end gap-4 pt-6 border-t border-white/5">
                <button onClick={() => toast("Changes discarded", { description: "Profile reverted to last saved state." })} className="px-6 py-2 border border-zinc-700 text-zinc-400 hover:text-white hover:border-white transition-colors text-xs uppercase font-mono">
                    Discard_Changes
                </button>
                <button onClick={() => toast.success("Profile saved successfully")} className="px-6 py-2 bg-[#a3e635] text-black font-bold text-xs uppercase hover:bg-[#b0f545] transition-colors shadow-[0_0_15px_rgba(163,230,53,0.2)]">
                    Save_Profile
                </button>
            </div>
        </div>
    );
}
