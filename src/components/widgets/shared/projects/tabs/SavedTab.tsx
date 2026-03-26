import { Clock, DollarSign, ExternalLink, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useProjectsMvp } from "@/components/widgets/shared/projects/ProjectsMvpContext";

export function SavedTab() {
    const { savedOpportunities, applications, toggleSave, applyToOpportunity } = useProjectsMvp();
    const applied = new Set(applications.map((item) => item.opportunityId));

    return (
        <div className="space-y-6">
            <p className="text-zinc-500 font-mono text-xs">BOOKMARKS // {savedOpportunities.length}_ITEMS</p>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {savedOpportunities.map((gig) => (
                    <div key={gig.id} className="bg-zinc-900/40 border border-zinc-800 rounded-sm p-5 hover:border-zinc-700 transition-all group relative">
                        <div className="flex items-start gap-3 mb-4">
                            <div className={cn("w-10 h-10 rounded-sm flex items-center justify-center text-xs font-bold tracking-tighter border border-zinc-700/50", gig.logoBg)}>
                                {gig.brand[0]}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-sm font-bold text-white leading-tight group-hover:text-[#a3e635] transition-colors">{gig.brand}</h3>
                                <p className="text-[10px] text-zinc-500 font-mono uppercase">{gig.type}</p>
                            </div>
                        </div>

                        <h4 className="text-sm text-zinc-300 font-medium leading-relaxed mb-4 min-h-[40px]">{gig.title}</h4>

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
                                    onClick={() => toggleSave(gig.id)}
                                    className="p-2 bg-zinc-950 border border-zinc-800 hover:border-red-500/50 rounded-sm text-zinc-500 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => applyToOpportunity(gig.id)}
                                    disabled={applied.has(gig.id)}
                                    className={cn(
                                        "px-3 py-2 text-[10px] font-bold font-mono rounded-sm uppercase transition-opacity flex items-center gap-1",
                                        applied.has(gig.id)
                                            ? "bg-zinc-700 text-zinc-200 cursor-default"
                                            : "bg-[#a3e635] text-black hover:opacity-90"
                                    )}
                                >
                                    {applied.has(gig.id) ? "Applied" : "Apply"} <ExternalLink className="w-3 h-3 ml-0.5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {savedOpportunities.length === 0 && (
                    <div className="md:col-span-2 xl:col-span-3 border border-zinc-800 rounded-sm p-8 text-center text-zinc-400 text-sm bg-zinc-900/30">
                        No saved opportunities yet.
                    </div>
                )}
            </div>
        </div>
    );
}
