import { useMemo, useState } from "react";
import {
    Bookmark,
    CheckCircle2,
    Clock,
    DollarSign,
    ExternalLink,
    Filter,
    Search,
    SlidersHorizontal,
    X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Opportunity, useProjectsMvp } from "@/components/widgets/shared/projects/ProjectsMvpContext";

type SortKey = "best_match" | "budget_high" | "budget_low" | "newest";

type FilterState = {
    industries: string[];
    platforms: string[];
    budgetRange: [number, number];
};

const INDUSTRIES = ["Beauty & Fashion", "Tech & Gaming", "Lifestyle", "Food & Drink"];
const PLATFORMS = ["Instagram", "YouTube", "TikTok", "Twitch"];

const parseMinBudget = (budget: string) => {
    const match = budget.match(/\$([\d,]+)/);
    return match ? Number(match[1].replace(/,/g, "")) : 0;
};

const toggleInArray = (value: string, list: string[]) =>
    list.includes(value) ? list.filter((item) => item !== value) : [...list, value];

export function DiscoverTab() {
    const {
        opportunities,
        isLoading,
        savedIds,
        applications,
        toggleSave,
        applyToOpportunity
    } = useProjectsMvp();

    const [searchQuery, setSearchQuery] = useState("");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedGig, setSelectedGig] = useState<Opportunity | null>(null);
    const [isApplyConfirmOpen, setIsApplyConfirmOpen] = useState(false);
    const [sortBy, setSortBy] = useState<SortKey>("best_match");

    const [filters, setFilters] = useState<FilterState>({
        industries: [],
        platforms: [],
        budgetRange: [0, 50000]
    });
    const [draftFilters, setDraftFilters] = useState<FilterState>(filters);

    const appliedIds = useMemo(() => new Set(applications.map((item) => item.opportunityId)), [applications]);

    const filteredGigs = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        const filtered = opportunities.filter((gig) => {
            if (appliedIds.has(gig.id)) return false;

            const searchMatch =
                query.length === 0 ||
                gig.brand.toLowerCase().includes(query) ||
                gig.title.toLowerCase().includes(query) ||
                gig.type.toLowerCase().includes(query) ||
                gig.tags.some((tag) => tag.toLowerCase().includes(query));

            const industryMatch =
                filters.industries.length === 0 || filters.industries.includes(gig.industry);

            const platformMatch =
                filters.platforms.length === 0 ||
                filters.platforms.some((platform) => gig.type.toLowerCase().includes(platform.toLowerCase()));

            const gigMinBudget = parseMinBudget(gig.budget);
            const budgetMatch =
                gigMinBudget >= filters.budgetRange[0] && gigMinBudget <= filters.budgetRange[1];

            return searchMatch && industryMatch && platformMatch && budgetMatch;
        });

        return [...filtered].sort((a, b) => {
            if (sortBy === "budget_high") {
                return parseMinBudget(b.budget) - parseMinBudget(a.budget);
            }
            if (sortBy === "budget_low") {
                return parseMinBudget(a.budget) - parseMinBudget(b.budget);
            }
            if (sortBy === "newest") {
                return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
            }
            return b.match - a.match;
        });
    }, [appliedIds, filters, opportunities, searchQuery, sortBy]);

    const averageMatch =
        filteredGigs.length > 0
            ? `${Math.round(filteredGigs.reduce((sum, gig) => sum + gig.match, 0) / filteredGigs.length)}%`
            : "-";

    const activeFilterCount = filters.industries.length + filters.platforms.length;

    const openFilters = () => {
        setDraftFilters(filters);
        setIsFilterOpen(true);
    };

    const applyFilters = () => {
        const normalizedRange: [number, number] =
            draftFilters.budgetRange[0] <= draftFilters.budgetRange[1]
                ? draftFilters.budgetRange
                : [draftFilters.budgetRange[1], draftFilters.budgetRange[0]];

        setFilters({
            ...draftFilters,
            budgetRange: normalizedRange
        });
        setIsFilterOpen(false);
    };

    const clearAllFilters = () => {
        const emptyFilters: FilterState = {
            industries: [],
            platforms: [],
            budgetRange: [0, 50000]
        };
        setFilters(emptyFilters);
        setDraftFilters(emptyFilters);
    };

    const resetFilters = () => {
        setDraftFilters({
            industries: [],
            platforms: [],
            budgetRange: [0, 50000]
        });
    };

    const openDetails = (gig: Opportunity) => {
        setSelectedGig(gig);
    };

    const closeDetails = () => {
        setSelectedGig(null);
        setIsApplyConfirmOpen(false);
    };

    const startApply = () => {
        if (!selectedGig) return;
        if (appliedIds.has(selectedGig.id)) return;
        setIsApplyConfirmOpen(true);
    };

    const confirmApply = () => {
        if (!selectedGig) return;
        applyToOpportunity(selectedGig.id);
        setIsApplyConfirmOpen(false);
        setSelectedGig(null);
    };

    return (
        <div className="relative h-full space-y-6">
            <div className="rounded-sm border border-zinc-800/80 bg-zinc-900/40 p-4 lg:p-5">
                <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
                    <div className="relative group w-full xl:max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(event) => setSearchQuery(event.target.value)}
                            placeholder="Search opportunities, brands, keywords..."
                            className="w-full bg-zinc-950/70 border border-zinc-800 rounded-sm pl-10 pr-4 py-2.5 text-xs text-white font-mono placeholder:text-zinc-600 focus:outline-none focus:border-[#a3e635]/60 transition-colors"
                        />
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                        <button
                            onClick={openFilters}
                            className="flex items-center gap-2 px-3 py-2 bg-zinc-950 border border-zinc-800 hover:border-[#a3e635]/50 rounded-sm text-[10px] font-mono text-zinc-300 hover:text-white transition-colors uppercase"
                        >
                            <Filter className="w-3.5 h-3.5 text-[#a3e635]" />
                            Filters
                            {activeFilterCount > 0 && (
                                <span className="px-1.5 py-0.5 rounded-[2px] bg-[#a3e635] text-black font-bold">
                                    {activeFilterCount}
                                </span>
                            )}
                        </button>

                        <label className="flex items-center gap-2 px-3 py-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-sm text-[10px] font-mono text-zinc-400 hover:text-white transition-colors uppercase">
                            <SlidersHorizontal className="w-3.5 h-3.5" />
                            <span>Sort:</span>
                            <select
                                value={sortBy}
                                onChange={(event) => setSortBy(event.target.value as SortKey)}
                                className="bg-transparent text-zinc-300 outline-none"
                            >
                                <option value="best_match" className="bg-zinc-900">Best Match</option>
                                <option value="newest" className="bg-zinc-900">Newest</option>
                                <option value="budget_high" className="bg-zinc-900">Budget: High-Low</option>
                                <option value="budget_low" className="bg-zinc-900">Budget: Low-High</option>
                            </select>
                        </label>
                    </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="rounded-sm border border-zinc-800 bg-zinc-950/60 p-3">
                        <p className="text-[10px] text-zinc-500 font-mono uppercase">Matched_for_you</p>
                        <p className="text-lg font-semibold text-white mt-1">{filteredGigs.length}</p>
                    </div>
                    <div className="rounded-sm border border-zinc-800 bg-zinc-950/60 p-3">
                        <p className="text-[10px] text-zinc-500 font-mono uppercase">Avg_match_score</p>
                        <p className="text-lg font-semibold text-[#a3e635] mt-1">{averageMatch}</p>
                    </div>
                    <div className="rounded-sm border border-zinc-800 bg-zinc-950/60 p-3">
                        <p className="text-[10px] text-zinc-500 font-mono uppercase">Saved / Applied</p>
                        <p className="text-lg font-semibold text-white mt-1">{savedIds.length} / {applications.length}</p>
                    </div>
                </div>

                {activeFilterCount > 0 && (
                    <div className="mt-3 flex items-center gap-2 flex-wrap">
                        {filters.industries.map((industry) => (
                            <span
                                key={industry}
                                className="px-2 py-1 rounded-sm border border-zinc-700 bg-zinc-950/70 text-[10px] text-zinc-300 font-mono"
                            >
                                {industry}
                            </span>
                        ))}
                        {filters.platforms.map((platform) => (
                            <span
                                key={platform}
                                className="px-2 py-1 rounded-sm border border-zinc-700 bg-zinc-950/70 text-[10px] text-zinc-300 font-mono"
                            >
                                {platform}
                            </span>
                        ))}
                        <button
                            onClick={clearAllFilters}
                            className="px-2.5 py-1 rounded-sm border border-zinc-700 text-[10px] text-zinc-300 hover:text-white hover:border-zinc-500"
                        >
                            Clear filters
                        </button>
                    </div>
                )}
            </div>

            <div>
                <div className="flex justify-between items-center mb-6">
                    <div className="text-zinc-500 font-mono text-xs uppercase">
                        MATCHED_FOR_YOU // {filteredGigs.length}_RESULTS
                    </div>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div
                                key={index}
                                className="h-[240px] rounded-sm border border-zinc-800 bg-zinc-900/35 animate-pulse"
                            />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                        {filteredGigs.map((gig) => (
                            <div
                                key={gig.id}
                                onClick={() => openDetails(gig)}
                                className="tech-border p-5 bg-zinc-900/35 hover:bg-zinc-900/70 transition-all duration-300 group relative cursor-pointer overflow-hidden rounded-sm"
                            >
                                <div className="absolute inset-0 bg-grid-zinc opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" />
                                <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-zinc-950/85 backdrop-blur-sm border border-zinc-800 px-2 py-1 rounded-sm">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#a3e635]" />
                                    <span className="text-[10px] font-mono font-bold text-[#a3e635]">{gig.match}%</span>
                                </div>

                                <div className="flex items-start gap-3 mb-4">
                                    <div
                                        className={cn(
                                            "w-10 h-10 rounded-sm flex items-center justify-center text-xs font-bold tracking-tighter border border-zinc-700/50",
                                            gig.logoBg
                                        )}
                                    >
                                        {gig.brand[0]}
                                    </div>
                                    <div className="flex-1 pr-12">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <h3 className="text-sm font-bold text-white leading-tight group-hover:text-[#a3e635] transition-colors">
                                                {gig.brand}
                                            </h3>
                                            {gig.verified && <CheckCircle2 className="w-3 h-3 text-blue-500" />}
                                        </div>
                                        <p className="text-[10px] text-zinc-500 font-mono uppercase">{gig.type}</p>
                                    </div>
                                </div>

                                <h4 className="text-sm text-zinc-300 font-medium leading-relaxed mb-4 min-h-[40px]">
                                    {gig.title}
                                </h4>

                                <div className="flex flex-wrap gap-1.5 mb-5">
                                    {gig.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-1.5 py-0.5 bg-zinc-800/50 border border-zinc-700/50 rounded-[2px] text-[9px] text-zinc-400 font-mono uppercase"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="pt-4 border-t border-zinc-800/50 flex items-center justify-between">
                                    <div>
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-white mb-0.5">
                                            <DollarSign className="w-3 h-3 text-zinc-500" />
                                            {gig.budget}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 font-mono">
                                            <Clock className="w-3 h-3" />
                                            Due {gig.deadline}
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                toggleSave(gig.id);
                                            }}
                                            className={cn(
                                                "p-2 bg-zinc-950 border rounded-sm transition-colors",
                                                savedIds.includes(gig.id)
                                                    ? "border-[#a3e635]/70 text-[#a3e635]"
                                                    : "border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-white"
                                            )}
                                        >
                                            <Bookmark className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                openDetails(gig);
                                            }}
                                            className={cn(
                                                "px-3 py-2 text-[10px] font-bold font-mono rounded-sm uppercase transition-opacity flex items-center gap-1",
                                                "bg-[#a3e635] text-black hover:opacity-90"
                                            )}
                                        >
                                            View_Details
                                            <ExternalLink className="w-3 h-3 ml-0.5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!isLoading && filteredGigs.length === 0 && (
                    <div className="mt-6 rounded-sm border border-zinc-800 bg-zinc-900/50 p-8 text-center">
                        <p className="text-sm text-zinc-300">No matching opportunities found.</p>
                        <p className="text-xs text-zinc-500 mt-1">Try broadening your filters or search terms.</p>
                    </div>
                )}
            </div>

            {isFilterOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[2px] p-4 sm:p-6 flex items-start sm:items-center justify-center"
                    onClick={() => setIsFilterOpen(false)}
                >
                    <div
                        className="w-full max-w-xl rounded-sm border border-zinc-700 bg-zinc-900/95 shadow-[0_20px_80px_rgba(0,0,0,0.5)]"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
                            <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                                <Filter className="w-4 h-4 text-[#a3e635]" />
                                Refine Discovery
                            </div>
                            <button
                                onClick={() => setIsFilterOpen(false)}
                                className="p-1.5 rounded-sm border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="p-5 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                            <div className="space-y-3">
                                <label className="text-[10px] text-zinc-500 font-mono uppercase block">Industry</label>
                                <div className="grid sm:grid-cols-2 gap-2">
                                    {INDUSTRIES.map((item) => {
                                        const isSelected = draftFilters.industries.includes(item);
                                        return (
                                            <button
                                                key={item}
                                                onClick={() =>
                                                    setDraftFilters((current) => ({
                                                        ...current,
                                                        industries: toggleInArray(item, current.industries)
                                                    }))
                                                }
                                                className={cn(
                                                    "text-left px-3 py-2 border rounded-sm text-xs transition-colors",
                                                    isSelected
                                                        ? "border-[#a3e635]/60 text-[#d9f99d] bg-[#a3e635]/10"
                                                        : "border-zinc-800 text-zinc-400 bg-zinc-950/60 hover:border-zinc-600 hover:text-zinc-200"
                                                )}
                                            >
                                                {item}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] text-zinc-500 font-mono uppercase block">Budget Range</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <input
                                        type="number"
                                        min={0}
                                        value={draftFilters.budgetRange[0]}
                                        onChange={(event) =>
                                            setDraftFilters((current) => ({
                                                ...current,
                                                budgetRange: [Number(event.target.value) || 0, current.budgetRange[1]]
                                            }))
                                        }
                                        className="bg-zinc-950/70 border border-zinc-800 rounded-sm px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#a3e635]/60"
                                        placeholder="Min"
                                    />
                                    <input
                                        type="number"
                                        min={0}
                                        value={draftFilters.budgetRange[1]}
                                        onChange={(event) =>
                                            setDraftFilters((current) => ({
                                                ...current,
                                                budgetRange: [current.budgetRange[0], Number(event.target.value) || 0]
                                            }))
                                        }
                                        className="bg-zinc-950/70 border border-zinc-800 rounded-sm px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#a3e635]/60"
                                        placeholder="Max"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] text-zinc-500 font-mono uppercase block">Platform</label>
                                <div className="flex flex-wrap gap-2">
                                    {PLATFORMS.map((platform) => {
                                        const isSelected = draftFilters.platforms.includes(platform);
                                        return (
                                            <button
                                                key={platform}
                                                onClick={() =>
                                                    setDraftFilters((current) => ({
                                                        ...current,
                                                        platforms: toggleInArray(platform, current.platforms)
                                                    }))
                                                }
                                                className={cn(
                                                    "px-3 py-1.5 text-[10px] rounded-sm border font-mono uppercase transition-colors",
                                                    isSelected
                                                        ? "border-[#a3e635]/60 text-[#d9f99d] bg-[#a3e635]/10"
                                                        : "border-zinc-800 text-zinc-400 bg-zinc-950/50 hover:text-white hover:border-zinc-600"
                                                )}
                                            >
                                                {platform}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-zinc-800 px-5 py-4 flex justify-between gap-3">
                            <button
                                onClick={resetFilters}
                                className="px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-sm text-xs text-zinc-300 hover:text-white hover:border-zinc-500 transition-colors"
                            >
                                Reset
                            </button>
                            <button
                                onClick={applyFilters}
                                className="px-4 py-2 bg-[#a3e635] text-black rounded-sm text-xs font-bold uppercase"
                            >
                                Apply Filters
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {selectedGig && (
                <div
                    className="fixed inset-0 z-50 bg-black/70 backdrop-blur-[2px] p-4 sm:p-6 flex items-start sm:items-center justify-center"
                    onClick={closeDetails}
                >
                    <div
                        className="w-full max-w-2xl rounded-sm border border-zinc-700 bg-zinc-900/95 shadow-[0_20px_80px_rgba(0,0,0,0.55)]"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
                            <div>
                                <p className="text-[10px] text-zinc-500 font-mono uppercase">Opportunity Details</p>
                                <h3 className="text-sm font-bold text-white mt-1">{selectedGig.brand} - {selectedGig.title}</h3>
                            </div>
                            <button
                                onClick={closeDetails}
                                className="p-1.5 rounded-sm border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="p-5 space-y-5">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                <div className="rounded-sm border border-zinc-800 bg-zinc-950/60 p-3">
                                    <p className="text-[10px] text-zinc-500 font-mono uppercase">Match</p>
                                    <p className="text-sm font-semibold text-[#a3e635] mt-1">{selectedGig.match}%</p>
                                </div>
                                <div className="rounded-sm border border-zinc-800 bg-zinc-950/60 p-3">
                                    <p className="text-[10px] text-zinc-500 font-mono uppercase">Budget</p>
                                    <p className="text-sm font-semibold text-white mt-1">{selectedGig.budget}</p>
                                </div>
                                <div className="rounded-sm border border-zinc-800 bg-zinc-950/60 p-3">
                                    <p className="text-[10px] text-zinc-500 font-mono uppercase">Deadline</p>
                                    <p className="text-sm font-semibold text-white mt-1">{selectedGig.deadline}</p>
                                </div>
                                <div className="rounded-sm border border-zinc-800 bg-zinc-950/60 p-3">
                                    <p className="text-[10px] text-zinc-500 font-mono uppercase">Type</p>
                                    <p className="text-sm font-semibold text-white mt-1">{selectedGig.type}</p>
                                </div>
                            </div>

                            <div className="rounded-sm border border-zinc-800 bg-zinc-950/50 p-4">
                                <p className="text-[10px] text-zinc-500 font-mono uppercase mb-2">Campaign Brief</p>
                                <p className="text-sm text-zinc-300 leading-relaxed">{selectedGig.description}</p>
                            </div>

                            <div>
                                <p className="text-[10px] text-zinc-500 font-mono uppercase mb-2">Deliverables</p>
                                <div className="space-y-2">
                                    {selectedGig.deliverables.map((item) => (
                                        <div key={item} className="text-xs text-zinc-300 border border-zinc-800 bg-zinc-950/40 rounded-sm px-3 py-2">
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {selectedGig.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2 py-1 rounded-sm border border-zinc-700 bg-zinc-950/70 text-[10px] text-zinc-300 font-mono uppercase"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="border-t border-zinc-800 px-5 py-4 flex items-center justify-between gap-3">
                            <button
                                onClick={() => toggleSave(selectedGig.id)}
                                className={cn(
                                    "px-3 py-2 border rounded-sm text-xs font-mono transition-colors",
                                    savedIds.includes(selectedGig.id)
                                        ? "border-[#a3e635]/60 text-[#a3e635] bg-[#a3e635]/10"
                                        : "border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500"
                                )}
                            >
                                {savedIds.includes(selectedGig.id) ? "Saved" : "Save"}
                            </button>

                            <button
                                onClick={startApply}
                                disabled={appliedIds.has(selectedGig.id)}
                                className={cn(
                                    "px-4 py-2 rounded-sm text-xs font-bold uppercase",
                                    appliedIds.has(selectedGig.id)
                                        ? "bg-zinc-700 text-zinc-200 cursor-default"
                                        : "bg-[#a3e635] text-black hover:opacity-90"
                                )}
                            >
                                {appliedIds.has(selectedGig.id) ? "Already Applied" : "Apply"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isApplyConfirmOpen && selectedGig && (
                <div
                    className="fixed inset-0 z-[60] bg-black/75 backdrop-blur-[2px] p-4 flex items-center justify-center"
                    onClick={() => setIsApplyConfirmOpen(false)}
                >
                    <div
                        className="w-full max-w-md rounded-sm border border-zinc-700 bg-zinc-900/95 p-5 shadow-[0_20px_80px_rgba(0,0,0,0.55)]"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <h4 className="text-sm font-bold text-white">Are you sure you want to apply?</h4>
                        <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                            You are applying to {selectedGig.brand} - {selectedGig.title}. This will move the project to your applied workflow.
                        </p>

                        <div className="mt-5 flex justify-end gap-2">
                            <button
                                onClick={() => setIsApplyConfirmOpen(false)}
                                className="px-3 py-2 border border-zinc-700 rounded-sm text-xs text-zinc-300 hover:text-white hover:border-zinc-500"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmApply}
                                className="px-4 py-2 bg-[#a3e635] text-black rounded-sm text-xs font-bold uppercase"
                            >
                                Yes, Apply
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
