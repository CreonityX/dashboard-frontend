"use client";

import { useState } from "react";
import {
    X, MapPin, Globe, CheckCircle, Bookmark, BookmarkCheck, MessageSquare, Share2,
    Instagram, Youtube, Star, TrendingUp, ExternalLink, ArrowLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MOCK_CAMPAIGNS } from "@/lib/brand-data";

type Creator = {
    id: string;
    name: string;
    username: string;
    niche: string;
    verified: boolean;
    location: string;
    languages: string[];
    platforms: { name: string; followers: string; engagement: number }[];
    totalReach: string;
    rate: number;
    ratePublic: boolean;
    rating: number;
    gigsCompleted: number;
    joinedDate: string;
    availableNow: boolean;
    acceptingGigs: boolean;
    bio?: string;
    tags?: string[];
    growthRate?: number;
};

interface CreatorProfileDetailProps {
    creator: Creator;
    onClose: () => void;
    isSaved: boolean;
    onToggleSaved: () => void;
}

export function CreatorProfileDetail({ creator, onClose, isSaved, onToggleSaved }: CreatorProfileDetailProps) {
    const [inviteCampaign, setInviteCampaign] = useState("");
    const [inviteMessage, setInviteMessage] = useState("");
    const [showInvite, setShowInvite] = useState(false);

    const PlatformIcon = (p: string) => p === "YouTube" ? <Youtube className="w-4 h-4 text-zinc-500" /> : p === "Instagram" ? <Instagram className="w-4 h-4 text-zinc-500" /> : null;

    return (
        <div className="space-y-6">
            <button 
                onClick={onClose} 
                className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-xs font-mono group w-fit press-effect"
            >
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" /> 
                BACK TO DISCOVER CREATORS
            </button>
            {/* Header */}
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-sm overflow-hidden relative">
                <div className="h-24 bg-gradient-to-br from-zinc-800 to-zinc-900" />
                <div className="px-6 pb-6 -mt-10 relative">
                    <div className="flex items-end justify-between gap-4 flex-wrap">
                        <div className="flex items-end gap-4">
                            <div className="w-24 h-24 rounded-sm bg-zinc-800 border-2 border-zinc-900 flex items-center justify-center text-2xl font-bold text-[#a3e635] shrink-0">
                                {creator.name.substring(0, 2)}
                            </div>
                            <div className="pb-1">
                                <div className="flex items-center gap-2">
                                    <h1 className="text-xl font-bold text-white font-display">{creator.name}</h1>
                                    {creator.verified && <CheckCircle className="w-5 h-5 text-[#a3e635]" />}
                                </div>
                                <div className="text-xs text-zinc-500 font-mono">{creator.username}</div>
                                <div className="flex items-center gap-3 mt-1 text-[10px] font-mono text-zinc-500">
                                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {creator.location}</span>
                                    <span>{creator.gigsCompleted} gigs</span>
                                    <span className="flex items-center gap-1 text-[#a3e635]"><Star className="w-3 h-3" /> {creator.rating}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={onToggleSaved} className={cn("p-2 rounded-sm border flex items-center gap-2", isSaved ? "border-[#a3e635] text-[#a3e635]" : "border-zinc-700 text-zinc-500 hover:border-zinc-600")}>
                                {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                                <span className="text-[10px] font-mono hidden sm:inline">{isSaved ? "Saved" : "Save"}</span>
                            </button>
                            <button className="p-2 rounded-sm border border-zinc-700 text-zinc-500 hover:border-zinc-600 flex items-center gap-2">
                                <MessageSquare className="w-4 h-4" /><span className="text-[10px] font-mono hidden sm:inline">Message</span>
                            </button>
                            <button className="p-2 rounded-sm border border-zinc-700 text-zinc-500 hover:border-zinc-600 flex items-center gap-2">
                                <Share2 className="w-4 h-4" /><span className="text-[10px] font-mono hidden sm:inline">Share</span>
                            </button>
                            <button onClick={onClose} className="p-2 rounded-sm border border-zinc-700 text-zinc-500 hover:border-zinc-600 hover:text-white">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left: About, Portfolio, Rate */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-zinc-900/40 border border-zinc-800 rounded-sm p-4">
                        <h2 className="text-[10px] font-bold text-zinc-500 font-display tracking-widest uppercase mb-3">About</h2>
                        <p className="text-xs text-zinc-400 font-mono mb-3">{creator.bio}</p>
                        <div className="flex flex-wrap gap-2">
                            {creator.tags?.map(t => <span key={t} className="px-2 py-0.5 bg-zinc-800 rounded-sm text-[10px] font-mono text-zinc-400">{t}</span>)}
                        </div>
                        <div className="flex items-center gap-4 mt-3 text-[10px] font-mono text-zinc-500">
                            <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> {creator.languages.join(", ")}</span>
                            <span className={cn("px-2 py-0.5 rounded-sm", creator.availableNow ? "bg-[#a3e635]/10 text-[#a3e635]" : "bg-zinc-800 text-zinc-500")}>
                                {creator.availableNow ? "Available now" : creator.acceptingGigs ? "Accepting gigs" : "Not available"}
                            </span>
                        </div>
                    </div>

                    <div className="bg-zinc-900/40 border border-zinc-800 rounded-sm p-4">
                        <h2 className="text-[10px] font-bold text-zinc-500 font-display tracking-widest uppercase mb-3">Portfolio</h2>
                        <div className="grid grid-cols-3 gap-2">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} className="aspect-square bg-zinc-800 rounded-sm flex items-center justify-center text-[10px] font-mono text-zinc-600">
                                    Work {i}
                                </div>
                            ))}
                        </div>
                    </div>


                </div>

                {/* Right: Stats, Reviews, Invite */}
                <div className="space-y-6">
                    <div className="bg-zinc-900/40 border border-zinc-800 rounded-sm p-4">
                        <h2 className="text-[10px] font-bold text-zinc-500 font-display tracking-widest uppercase mb-3">Social Stats</h2>
                        <div className="space-y-2">
                            {creator.platforms.map(p => (
                                <div key={p.name} className="flex items-center justify-between text-[10px] font-mono">
                                    <span className="flex items-center gap-2 text-zinc-400">{PlatformIcon(p.name)} {p.name}</span>
                                    <span className="text-zinc-300">{p.followers} • {p.engagement}% eng</span>
                                </div>
                            ))}
                        </div>
                        {creator.growthRate && <div className="flex items-center gap-1 mt-2 text-[#a3e635] text-[10px] font-mono"><TrendingUp className="w-3 h-3" /> +{creator.growthRate}% growth</div>}
                    </div>

                    <div className="bg-zinc-900/40 border border-zinc-800 rounded-sm p-4">
                        <h2 className="text-[10px] font-bold text-zinc-500 font-display tracking-widest uppercase mb-3">Reviews</h2>
                        <div className="flex items-center gap-2 mb-2">
                            <Star className="w-4 h-4 text-[#a3e635] fill-[#a3e635]" />
                            <span className="text-sm font-bold text-white">{creator.rating}</span>
                            <span className="text-[10px] text-zinc-500 font-mono">({creator.gigsCompleted} gigs)</span>
                        </div>
                        <p className="text-[10px] text-zinc-500 font-mono">"Excellent to work with. Delivered on time."</p>
                    </div>

                    <div className="bg-zinc-900/40 border border-zinc-800 rounded-sm p-4">
                        <h2 className="text-[10px] font-bold text-zinc-500 font-display tracking-widest uppercase mb-3">Invite to Campaign</h2>
                        {!showInvite ? (
                            <button onClick={() => setShowInvite(true)} className="w-full py-2 bg-[#a3e635]/10 border border-[#a3e635]/30 text-[#a3e635] text-xs font-mono rounded-sm hover:bg-[#a3e635]/20">
                                Invite to Campaign
                            </button>
                        ) : (
                            <div className="space-y-3">
                                <select value={inviteCampaign} onChange={e => setInviteCampaign(e.target.value)} className="w-full px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-xs text-zinc-400 font-mono">
                                    <option value="">Select campaign</option>
                                    {MOCK_CAMPAIGNS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                                <textarea value={inviteMessage} onChange={e => setInviteMessage(e.target.value)} placeholder="Add personalized message..." rows={3} className="w-full px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-xs text-zinc-400 font-mono resize-none" />
                                <button className="w-full py-2 bg-[#a3e635] text-black text-xs font-mono font-bold rounded-sm hover:bg-[#b5f045]">
                                    Send Invitation
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
