"use client";

import { ResourceSection, InsightCard } from "@/components/widgets/shared/resources/ResourcesComponents";
import { Users, Calendar, ArrowRight, MessageSquare } from "lucide-react";

export function CommunityTab() {
    return (
        <div className="max-w-5xl mx-auto pb-20 animate-in fade-in zoom-in-95 duration-500 space-y-8">
            <div className="flex items-center justify-between gap-6 p-6 bg-gradient-to-r from-purple-500/20 to-transparent border border-purple-500/20 rounded-sm">
                <p className="text-sm text-zinc-300">Join 50,000+ creators sharing tips, feedback, and opportunities.</p>
                <button className="px-6 py-2.5 bg-purple-500 text-white font-bold text-sm uppercase rounded-sm hover:bg-purple-600 transition-colors shadow-lg hover:shadow-purple-500/20 flex items-center gap-2 shrink-0">
                    <Users className="w-4 h-4" /> Join_Discord
                </button>
            </div>

            <ResourceSection title="Upcoming Events">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <EventCard
                        title="Mastering Brand Deals in 2026"
                        date="Feb 25, 2026"
                        time="10:00 AM PST"
                        type="Webinar"
                    />
                    <EventCard
                        title="Creator Networking Mixer: NYC"
                        date="Mar 12, 2026"
                        time="06:00 PM EST"
                        type="In-Person"
                    />
                </div>
            </ResourceSection>

            <ResourceSection title="Featured Creators">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    <CreatorSpotlight
                        name="Alex Rivera"
                        niche="Tech Reviewer"
                        followers="1.2M"
                        image="/avatars/alex.jpg" // Placeholder path, component handles fallback
                    />
                    <CreatorSpotlight
                        name="Sarah Jenkins"
                        niche="Lifestyle & Travel"
                        followers="850K"
                        image="/avatars/sarah.jpg"
                    />
                    <CreatorSpotlight
                        name="Davide Chen"
                        niche="Dancer"
                        followers="2.4M"
                        image="/avatars/david.jpg"
                    />
                    <CreatorSpotlight
                        name="Emily Blunt"
                        niche="Cooking"
                        followers="500K"
                        image="/avatars/emily.jpg"
                    />
                </div>
            </ResourceSection>

            <ResourceSection title="Popular Discussions">
                <div className="space-y-4">
                    <DiscussionRow
                        topic="Has anyone tried the new Instagram Reels bonus program?"
                        author="tech_guy_99"
                        replies={45}
                        views={1200}
                    />
                    <DiscussionRow
                        topic="Best camera for vlogging under $800?"
                        author="travel_with_me"
                        replies={32}
                        views={890}
                    />
                    <DiscussionRow
                        topic="Feedback on my media kit design needed!"
                        author="design_pro"
                        replies={18}
                        views={450}
                    />
                </div>
                <button className="w-full py-3 text-xs font-bold text-purple-400 uppercase hover:text-purple-300 transition-colors border border-purple-500/20 hover:border-purple-500/40 rounded-sm mt-4">
                    View_All_Topics
                </button>
            </ResourceSection>
        </div>
    );
}

function EventCard({ title, date, time, type }: { title: string, date: string, time: string, type: string }) {
    return (
        <div className="p-6 border border-white/5 bg-zinc-900/20 rounded-sm flex items-center justify-between group hover:bg-zinc-900/40 transition-colors cursor-pointer">
            <div>
                <div className="text-[10px] bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded-sm uppercase w-fit mb-2 border border-purple-500/20">{type}</div>
                <h4 className="text-lg font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">{title}</h4>
                <div className="flex items-center gap-4 text-xs text-zinc-500 font-mono">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {date}</span>
                    <span>{time}</span>
                </div>
            </div>
            <button className="p-2 border border-zinc-700 rounded-full hover:bg-white hover:text-black transition-colors">
                <ArrowRight className="w-4 h-4" />
            </button>
        </div>
    );
}

function CreatorSpotlight({ name, niche, followers, image }: { name: string, niche: string, followers: string, image?: string }) {
    return (
        <div className="p-4 border border-white/5 bg-zinc-900/10 rounded-sm text-center hover:border-purple-500/30 transition-all group">
            <div className="w-20 h-20 mx-auto rounded-full bg-zinc-800 mb-3 overflow-hidden border-2 border-transparent group-hover:border-purple-500 transition-colors">
                {/* Image placeholder */}
                <div className="w-full h-full bg-gradient-to-br from-purple-900 to-zinc-900" />
            </div>
            <h4 className="font-bold text-white text-sm">{name}</h4>
            <div className="text-[10px] text-purple-400 uppercase font-mono mb-1">{niche}</div>
            <div className="text-xs text-zinc-500">{followers} Followers</div>
        </div>
    );
}

function DiscussionRow({ topic, author, replies, views }: { topic: string, author: string, replies: number, views: number }) {
    return (
        <div className="p-4 border border-zinc-800 bg-zinc-900/20 rounded-sm flex items-center justify-between hover:bg-zinc-900/50 transition-colors cursor-pointer group">
            <div>
                <h4 className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors mb-1">{topic}</h4>
                <div className="text-[10px] text-zinc-500 font-mono">Posted by <span className="text-zinc-300">@{author}</span></div>
            </div>
            <div className="flex items-center gap-6 text-xs text-zinc-500 font-mono">
                <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> {replies}</span>
                <span className="hidden sm:inline-block">{views} Views</span>
            </div>
        </div>
    );
}
