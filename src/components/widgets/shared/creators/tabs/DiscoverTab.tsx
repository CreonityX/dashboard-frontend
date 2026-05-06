"use client";

import { useState, useMemo } from "react";
import {
    Search, MapPin, Grid3X3, List, Bookmark, BookmarkCheck,
    Instagram, Youtube, CheckCircle, ChevronDown, SlidersHorizontal, X
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
    DISCOVER_CREATORS,
    NICHE_CATEGORIES,
    CREATOR_PLATFORMS,
    SAVED_CREATORS
} from "@/lib/brand-data";
import { CreatorProfileDetail } from "../CreatorProfileDetail";
import Link from "next/link";

interface DiscoverTabProps {
    creatorId: string | null;
    onCloseProfile: () => void;
}

export function DiscoverTab({ creatorId, onCloseProfile }: DiscoverTabProps) {
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState<"relevance" | "followers" | "engagement" | "newest" | "rating">("relevance");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [showFilters, setShowFilters] = useState(false);
    const [savedIds, setSavedIds] = useState<Set<string>>(new Set(SAVED_CREATORS));

    // Filters
    const [location, setLocation] = useState("");
    const [platforms, setPlatforms] = useState<string[]>([]);
    const [engagementMin, setEngagementMin] = useState(0);
    const [budgetMin, setBudgetMin] = useState(0);
    const [budgetMax, setBudgetMax] = useState(10000);
    const [verifiedOnly, setVerifiedOnly] = useState(false);
    const [availableNow, setAvailableNow] = useState(false);
    const [niches, setNiches] = useState<string[]>([]);
    const [ratingMin, setRatingMin] = useState(0);
    const [gigsMin, setGigsMin] = useState(0);

    const toggleNiche = (n: string) => setNiches(prev => prev.includes(n) ? prev.filter(x => x !== n) : [...prev, n]);
    const togglePlatformFilter = (p: string) => setPlatforms(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);

    const activeFilterCount = [
        location, ...platforms, ...niches,
        engagementMin > 0 ? "eng" : "",
        budgetMin > 0 ? "bmin" : "",
        budgetMax < 10000 ? "bmax" : "",
        verifiedOnly ? "v" : "",
        availableNow ? "a" : "",
        ratingMin > 0 ? "r" : "",
        gigsMin > 0 ? "g" : "",
    ].filter(Boolean).length;

    const clearFilters = () => {
        setLocation(""); setPlatforms([]); setNiches([]);
        setEngagementMin(0); setBudgetMin(0); setBudgetMax(10000);
        setVerifiedOnly(false); setAvailableNow(false);
        setRatingMin(0); setGigsMin(0);
    };

    const filtered = useMemo(() => {
        let list = [...DISCOVER_CREATORS];
        const q = search.toLowerCase();
        if (q) {
            list = list.filter(c =>
                c.name.toLowerCase().includes(q) ||
                c.username.toLowerCase().includes(q) ||
                c.bio?.toLowerCase().includes(q) ||
                c.tags?.some(t => t.toLowerCase().includes(q))
            );
        }
        if (location) list = list.filter(c => c.location.toLowerCase().includes(location.toLowerCase()));
        if (platforms.length) list = list.filter(c => c.platforms.some(p => platforms.includes(p.name)));
        if (engagementMin > 0) list = list.filter(c => c.platforms.some(p => p.engagement >= engagementMin) || (c.platforms[0]?.engagement ?? 0) >= engagementMin);
        if (budgetMin > 0 || budgetMax < 10000) list = list.filter(c => c.rate >= budgetMin && c.rate <= budgetMax);
        if (verifiedOnly) list = list.filter(c => c.verified);
        if (availableNow) list = list.filter(c => c.availableNow);
        if (niches.length) list = list.filter(c => niches.some(n => c.niche.includes(n) || c.tags?.includes(n)));
        if (ratingMin > 0) list = list.filter(c => c.rating >= ratingMin);
        if (gigsMin > 0) list = list.filter(c => c.gigsCompleted >= gigsMin);

        if (sortBy === "followers") list.sort((a, b) => parseInt((b.platforms[0]?.followers || "0").replace(/[^0-9]/g, "")) - parseInt((a.platforms[0]?.followers || "0").replace(/[^0-9]/g, "")));
        else if (sortBy === "engagement") list.sort((a, b) => (b.platforms[0]?.engagement ?? 0) - (a.platforms[0]?.engagement ?? 0));
        else if (sortBy === "newest") list.sort((a, b) => new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime());
        else if (sortBy === "rating") list.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));

        return list;
    }, [search, location, platforms, engagementMin, budgetMin, budgetMax, verifiedOnly, availableNow, niches, ratingMin, gigsMin, sortBy]);

    const selectedCreator = creatorId ? DISCOVER_CREATORS.find(c => c.id === creatorId) : null;
    const toggleSaved = (id: string) => setSavedIds(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

    return (
        <div className="space-y-4">
            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center gap-3">
                {/* Search */}
                <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
                    <input
                        type="text"
                        placeholder="Search by name, bio, tags..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-xs text-white font-mono focus:outline-none focus:border-[#a3e635]"
                    />
                </div>

                {/* Platform quick filter chips */}
                <div className="flex gap-1.5">
                    {CREATOR_PLATFORMS.map(p => (
                        <button
                            key={p}
                            onClick={() => togglePlatformFilter(p)}
                            className={cn(
                                "px-2.5 py-1.5 rounded-sm border text-[10px] font-mono transition-colors",
                                platforms.includes(p)
                                    ? "border-[#a3e635]/50 text-[#a3e635] bg-[#a3e635]/10"
                                    : "border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-400"
                            )}
                        >
                            {p}
                        </button>
                    ))}
                </div>

                {/* Sort */}
                <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value as typeof sortBy)}
                    className="px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-xs text-zinc-400 font-mono focus:outline-none focus:border-[#a3e635]"
                >
                    <option value="relevance">Relevance</option>
                    <option value="followers">Followers</option>
                    <option value="engagement">Engagement</option>
                    <option value="newest">Newest</option>
                    <option value="rating">Rating</option>
                </select>

                {/* More filters */}
                <button
                    onClick={() => setShowFilters(f => !f)}
                    className={cn(
                        "flex items-center gap-2 px-3 py-2 border rounded-sm text-xs font-mono transition-colors",
                        showFilters || activeFilterCount > 0
                            ? "border-[#a3e635]/40 text-[#a3e635] bg-[#a3e635]/5"
                            : "border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-400"
                    )}
                >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    More Filters
                    {activeFilterCount > 0 && (
                        <span className="bg-[#a3e635] text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                            {activeFilterCount}
                        </span>
                    )}
                    <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", showFilters && "rotate-180")} />
                </button>

                {/* View mode */}
                <div className="flex border border-zinc-800 rounded-sm overflow-hidden">
                    <button onClick={() => setViewMode("grid")} className={cn("p-2", viewMode === "grid" ? "bg-[#a3e635]/10 text-[#a3e635]" : "text-zinc-500 hover:text-zinc-300")}>
                        <Grid3X3 className="w-4 h-4" />
                    </button>
                    <button onClick={() => setViewMode("list")} className={cn("p-2", viewMode === "list" ? "bg-[#a3e635]/10 text-[#a3e635]" : "text-zinc-500 hover:text-zinc-300")}>
                        <List className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Expanded filter panel */}
            {showFilters && (
                <div className="p-4 bg-zinc-900/40 border border-zinc-800 rounded-sm space-y-4">
                    <div className="flex flex-wrap gap-4 items-start">
                        {/* Location */}
                        <div className="space-y-1 text-[10px] font-mono">
                            <label className="text-zinc-500 uppercase">Location</label>
                            <input
                                type="text"
                                placeholder="Country, city..."
                                value={location}
                                onChange={e => setLocation(e.target.value)}
                                className="block w-40 px-2 py-1.5 bg-zinc-950/50 border border-zinc-800 rounded-sm text-zinc-400 focus:outline-none focus:border-[#a3e635]"
                            />
                        </div>

                        {/* Engagement */}
                        <div className="space-y-1 text-[10px] font-mono">
                            <label className="text-zinc-500 uppercase">Min Engagement %</label>
                            <input
                                type="number"
                                min={0}
                                max={20}
                                value={engagementMin}
                                onChange={e => setEngagementMin(Number(e.target.value))}
                                className="block w-24 px-2 py-1.5 bg-zinc-950/50 border border-zinc-800 rounded-sm text-zinc-400 focus:outline-none focus:border-[#a3e635]"
                            />
                        </div>

                        {/* Budget */}
                        <div className="space-y-1 text-[10px] font-mono">
                            <label className="text-zinc-500 uppercase">Budget ($/post)</label>
                            <div className="flex gap-2">
                                <input type="number" min={0} placeholder="Min" value={budgetMin || ""} onChange={e => setBudgetMin(Number(e.target.value))} className="w-20 px-2 py-1.5 bg-zinc-950/50 border border-zinc-800 rounded-sm text-zinc-400 focus:outline-none focus:border-[#a3e635]" />
                                <input type="number" placeholder="Max" value={budgetMax >= 10000 ? "" : budgetMax} onChange={e => setBudgetMax(e.target.value ? Number(e.target.value) : 10000)} className="w-20 px-2 py-1.5 bg-zinc-950/50 border border-zinc-800 rounded-sm text-zinc-400 focus:outline-none focus:border-[#a3e635]" />
                            </div>
                        </div>

                        {/* Rating */}
                        <div className="space-y-1 text-[10px] font-mono">
                            <label className="text-zinc-500 uppercase">Min Rating</label>
                            <input type="number" min={0} max={5} step={0.5} value={ratingMin || ""} onChange={e => setRatingMin(Number(e.target.value))} className="block w-20 px-2 py-1.5 bg-zinc-950/50 border border-zinc-800 rounded-sm text-zinc-400 focus:outline-none focus:border-[#a3e635]" />
                        </div>

                        {/* Min gigs */}
                        <div className="space-y-1 text-[10px] font-mono">
                            <label className="text-zinc-500 uppercase">Min Gigs Done</label>
                            <input type="number" min={0} value={gigsMin || ""} onChange={e => setGigsMin(Number(e.target.value))} className="block w-20 px-2 py-1.5 bg-zinc-950/50 border border-zinc-800 rounded-sm text-zinc-400 focus:outline-none focus:border-[#a3e635]" />
                        </div>

                        {/* Checkboxes */}
                        <div className="space-y-2 text-[10px] font-mono pt-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" checked={verifiedOnly} onChange={e => setVerifiedOnly(e.target.checked)} className="rounded border-zinc-700" />
                                <span className="text-zinc-400">Verified only</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" checked={availableNow} onChange={e => setAvailableNow(e.target.checked)} className="rounded border-zinc-700" />
                                <span className="text-zinc-400">Available now</span>
                            </label>
                        </div>
                    </div>

                    {/* Niche chips */}
                    <div className="space-y-1 text-[10px] font-mono">
                        <label className="text-zinc-500 uppercase">Niche / Category</label>
                        <div className="flex flex-wrap gap-1.5">
                            {NICHE_CATEGORIES.slice(0, 12).map(n => (
                                <button
                                    key={n}
                                    onClick={() => toggleNiche(n)}
                                    className={cn(
                                        "px-2 py-1 rounded-sm border text-[9px] transition-colors",
                                        niches.includes(n)
                                            ? "border-[#a3e635]/50 text-[#a3e635] bg-[#a3e635]/10"
                                            : "border-zinc-700 text-zinc-500 hover:border-zinc-600"
                                    )}
                                >
                                    {n}
                                </button>
                            ))}
                        </div>
                    </div>

                    {activeFilterCount > 0 && (
                        <button
                            onClick={clearFilters}
                            className="flex items-center gap-1.5 px-3 py-1.5 border border-zinc-700 rounded-sm text-[10px] font-mono text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors"
                        >
                            <X className="w-3 h-3" /> Clear all filters
                        </button>
                    )}
                </div>
            )}

            {/* Active filter chips */}
            {activeFilterCount > 0 && !showFilters && (
                <div className="flex flex-wrap gap-2">
                    {location && <FilterChip label={`Location: ${location}`} onRemove={() => setLocation("")} />}
                    {platforms.map(p => <FilterChip key={p} label={p} onRemove={() => togglePlatformFilter(p)} />)}
                    {niches.map(n => <FilterChip key={n} label={n} onRemove={() => toggleNiche(n)} />)}
                    {engagementMin > 0 && <FilterChip label={`Eng ≥ ${engagementMin}%`} onRemove={() => setEngagementMin(0)} />}
                    {budgetMin > 0 && <FilterChip label={`Budget ≥ $${budgetMin}`} onRemove={() => setBudgetMin(0)} />}
                    {budgetMax < 10000 && <FilterChip label={`Budget ≤ $${budgetMax}`} onRemove={() => setBudgetMax(10000)} />}
                    {verifiedOnly && <FilterChip label="Verified only" onRemove={() => setVerifiedOnly(false)} />}
                    {availableNow && <FilterChip label="Available now" onRemove={() => setAvailableNow(false)} />}
                    {ratingMin > 0 && <FilterChip label={`Rating ≥ ${ratingMin}`} onRemove={() => setRatingMin(0)} />}
                    {gigsMin > 0 && <FilterChip label={`Gigs ≥ ${gigsMin}`} onRemove={() => setGigsMin(0)} />}
                    <button onClick={clearFilters} className="text-[9px] font-mono text-zinc-600 hover:text-zinc-400 transition-colors underline">Clear all</button>
                </div>
            )}

            {/* Results */}
            {selectedCreator ? (
                <CreatorProfileDetail creator={selectedCreator} onClose={onCloseProfile} isSaved={savedIds.has(selectedCreator.id)} onToggleSaved={() => toggleSaved(selectedCreator.id)} />
            ) : (
                <>
                    <div className="text-[10px] text-zinc-500 font-mono">{filtered.length} creator{filtered.length !== 1 ? "s" : ""}</div>
                    <div className={cn(viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4" : "space-y-3")}>
                        {filtered.map(creator => (
                            <CreatorCard key={creator.id} creator={creator} viewMode={viewMode} isSaved={savedIds.has(creator.id)} onToggleSaved={() => toggleSaved(creator.id)} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
    return (
        <span className="flex items-center gap-1.5 px-2 py-1 bg-[#a3e635]/10 border border-[#a3e635]/20 rounded-sm text-[9px] font-mono text-[#a3e635]">
            {label}
            <button onClick={onRemove} className="hover:text-white transition-colors">
                <X className="w-3 h-3" />
            </button>
        </span>
    );
}

function CreatorCard({ creator, viewMode, isSaved, onToggleSaved }: {
    creator: (typeof DISCOVER_CREATORS)[0];
    viewMode: "grid" | "list";
    isSaved: boolean;
    onToggleSaved: () => void;
}) {
    const PlatformIcon = (p: string) => p === "YouTube" ? <Youtube className="w-3.5 h-3.5 text-zinc-500" /> : p === "Instagram" ? <Instagram className="w-3.5 h-3.5 text-zinc-500" /> : null;

    if (viewMode === "list") {
        return (
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-sm p-4 flex items-center gap-4 hover:border-zinc-700 transition-colors group">
                <div className="w-14 h-14 rounded-sm bg-zinc-800 flex items-center justify-center text-sm font-bold text-[#a3e635] shrink-0">{creator.name.substring(0, 2)}</div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{creator.name}</span>
                        {creator.verified && <CheckCircle className="w-3.5 h-3.5 text-[#a3e635]" />}
                    </div>
                    <div className="text-[10px] text-zinc-500 font-mono">{creator.niche}</div>
                    <div className="flex items-center gap-3 mt-1 text-[10px] font-mono text-zinc-500">
                        {creator.platforms.map(p => <span key={p.name} className="flex items-center gap-1">{PlatformIcon(p.name)}{p.followers} • {p.engagement}%</span>)}
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {creator.location}</span>
                        {creator.ratePublic && <span className="text-[#a3e635]">From ${creator.rate}</span>}
                    </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                    <button onClick={e => { e.preventDefault(); onToggleSaved(); }} className={cn("p-2 rounded-sm border transition-colors", isSaved ? "border-[#a3e635] text-[#a3e635]" : "border-zinc-700 text-zinc-500 hover:border-zinc-600")}>
                        {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                    </button>
                    <Link href={`/creators?tab=discover&creator=${creator.id}`} className="px-3 py-2 bg-zinc-800 border border-zinc-700 text-[10px] font-mono text-zinc-400 rounded-sm hover:border-[#a3e635]/50 hover:text-[#a3e635] transition-colors">View Profile</Link>
                    <Link href={`/creators?tab=discover&creator=${creator.id}&invite=1`} className="px-3 py-2 bg-[#a3e635]/10 border border-[#a3e635]/30 text-[10px] font-mono text-[#a3e635] rounded-sm hover:bg-[#a3e635]/20 transition-colors">Invite</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-sm overflow-hidden hover:border-zinc-700 transition-colors group">
            <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-sm bg-zinc-800 flex items-center justify-center text-sm font-bold text-[#a3e635] shrink-0">{creator.name.substring(0, 2)}</div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-white">{creator.name}</span>
                                {creator.verified && <CheckCircle className="w-3.5 h-3.5 text-[#a3e635]" />}
                            </div>
                            <div className="text-[10px] text-zinc-500 font-mono">{creator.username}</div>
                            <div className="text-[9px] font-mono px-2 py-0.5 mt-1 rounded-sm bg-zinc-800 text-zinc-400 inline-block">{creator.niche}</div>
                        </div>
                    </div>
                    <button onClick={e => { e.preventDefault(); onToggleSaved(); }} className={cn("p-2 rounded-sm border shrink-0 transition-colors", isSaved ? "border-[#a3e635] text-[#a3e635]" : "border-zinc-700 text-zinc-500 hover:border-zinc-600 opacity-0 group-hover:opacity-100")}>
                        {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                    </button>
                </div>
                <div className="flex gap-2 mb-2">
                    {creator.platforms.map(p => (
                        <span key={p.name} className="flex items-center gap-1 text-[10px] font-mono text-zinc-500">{PlatformIcon(p.name)}{p.followers} • {p.engagement}%</span>
                    ))}
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 mb-3">
                    <MapPin className="w-3 h-3" /> {creator.location}
                    {creator.ratePublic && <span className="text-[#a3e635] ml-auto">From ${creator.rate}</span>}
                </div>
                <div className="flex gap-2">
                    <Link href={`/creators?tab=discover&creator=${creator.id}`} className="flex-1 px-3 py-2 bg-zinc-800 border border-zinc-700 text-[10px] font-mono text-zinc-400 rounded-sm hover:border-[#a3e635]/50 hover:text-[#a3e635] text-center transition-colors">View Profile</Link>
                    <Link href={`/creators?tab=discover&creator=${creator.id}&invite=1`} className="flex-1 px-3 py-2 bg-[#a3e635]/10 border border-[#a3e635]/30 text-[10px] font-mono text-[#a3e635] rounded-sm hover:bg-[#a3e635]/20 text-center transition-colors">Invite</Link>
                </div>
            </div>
        </div>
    );
}
