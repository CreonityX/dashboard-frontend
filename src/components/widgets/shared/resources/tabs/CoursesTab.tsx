"use client";

import { ResourceSection, CourseCard } from "@/components/widgets/shared/resources/ResourcesComponents";
import { Search } from "lucide-react";

export function CoursesTab() {
    return (
        <div className="max-w-6xl mx-auto pb-20 animate-in fade-in zoom-in-95 duration-500 space-y-8">
            <div className="flex items-center justify-between gap-4">
                <p className="text-xs text-zinc-500 font-mono">Master the skills to grow your creator business.</p>
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                    <input
                        type="text"
                        placeholder="Search courses..."
                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-sm py-2 pl-9 pr-4 text-xs text-white placeholder:text-zinc-600 focus:border-purple-500/50 focus:outline-none transition-all"
                    />
                </div>
            </div>

            <ResourceSection title="Continue Learning">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                    <CourseCard
                        title="Advanced Video Editing with Premiere Pro"
                        category="Production"
                        duration="4h 20m"
                        difficulty="Advanced"
                        progress={65}
                    />
                    <CourseCard
                        title="Brand Deal Negotiation Masterclass"
                        category="Business"
                        duration="2h 15m"
                        difficulty="Intermediate"
                        progress={12}
                    />
                </div>
            </ResourceSection>

            <ResourceSection title="Recommended for You">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                    <CourseCard
                        title="TikTok Algorithm Decoded 2026"
                        category="Growth"
                        duration="1h 45m"
                        difficulty="Beginner"
                    />
                    <CourseCard
                        title="Lighting Setup on a Budget"
                        category="Production"
                        duration="55m"
                        difficulty="Beginner"
                    />
                    <CourseCard
                        title="Tax Strategies for Creators"
                        category="Finance"
                        duration="3h 10m"
                        difficulty="Intermediate"
                    />
                    <CourseCard
                        title="Building a Community on Discord"
                        category="Community"
                        duration="2h 30m"
                        difficulty="Intermediate"
                    />
                </div>
            </ResourceSection>
        </div>
    );
}
