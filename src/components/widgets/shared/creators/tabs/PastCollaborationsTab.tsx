"use client";

import { useState } from "react";
import { Star, RotateCcw, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { PAST_COLLABORATIONS } from "@/lib/brand-data";
import Link from "next/link";

export function PastCollaborationsTab() {
    const [ratingHover, setRatingHover] = useState<number | null>(null);
    const [creatorRating, setCreatorRating] = useState<Record<string, number>>({});

    const rateCreator = (id: string, stars: number) => setCreatorRating(prev => ({ ...prev, [id]: stars }));

    return (
        <div className="space-y-6">
            <h2 className="text-xs font-bold text-zinc-500 font-display tracking-widest uppercase">Past_Collaborations</h2>
            <p className="text-[11px] text-zinc-500 font-mono">Completed creator partnerships. Rate your experience and re-hire.</p>

            <div className="space-y-3">
                {PAST_COLLABORATIONS.map(collab => {
                    const userRating = creatorRating[collab.id] ?? collab.rating;
                    return (
                        <div key={collab.id} className="bg-zinc-900/40 border border-zinc-800 rounded-sm p-4 flex items-center gap-4 hover:border-zinc-700 transition-colors">
                            <div className="w-12 h-12 rounded-sm bg-zinc-800 flex items-center justify-center text-sm font-bold text-[#a3e635] shrink-0">{collab.creator.substring(0, 2)}</div>
                            <div className="flex-1 min-w-0">
                                <div className="text-sm font-bold text-white">{collab.creator}</div>
                                <div className="text-[10px] text-zinc-500 font-mono">{collab.campaign} • Completed {collab.completedDate}</div>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className={cn(
                                        "text-[9px] font-mono px-2 py-0.5 rounded-sm uppercase",
                                        collab.performance === "excellent" && "bg-[#a3e635]/10 text-[#a3e635]",
                                        collab.performance === "good" && "bg-blue-500/10 text-blue-400"
                                    )}>{collab.performance}</span>
                                    {collab.rehireable && <span className="text-[9px] font-mono text-zinc-500">Re-hireable</span>}
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-2 shrink-0">
                                {collab.rating === null ? (
                                    <div className="flex items-center gap-0.5" onMouseLeave={() => setRatingHover(null)}>
                                        {[1, 2, 3, 4, 5].map(s => (
                                            <button key={s} onClick={() => rateCreator(collab.id, s)} onMouseEnter={() => setRatingHover(s)} className="p-0.5">
                                                <Star className={cn("w-4 h-4", (ratingHover !== null ? s <= ratingHover : s <= userRating) ? "text-[#a3e635] fill-[#a3e635]" : "text-zinc-600")} />
                                            </button>
                                        ))}
                                        <span className="text-[10px] font-mono text-zinc-500 ml-1">Rate</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-1">
                                        {[1, 2, 3, 4, 5].map(s => <Star key={s} className={cn("w-4 h-4", s <= (userRating || collab.rating) ? "text-[#a3e635] fill-[#a3e635]" : "text-zinc-600")} />)}
                                    </div>
                                )}
                                <Link href={`/creators?tab=discover&creator=${collab.creatorId}&invite=1`} className="px-3 py-2 bg-[#a3e635]/10 border border-[#a3e635]/30 text-[10px] font-mono text-[#a3e635] rounded-sm hover:bg-[#a3e635]/20 flex items-center gap-1">
                                    <RotateCcw className="w-3 h-3" /> Re-hire
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
