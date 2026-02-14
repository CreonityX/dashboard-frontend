"use client";

import { ResourceSection } from "@/components/widgets/shared/resources/ResourcesComponents";
import { Youtube, Instagram, Twitter, ChevronRight } from "lucide-react";

export function BestPracticesTab() {
    return (
        <div className="max-w-5xl mx-auto pb-20 animate-in fade-in zoom-in-95 duration-500 space-y-12">

            {/* Hero */}
            <div className="text-center space-y-4 py-8">
                <h1 className="text-3xl font-bold text-white font-display uppercase tracking-tight">Creator Playbooks</h1>
                <p className="text-zinc-400 text-sm max-w-lg mx-auto">Detailed guides and strategies tailored for each major platform.</p>
            </div>

            <ResourceSection title="Platform Specific Guides">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* YouTube */}
                    <div className="p-6 border border-white/5 bg-zinc-900/20 rounded-sm hover:bg-zinc-900/40 transition-colors group">
                        <div className="w-10 h-10 rounded-full bg-red-600/10 flex items-center justify-center mb-4 text-red-500">
                            <Youtube className="w-5 h-5 fill-current" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">YouTube Strategy</h3>
                        <ul className="space-y-2 mb-6">
                            <li className="text-xs text-zinc-400 flex items-center gap-2"><ChevronRight className="w-3 h-3 text-red-500" /> SEO & Keywords</li>
                            <li className="text-xs text-zinc-400 flex items-center gap-2"><ChevronRight className="w-3 h-3 text-red-500" /> Thumbnail Design</li>
                            <li className="text-xs text-zinc-400 flex items-center gap-2"><ChevronRight className="w-3 h-3 text-red-500" /> Retention Hacks</li>
                        </ul>
                        <button className="w-full py-2 bg-red-600/10 text-red-500 border border-red-600/20 rounded-sm text-xs font-bold uppercase hover:bg-red-600/20 transition-colors">
                            View_Guide
                        </button>
                    </div>

                    {/* Instagram */}
                    <div className="p-6 border border-white/5 bg-zinc-900/20 rounded-sm hover:bg-zinc-900/40 transition-colors group">
                        <div className="w-10 h-10 rounded-full bg-pink-600/10 flex items-center justify-center mb-4 text-pink-500">
                            <Instagram className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Instagram Growth</h3>
                        <ul className="space-y-2 mb-6">
                            <li className="text-xs text-zinc-400 flex items-center gap-2"><ChevronRight className="w-3 h-3 text-pink-500" /> Reels Virality</li>
                            <li className="text-xs text-zinc-400 flex items-center gap-2"><ChevronRight className="w-3 h-3 text-pink-500" /> Story Engagement</li>
                            <li className="text-xs text-zinc-400 flex items-center gap-2"><ChevronRight className="w-3 h-3 text-pink-500" /> Hashtag Strategy</li>
                        </ul>
                        <button className="w-full py-2 bg-pink-600/10 text-pink-500 border border-pink-600/20 rounded-sm text-xs font-bold uppercase hover:bg-pink-600/20 transition-colors">
                            View_Guide
                        </button>
                    </div>

                    {/* TikTok (using Twitter icon as placeholder or generic share if TikTok icon missing in lucide version, assuming generic for now or Twitter as X) */}
                    <div className="p-6 border border-white/5 bg-zinc-900/20 rounded-sm hover:bg-zinc-900/40 transition-colors group">
                        <div className="w-10 h-10 rounded-full bg-blue-400/10 flex items-center justify-center mb-4 text-blue-400">
                            {/* Lucide doesn't have TikTok, using a generic video icon or Twitter for now as placeholder for 'Social' */}
                            <Twitter className="w-5 h-5 fill-current" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Twitter / X Mastery</h3>
                        <ul className="space-y-2 mb-6">
                            <li className="text-xs text-zinc-400 flex items-center gap-2"><ChevronRight className="w-3 h-3 text-blue-400" /> Thread Writing</li>
                            <li className="text-xs text-zinc-400 flex items-center gap-2"><ChevronRight className="w-3 h-3 text-blue-400" /> Community Building</li>
                            <li className="text-xs text-zinc-400 flex items-center gap-2"><ChevronRight className="w-3 h-3 text-blue-400" /> Monetization</li>
                        </ul>
                        <button className="w-full py-2 bg-blue-400/10 text-blue-400 border border-blue-400/20 rounded-sm text-xs font-bold uppercase hover:bg-blue-400/20 transition-colors">
                            View_Guide
                        </button>
                    </div>
                </div>
            </ResourceSection>

            <ResourceSection title="General Content Creation">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-zinc-900/30 border border-white/5 rounded-sm flex items-start gap-4">
                        <div className="text-4xl font-bold text-white/10 font-display">01</div>
                        <div>
                            <h4 className="font-bold text-white mb-1">Authenticity First</h4>
                            <p className="text-xs text-zinc-500">Building a connection with your audience is more valuable than perfect production.</p>
                        </div>
                    </div>
                    <div className="p-4 bg-zinc-900/30 border border-white/5 rounded-sm flex items-start gap-4">
                        <div className="text-4xl font-bold text-white/10 font-display">02</div>
                        <div>
                            <h4 className="font-bold text-white mb-1">Consistency Key</h4>
                            <p className="text-xs text-zinc-500">Algorithms favor regular posting schedules. Aim for quality over quantity, but be consistent.</p>
                        </div>
                    </div>
                </div>
            </ResourceSection>
        </div>
    );
}
