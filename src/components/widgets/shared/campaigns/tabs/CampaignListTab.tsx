"use client";

import { useState, useMemo } from "react";
import { Search, Plus, Grid3X3, List, Pencil, Pause, Play, Eye, Copy, SlidersHorizontal, X, Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { CAMPAIGNS_LIST } from "@/lib/brand-data";
import Link from "next/link";
import { CampaignBuilderWizard } from "../CampaignBuilderWizard";
import { toast } from "sonner";
import { ConfirmModal } from "../../ConfirmModal";

const STATUS_OPTIONS = ['draft', 'active', 'paused', 'completed', 'archived'];
const OBJECTIVE_OPTIONS = ['awareness', 'conversions', 'engagement', 'product_launch'];
const PLATFORMS = ['YouTube', 'Instagram', 'TikTok'];

export function CampaignListTab() {
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState<"newest" | "oldest" | "budget" | "performance">("newest");
    const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
    const [showFilters, setShowFilters] = useState(false);
    const [showWizard, setShowWizard] = useState(false);

    const [statusFilter, setStatusFilter] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [budgetMin, setBudgetMin] = useState("");
    const [budgetMax, setBudgetMax] = useState("");
    const [platformFilter, setPlatformFilter] = useState("");
    const [objectiveFilter, setObjectiveFilter] = useState("");

    const activeFilterCount = [statusFilter, platformFilter, objectiveFilter, dateFrom, dateTo, budgetMin, budgetMax].filter(Boolean).length;

    const clearFilters = () => {
        setStatusFilter(""); setPlatformFilter(""); setObjectiveFilter("");
        setDateFrom(""); setDateTo(""); setBudgetMin(""); setBudgetMax("");
    };

    const filtered = useMemo(() => {
        let list = [...CAMPAIGNS_LIST];
        if (search) list = list.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
        if (statusFilter) list = list.filter(c => c.status === statusFilter);
        if (platformFilter) list = list.filter(c => c.platform === platformFilter);
        if (objectiveFilter) list = list.filter(c => c.objective === objectiveFilter);
        if (dateFrom) list = list.filter(c => new Date(c.startDate) >= new Date(dateFrom));
        if (dateTo) list = list.filter(c => new Date(c.endDate) <= new Date(dateTo));
        if (budgetMin && !isNaN(parseInt(budgetMin))) list = list.filter(c => c.budget >= parseInt(budgetMin));
        if (budgetMax && !isNaN(parseInt(budgetMax))) list = list.filter(c => c.budget <= parseInt(budgetMax));

        if (sortBy === "newest") list.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
        else if (sortBy === "oldest") list.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
        else if (sortBy === "budget") list.sort((a, b) => b.budget - a.budget);
        else if (sortBy === "performance") list.sort((a, b) => parseInt((b.impressions || "0").replace(/\D/g, "")) - parseInt((a.impressions || "0").replace(/\D/g, "")));
        return list;
    }, [search, statusFilter, platformFilter, objectiveFilter, dateFrom, dateTo, budgetMin, budgetMax, sortBy]);

    return (
        <div className="space-y-4">
            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center gap-3">
                {/* Search */}
                <div className="relative flex-1 min-w-[180px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
                    <input
                        type="text"
                        placeholder="Search campaigns..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-xs text-white font-mono focus:outline-none focus:border-[#a3e635]"
                    />
                </div>

                {/* Quick filters inline */}
                <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                    className="px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-xs text-zinc-400 font-mono focus:outline-none focus:border-[#a3e635]"
                >
                    <option value="">All Status</option>
                    {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>

                <select
                    value={platformFilter}
                    onChange={e => setPlatformFilter(e.target.value)}
                    className="px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-xs text-zinc-400 font-mono focus:outline-none focus:border-[#a3e635]"
                >
                    <option value="">All Platforms</option>
                    {PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>

                <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value as typeof sortBy)}
                    className="px-3 py-2 bg-zinc-950/50 border border-zinc-800 rounded-sm text-xs text-zinc-400 font-mono focus:outline-none focus:border-[#a3e635]"
                >
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="budget">Highest budget</option>
                    <option value="performance">Performance</option>
                </select>

                {/* More filters toggle */}
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
                    <button onClick={() => setViewMode("table")} className={cn("p-2", viewMode === "table" ? "bg-[#a3e635]/10 text-[#a3e635]" : "text-zinc-500 hover:text-zinc-300")}>
                        <List className="w-4 h-4" />
                    </button>
                </div>

                <button
                    onClick={() => setShowWizard(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#a3e635] text-black text-xs font-mono font-bold rounded-sm hover:bg-[#b5f045] transition-colors"
                >
                    <Plus className="w-4 h-4" /> Create Campaign
                </button>
            </div>

            {/* Expanded filters row */}
            {showFilters && (
                <div className="p-4 bg-zinc-900/40 border border-zinc-800 rounded-sm">
                    <div className="flex flex-wrap gap-4 items-end">
                        <div className="space-y-1 text-[10px] font-mono">
                            <label className="text-zinc-500 uppercase">Objective</label>
                            <select
                                value={objectiveFilter}
                                onChange={e => setObjectiveFilter(e.target.value)}
                                className="block px-2 py-1.5 bg-zinc-950/50 border border-zinc-800 rounded-sm text-zinc-400 focus:outline-none focus:border-[#a3e635]"
                            >
                                <option value="">All</option>
                                {OBJECTIVE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                        </div>
                        <div className="space-y-1 text-[10px] font-mono">
                            <label className="text-zinc-500 uppercase">Date from</label>
                            <input
                                type="date"
                                value={dateFrom}
                                onChange={e => setDateFrom(e.target.value)}
                                className="block px-2 py-1.5 bg-zinc-950/50 border border-zinc-800 rounded-sm text-zinc-400 focus:outline-none focus:border-[#a3e635]"
                            />
                        </div>
                        <div className="space-y-1 text-[10px] font-mono">
                            <label className="text-zinc-500 uppercase">Date to</label>
                            <input
                                type="date"
                                value={dateTo}
                                onChange={e => setDateTo(e.target.value)}
                                className="block px-2 py-1.5 bg-zinc-950/50 border border-zinc-800 rounded-sm text-zinc-400 focus:outline-none focus:border-[#a3e635]"
                            />
                        </div>
                        <div className="space-y-1 text-[10px] font-mono">
                            <label className="text-zinc-500 uppercase">Budget min</label>
                            <input
                                type="number"
                                placeholder="$0"
                                value={budgetMin}
                                onChange={e => setBudgetMin(e.target.value)}
                                className="block w-24 px-2 py-1.5 bg-zinc-950/50 border border-zinc-800 rounded-sm text-zinc-400 focus:outline-none focus:border-[#a3e635]"
                            />
                        </div>
                        <div className="space-y-1 text-[10px] font-mono">
                            <label className="text-zinc-500 uppercase">Budget max</label>
                            <input
                                type="number"
                                placeholder="∞"
                                value={budgetMax}
                                onChange={e => setBudgetMax(e.target.value)}
                                className="block w-24 px-2 py-1.5 bg-zinc-950/50 border border-zinc-800 rounded-sm text-zinc-400 focus:outline-none focus:border-[#a3e635]"
                            />
                        </div>
                        {activeFilterCount > 0 && (
                            <button
                                onClick={clearFilters}
                                className="flex items-center gap-1.5 px-3 py-1.5 border border-zinc-700 rounded-sm text-[10px] font-mono text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors"
                            >
                                <X className="w-3 h-3" /> Clear all
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Active filter chips */}
            {activeFilterCount > 0 && (
                <div className="flex flex-wrap gap-2">
                    {statusFilter && <FilterChip label={`Status: ${statusFilter}`} onRemove={() => setStatusFilter("")} />}
                    {platformFilter && <FilterChip label={`Platform: ${platformFilter}`} onRemove={() => setPlatformFilter("")} />}
                    {objectiveFilter && <FilterChip label={`Objective: ${objectiveFilter}`} onRemove={() => setObjectiveFilter("")} />}
                    {dateFrom && <FilterChip label={`From: ${dateFrom}`} onRemove={() => setDateFrom("")} />}
                    {dateTo && <FilterChip label={`To: ${dateTo}`} onRemove={() => setDateTo("")} />}
                    {budgetMin && <FilterChip label={`Min: $${budgetMin}`} onRemove={() => setBudgetMin("")} />}
                    {budgetMax && <FilterChip label={`Max: $${budgetMax}`} onRemove={() => setBudgetMax("")} />}
                </div>
            )}

            <div className="text-[10px] text-zinc-500 font-mono">{filtered.length} campaign{filtered.length !== 1 ? "s" : ""}</div>

            {viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filtered.map(campaign => (
                        <CampaignCard key={campaign.id} campaign={campaign} />
                    ))}
                </div>
            ) : (
                <div className="bg-zinc-900/40 border border-zinc-800 rounded-sm overflow-hidden">
                    <div className="grid grid-cols-12 px-4 py-3 bg-zinc-950/30 text-[9px] font-mono text-zinc-500 uppercase">
                        <div className="col-span-4">Campaign</div>
                        <div className="col-span-2">Status</div>
                        <div className="col-span-2">Dates</div>
                        <div className="col-span-2">Budget</div>
                        <div className="col-span-2 text-right">Actions</div>
                    </div>
                    <div className="divide-y divide-zinc-800">
                        {filtered.map(campaign => (
                            <CampaignRow key={campaign.id} campaign={campaign} />
                        ))}
                    </div>
                </div>
            )}

            {showWizard && <CampaignBuilderWizard onClose={() => setShowWizard(false)} onComplete={() => setShowWizard(false)} />}
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

function CampaignCard({ campaign }: { campaign: (typeof CAMPAIGNS_LIST)[0] }) {
    const pctSpent = campaign.budget > 0 ? Math.round((campaign.spent / campaign.budget) * 100) : 0;
    const [showEditModal, setShowEditModal] = useState(false);
    const [editName, setEditName] = useState(campaign.name);
    const [showPauseConfirm, setShowPauseConfirm] = useState(false);
    const [showDuplicateModal, setShowDuplicateModal] = useState(false);
    const [dupName, setDupName] = useState(`${campaign.name} (copy)`);
    const [paused, setPaused] = useState(false);

    const handleEdit = () => {
        if (!editName.trim()) return;
        toast.success(`Campaign updated`, { description: `Renamed to "${editName}"` });
        setShowEditModal(false);
    };

    const handlePause = () => {
        setPaused(p => !p);
        toast.success(paused ? "Campaign resumed" : "Campaign paused", { description: campaign.name });
        setShowPauseConfirm(false);
    };

    const handleDuplicate = () => {
        if (!dupName.trim()) return;
        toast.success(`Campaign duplicated`, { description: `"${dupName}" created as a draft.` });
        setShowDuplicateModal(false);
    };

    return (
        <>
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-sm overflow-hidden hover:border-zinc-700 transition-colors group">
                <div className="h-20 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
                    <span className="text-3xl font-bold text-zinc-700">{campaign.name.charAt(0)}</span>
                </div>
                <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-bold text-white truncate">{campaign.name}</h3>
                        <span className={cn(
                            "text-[9px] font-mono px-2 py-0.5 rounded-sm uppercase shrink-0 ml-2",
                            (!paused && campaign.status === 'active') && "bg-[#a3e635]/10 text-[#a3e635]",
                            (paused || campaign.status === 'paused') && "bg-amber-500/10 text-amber-400",
                            campaign.status === 'draft' && "bg-zinc-700 text-zinc-400",
                            campaign.status === 'completed' && "bg-blue-500/10 text-blue-400",
                            campaign.status === 'archived' && "bg-zinc-700 text-zinc-500"
                        )}>{paused ? "paused" : campaign.status}</span>
                    </div>
                    <div className="text-[10px] font-mono text-zinc-500 mb-2">{campaign.startDate} — {campaign.endDate}</div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 mb-2">
                        <span>${campaign.spent.toLocaleString()} / ${campaign.budget.toLocaleString()}</span>
                        <span>{campaign.creatorsCount} creators</span>
                    </div>
                    <div className="h-1.5 bg-zinc-800 rounded-[1px] overflow-hidden mb-3">
                        <div className="h-full bg-[#a3e635] rounded-[1px]" style={{ width: `${Math.min(pctSpent, 100)}%` }} />
                    </div>
                    <div className="flex gap-2 text-[10px] font-mono text-zinc-500 mb-3">
                        <span>{campaign.impressions} impr</span>
                        <span>{campaign.reach} reach</span>
                        <span>{campaign.engagement} eng</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Link href={`/campaigns/${campaign.id}`} className="px-2 py-1 bg-zinc-800 border border-zinc-700 text-[10px] font-mono text-zinc-400 rounded-sm hover:border-[#a3e635]/50 hover:text-[#a3e635] flex items-center gap-1 transition-colors">
                            <Eye className="w-3 h-3" /> View
                        </Link>
                        <button onClick={() => { setEditName(campaign.name); setShowEditModal(true); }} className="px-2 py-1 bg-zinc-800 border border-zinc-700 text-[10px] font-mono text-zinc-400 rounded-sm hover:border-zinc-600 flex items-center gap-1 transition-colors">
                            <Pencil className="w-3 h-3" /> Edit
                        </button>
                        {campaign.status === 'active' && (
                            <button onClick={() => setShowPauseConfirm(true)} className="px-2 py-1 bg-amber-500/10 border border-amber-500/20 text-[10px] font-mono text-amber-400 rounded-sm flex items-center gap-1 hover:bg-amber-500/20 transition-colors">
                                {paused ? <><Play className="w-3 h-3" /> Resume</> : <><Pause className="w-3 h-3" /> Pause</>}
                            </button>
                        )}
                        <button onClick={() => { setDupName(`${campaign.name} (copy)`); setShowDuplicateModal(true); }} className="px-2 py-1 bg-zinc-800 border border-zinc-700 text-[10px] font-mono text-zinc-400 rounded-sm hover:border-zinc-600 flex items-center gap-1 transition-colors">
                            <Copy className="w-3 h-3" /> Duplicate
                        </button>
                    </div>
                </div>
            </div>

            {showEditModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowEditModal(false)} />
                    <div className="relative z-10 w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-sm shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
                            <h3 className="text-sm font-bold text-white font-display uppercase">Edit Campaign</h3>
                            <button onClick={() => setShowEditModal(false)} className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-sm"><X className="w-4 h-4" /></button>
                        </div>
                        <div className="px-6 py-5 space-y-3">
                            <label className="text-[10px] font-mono text-zinc-500 uppercase">Campaign Name</label>
                            <input autoFocus type="text" value={editName} onChange={e => setEditName(e.target.value)} onKeyDown={e => e.key === "Enter" && handleEdit()} className="w-full bg-zinc-900 border border-zinc-800 rounded-sm px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#a3e635]/50" />
                        </div>
                        <div className="flex gap-3 px-6 py-4 border-t border-zinc-800">
                            <button onClick={() => setShowEditModal(false)} className="flex-1 py-2 border border-zinc-700 text-zinc-400 text-xs uppercase font-mono rounded-sm transition-colors">Cancel</button>
                            <button onClick={handleEdit} disabled={!editName.trim()} className="flex-1 py-2 bg-[#a3e635] text-black font-bold text-xs uppercase rounded-sm hover:bg-[#bef264] disabled:opacity-40 transition-colors flex items-center justify-center gap-2"><Check className="w-3.5 h-3.5" /> Save</button>
                        </div>
                    </div>
                </div>
            )}

            <ConfirmModal
                open={showPauseConfirm}
                onClose={() => setShowPauseConfirm(false)}
                onConfirm={handlePause}
                title={paused ? "Resume Campaign" : "Pause Campaign"}
                description={paused ? `Resume "${campaign.name}"? Creators will be notified.` : `Pause "${campaign.name}"? No new content will be processed until resumed.`}
                confirmLabel={paused ? "Resume" : "Pause"}
            />

            {showDuplicateModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowDuplicateModal(false)} />
                    <div className="relative z-10 w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-sm shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
                            <div>
                                <h3 className="text-sm font-bold text-white font-display uppercase">Duplicate Campaign</h3>
                                <p className="text-[10px] text-zinc-500 font-mono mt-0.5">A new draft will be created</p>
                            </div>
                            <button onClick={() => setShowDuplicateModal(false)} className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-sm"><X className="w-4 h-4" /></button>
                        </div>
                        <div className="px-6 py-5 space-y-3">
                            <label className="text-[10px] font-mono text-zinc-500 uppercase">New Campaign Name</label>
                            <input autoFocus type="text" value={dupName} onChange={e => setDupName(e.target.value)} onKeyDown={e => e.key === "Enter" && handleDuplicate()} className="w-full bg-zinc-900 border border-zinc-800 rounded-sm px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#a3e635]/50" />
                        </div>
                        <div className="flex gap-3 px-6 py-4 border-t border-zinc-800">
                            <button onClick={() => setShowDuplicateModal(false)} className="flex-1 py-2 border border-zinc-700 text-zinc-400 text-xs uppercase font-mono rounded-sm transition-colors">Cancel</button>
                            <button onClick={handleDuplicate} disabled={!dupName.trim()} className="flex-1 py-2 bg-[#a3e635] text-black font-bold text-xs uppercase rounded-sm hover:bg-[#bef264] disabled:opacity-40 transition-colors flex items-center justify-center gap-2"><Copy className="w-3.5 h-3.5" /> Duplicate</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

function CampaignRow({ campaign }: { campaign: (typeof CAMPAIGNS_LIST)[0] }) {
    const [showDuplicateModal, setShowDuplicateModal] = useState(false);
    const [dupName, setDupName] = useState(`${campaign.name} (copy)`);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editName, setEditName] = useState(campaign.name);

    const handleDuplicate = () => {
        if (!dupName.trim()) return;
        toast.success(`Campaign duplicated`, { description: `"${dupName}" created as a draft.` });
        setShowDuplicateModal(false);
    };

    const handleEdit = () => {
        if (!editName.trim()) return;
        toast.success(`Campaign updated`, { description: `Renamed to "${editName}"` });
        setShowEditModal(false);
    };

    return (
        <>
            <div className="grid grid-cols-12 px-4 py-3 items-center hover:bg-zinc-800/20 group">
                <div className="col-span-4">
                    <Link href={`/campaigns/${campaign.id}`} className="text-sm font-bold text-white hover:text-[#a3e635]">{campaign.name}</Link>
                    <div className="text-[10px] font-mono text-zinc-500">{campaign.platform}</div>
                </div>
                <div className="col-span-2">
                    <span className={cn(
                        "text-[9px] font-mono px-2 py-0.5 rounded-sm uppercase",
                        campaign.status === 'active' && "bg-[#a3e635]/10 text-[#a3e635]",
                        campaign.status === 'draft' && "bg-zinc-700 text-zinc-400",
                        campaign.status === 'completed' && "bg-blue-500/10 text-blue-400"
                    )}>{campaign.status}</span>
                </div>
                <div className="col-span-2 text-[10px] font-mono text-zinc-500">{campaign.startDate} — {campaign.endDate}</div>
                <div className="col-span-2 text-[10px] font-mono text-zinc-400">${campaign.spent} / ${campaign.budget}</div>
                <div className="col-span-2 text-right flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link href={`/campaigns/${campaign.id}`} className="p-1.5 border border-zinc-700 rounded-sm text-zinc-500 hover:text-[#a3e635] transition-colors"><Eye className="w-3.5 h-3.5" /></Link>
                    <button onClick={() => { setEditName(campaign.name); setShowEditModal(true); }} className="p-1.5 border border-zinc-700 rounded-sm text-zinc-500 hover:text-zinc-300 transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                    <button onClick={() => { setDupName(`${campaign.name} (copy)`); setShowDuplicateModal(true); }} className="p-1.5 border border-zinc-700 rounded-sm text-zinc-500 hover:text-zinc-300 transition-colors"><Copy className="w-3.5 h-3.5" /></button>
                </div>
            </div>

            {showEditModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowEditModal(false)} />
                    <div className="relative z-10 w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-sm shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
                            <h3 className="text-sm font-bold text-white font-display uppercase">Edit Campaign</h3>
                            <button onClick={() => setShowEditModal(false)} className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-sm"><X className="w-4 h-4" /></button>
                        </div>
                        <div className="px-6 py-5 space-y-3">
                            <label className="text-[10px] font-mono text-zinc-500 uppercase">Campaign Name</label>
                            <input autoFocus type="text" value={editName} onChange={e => setEditName(e.target.value)} onKeyDown={e => e.key === "Enter" && handleEdit()} className="w-full bg-zinc-900 border border-zinc-800 rounded-sm px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#a3e635]/50" />
                        </div>
                        <div className="flex gap-3 px-6 py-4 border-t border-zinc-800">
                            <button onClick={() => setShowEditModal(false)} className="flex-1 py-2 border border-zinc-700 text-zinc-400 text-xs uppercase font-mono rounded-sm transition-colors">Cancel</button>
                            <button onClick={handleEdit} disabled={!editName.trim()} className="flex-1 py-2 bg-[#a3e635] text-black font-bold text-xs uppercase rounded-sm hover:bg-[#bef264] disabled:opacity-40 transition-colors">Save</button>
                        </div>
                    </div>
                </div>
            )}

            {showDuplicateModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowDuplicateModal(false)} />
                    <div className="relative z-10 w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-sm shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
                            <h3 className="text-sm font-bold text-white font-display uppercase">Duplicate Campaign</h3>
                            <button onClick={() => setShowDuplicateModal(false)} className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-sm"><X className="w-4 h-4" /></button>
                        </div>
                        <div className="px-6 py-5 space-y-3">
                            <label className="text-[10px] font-mono text-zinc-500 uppercase">New Campaign Name</label>
                            <input autoFocus type="text" value={dupName} onChange={e => setDupName(e.target.value)} onKeyDown={e => e.key === "Enter" && handleDuplicate()} className="w-full bg-zinc-900 border border-zinc-800 rounded-sm px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#a3e635]/50" />
                        </div>
                        <div className="flex gap-3 px-6 py-4 border-t border-zinc-800">
                            <button onClick={() => setShowDuplicateModal(false)} className="flex-1 py-2 border border-zinc-700 text-zinc-400 text-xs uppercase font-mono rounded-sm transition-colors">Cancel</button>
                            <button onClick={handleDuplicate} disabled={!dupName.trim()} className="flex-1 py-2 bg-[#a3e635] text-black font-bold text-xs uppercase rounded-sm hover:bg-[#bef264] disabled:opacity-40 transition-colors flex items-center justify-center gap-2"><Copy className="w-3.5 h-3.5" /> Duplicate</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
