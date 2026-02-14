import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { GlassTechCard } from "../GlassTechCard";

const LEADERBOARD_DATA = [
    { rank: 1, name: "Sarah K.", handle: "@sarah.creates", points: "12,450", trend: "up" },
    { rank: 2, name: "Davide M.", handle: "@davide.art", points: "11,200", trend: "up" },
    { rank: 3, name: "Jinx", handle: "@jinx.pro", points: "10,890", trend: "down" },
    { rank: 4, name: "Marcus", handle: "@marcus.dev", points: "9,500", trend: "same" },
    { rank: 5, name: "Elena", handle: "@elena.ui", points: "9,200", trend: "up" },
];

export function LeaderboardWidget() {
    return (
        <GlassTechCard title="Top_Creators" description="LIVE_RANKING" className="h-full">
            <div className="flex flex-col h-full overflow-hidden">
                <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                    <table className="w-full text-left border-collapse">
                        <thead className="text-[10px] font-mono text-zinc-500 uppercase border-b border-white/5 sticky top-0 bg-black/80 backdrop-blur-sm z-10">
                            <tr>
                                <th className="py-2 w-8 text-center">#</th>
                                <th className="py-2">Entity</th>
                                <th className="py-2 text-right">Score</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {LEADERBOARD_DATA.map((user) => (
                                <tr key={user.rank} className="group hover:bg-white/5 transition-colors">
                                    <td className="py-2 text-center">
                                        <div className={`w-5 h-5 flex items-center justify-center font-mono text-[10px] font-bold rounded-sm mx-auto
                               ${user.rank === 1 ? 'bg-[#a3e635] text-black shadow-[0_0_10px_#a3e635]' :
                                                user.rank <= 3 ? 'bg-white/10 text-white' :
                                                    'text-zinc-600'}
                            `}>
                                            {user.rank}
                                        </div>
                                    </td>
                                    <td className="py-2">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-zinc-200 group-hover:text-white transition-colors">{user.name}</span>
                                            <span className="text-[8px] text-zinc-600 font-mono">{user.handle}</span>
                                        </div>
                                    </td>
                                    <td className="py-2 text-right">
                                        <div className="text-xs font-mono font-bold text-white tabular-nums">{user.points}</div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </GlassTechCard>
    );
}
