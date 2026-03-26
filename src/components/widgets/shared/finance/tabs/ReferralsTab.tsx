import { useState } from "react";
import { Copy, Share2, Trophy, Users } from "lucide-react";
import { useFinanceMvp } from "@/components/widgets/shared/finance/FinanceMvpContext";

export function ReferralsTab() {
    const {
        referralLink,
        totalReferrals,
        referralLifetimeEarnings,
        referralPendingRewards,
        leaderboard,
        copyReferralLink,
        boostReferralEntry,
        formatCurrency
    } = useFinanceMvp();
    const [statusMessage, setStatusMessage] = useState("Invite tracking is active.");

    const copyLink = async () => {
        const link = copyReferralLink();
        try {
            await navigator.clipboard.writeText(link);
            setStatusMessage("Referral link copied to clipboard.");
        } catch {
            setStatusMessage("Clipboard unavailable. Link is visible for manual copy.");
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-[#a3e635]/10 border border-[#a3e635]/20 p-6 rounded-sm flex flex-col items-center text-center">
                <div className="text-sm font-bold text-white font-display tracking-wide uppercase mb-2">Invite_Creators</div>
                <p className="text-zinc-400 font-mono text-xs max-w-md mb-6">Earn 5% of platform fees for every creator who joins using your unique invite link. Payments are processed monthly.</p>

                <div className="flex w-full max-w-md items-center gap-2">
                    <div className="flex-1 bg-zinc-950 border border-zinc-800/50 text-xs font-mono text-zinc-300 p-3 rounded-sm truncate">
                        {referralLink}
                    </div>
                    <button onClick={copyLink} className="bg-[#a3e635] text-black p-3 rounded-sm font-bold hover:opacity-90 transition-opacity">
                        <Copy className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setStatusMessage("Share campaign queued for social posting.")}
                        className="bg-zinc-900 text-zinc-300 p-3 rounded-sm border border-zinc-800 hover:text-white transition-colors"
                    >
                        <Share2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-sm">
                    <div className="text-[10px] text-zinc-500 font-mono uppercase mb-2 flex items-center gap-2"><Users className="w-3.5 h-3.5" /> Total Referrals</div>
                    <div className="text-2xl font-bold text-white">{totalReferrals}</div>
                    <div className="text-[10px] text-[#a3e635] font-mono mt-1">+3 this month</div>
                </div>
                <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-sm">
                    <div className="text-[10px] text-zinc-500 font-mono uppercase mb-2 flex items-center gap-2"><Trophy className="w-3.5 h-3.5" /> Lifetime Earnings</div>
                    <div className="text-2xl font-bold text-white">{formatCurrency(referralLifetimeEarnings)}</div>
                </div>
                <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-sm">
                    <div className="text-[10px] text-zinc-500 font-mono uppercase mb-2">Pending Rewards</div>
                    <div className="text-2xl font-bold text-white">{formatCurrency(referralPendingRewards)}</div>
                </div>
            </div>

            <div className="bg-zinc-900/40 border border-zinc-800 rounded-sm p-6">
                <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider mb-4">Referral_Leaderboard</h3>
                <div className="space-y-3">
                    {leaderboard.map((entry, index) => (
                        <button
                            key={entry.id}
                            onClick={() => {
                                boostReferralEntry(entry.id);
                                setStatusMessage(`${entry.name} bonus increased by $100.`);
                            }}
                            className="w-full text-left flex items-center justify-between p-3 bg-zinc-950/30 border border-zinc-800 rounded-sm hover:border-zinc-700 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className="text-xs font-bold text-zinc-600 font-mono">{String(index + 1).padStart(2, "0")}</div>
                                <div className="text-xs font-bold text-zinc-300">{entry.name}</div>
                            </div>
                            <div className="text-[10px] text-[#a3e635] font-mono font-bold">{formatCurrency(entry.earned)} Earned</div>
                        </button>
                    ))}
                </div>
            </div>
            <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">{statusMessage}</div>
        </div>
    );
}
