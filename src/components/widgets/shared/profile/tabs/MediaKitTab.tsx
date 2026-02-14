"use client";

import { ProfileSection } from "@/components/widgets/shared/profile/ProfileComponents";
import { Download, LayoutTemplate, Palette, Printer, Share } from "lucide-react";

export function MediaKitTab() {
    return (
        <div className="max-w-5xl mx-auto px-6 pb-20 animate-in fade-in zoom-in-95 duration-500 space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Configuration Sidebar */}
                <div className="space-y-8">
                    <ProfileSection title="Kit Configuration">
                        <div className="space-y-4">
                            <div className="p-4 border border-zinc-800 bg-zinc-900/40 rounded-sm cursor-pointer hover:border-[#a3e635]/50 transition-colors group">
                                <div className="flex items-center gap-3 mb-2">
                                    <LayoutTemplate className="w-5 h-5 text-zinc-500 group-hover:text-[#a3e635]" />
                                    <span className="text-sm font-bold text-white">Layout Style</span>
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-8 h-10 bg-zinc-800 border border-zinc-700 rounded-sm" />
                                    <div className="w-8 h-10 bg-[#a3e635]/20 border border-[#a3e635] rounded-sm" />
                                    <div className="w-8 h-10 bg-zinc-800 border border-zinc-700 rounded-sm" />
                                </div>
                            </div>

                            <div className="p-4 border border-zinc-800 bg-zinc-900/40 rounded-sm cursor-pointer hover:border-[#a3e635]/50 transition-colors group">
                                <div className="flex items-center gap-3 mb-2">
                                    <Palette className="w-5 h-5 text-zinc-500 group-hover:text-[#a3e635]" />
                                    <span className="text-sm font-bold text-white">Brand Theme</span>
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-6 h-6 rounded-full bg-[#a3e635] border-2 border-white/20" />
                                    <div className="w-6 h-6 rounded-full bg-indigo-500 border-2 border-transparent hover:border-white/50" />
                                    <div className="w-6 h-6 rounded-full bg-rose-500 border-2 border-transparent hover:border-white/50" />
                                </div>
                            </div>
                        </div>
                    </ProfileSection>

                    <ProfileSection title="Included Sections">
                        <div className="space-y-2">
                            <CheckboxRow label="Bio & Stats" checked={true} />
                            <CheckboxRow label="Audience Demographics" checked={true} />
                            <CheckboxRow label="Selected Works" checked={true} />
                            <CheckboxRow label="Rate Card" checked={false} />
                            <CheckboxRow label="Brand Partnerships" checked={true} />
                        </div>
                    </ProfileSection>

                    <button className="w-full py-3 bg-[#a3e635] text-black font-bold text-sm uppercase rounded-sm hover:bg-[#b0f545] transition-colors flex items-center justify-center gap-2">
                        <Download className="w-4 h-4" /> Download_PDF
                    </button>
                    <button className="w-full py-2 border border-zinc-700 text-zinc-400 font-mono text-xs uppercase rounded-sm hover:text-white hover:border-white transition-colors flex items-center justify-center gap-2">
                        <Share className="w-3 h-3" /> Share_Live_Link
                    </button>
                </div>

                {/* Live Preview */}
                <div className="lg:col-span-2 bg-zinc-200 text-black p-8 min-h-[800px] rounded-sm shadow-xl relative overflow-hidden font-sans">
                    {/* Watermark for preview */}
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-5">
                        <h1 className="text-9xl font-black uppercase -rotate-45">Preview</h1>
                    </div>

                    {/* PDF Content Mockup */}
                    <div className="flex justify-between items-start mb-12 relative z-10">
                        <div>
                            <h1 className="text-4xl font-black uppercase tracking-tighter mb-1">Kai Zen</h1>
                            <p className="text-zinc-600 font-mono text-sm tracking-widest">VISUAL_ALCHEMIST</p>
                        </div>
                        <div className="w-16 h-16 bg-black rounded-full" />
                    </div>

                    <div className="grid grid-cols-3 gap-8 mb-12 relative z-10">
                        <StatBox label="Followers" value="12.5K" />
                        <StatBox label="Engagement" value="4.8%" />
                        <StatBox label="Reach" value="1.2M" />
                    </div>

                    <div className="mb-8 relative z-10">
                        <h3 className="text-sm font-bold uppercase border-b border-black pb-2 mb-4">About Me</h3>
                        <p className="text-sm text-zinc-800 leading-relaxed">
                            Senior Motion Designer crafting immersive digital experiences for global brands.
                            Specializing in high-end 3D visuals and futuristic UI design.
                        </p>
                    </div>

                    <div className="mb-8 relative z-10">
                        <h3 className="text-sm font-bold uppercase border-b border-black pb-2 mb-4">Select Clients</h3>
                        <div className="flex gap-4">
                            <div className="px-3 py-1 bg-black text-white text-xs font-bold uppercase">Nike</div>
                            <div className="px-3 py-1 bg-black text-white text-xs font-bold uppercase">Sony</div>
                            <div className="px-3 py-1 bg-black text-white text-xs font-bold uppercase">Apple</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CheckboxRow({ label, checked }: { label: string, checked: boolean }) {
    return (
        <div className="flex items-center gap-3 p-2 hover:bg-zinc-900/30 rounded-sm cursor-pointer">
            <div className={`w-4 h-4 border ${checked ? "bg-[#a3e635] border-[#a3e635]" : "border-zinc-600"} flex items-center justify-center transition-colors`}>
                {checked && <div className="w-2 h-2 bg-black rounded-sm" />}
            </div>
            <span className={`text-xs ${checked ? "text-white" : "text-zinc-500"} font-mono uppercase`}>{label}</span>
        </div>
    )
}

function StatBox({ label, value }: { label: string, value: string }) {
    return (
        <div>
            <div className="text-2xl font-black mb-1">{value}</div>
            <div className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">{label}</div>
        </div>
    )
}
