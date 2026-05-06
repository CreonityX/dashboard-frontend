"use client";

import { useState } from "react";
import { SettingsSection } from "../BrandSettingsComponents";
import { UserX, Search, Ban } from "lucide-react";
import { toast } from "sonner";
import { ConfirmModal } from "../../ConfirmModal";

interface BlockedUser { name: string; handle: string; date: string; }

const INITIAL_BLOCKED: BlockedUser[] = [
    { name: "Alex Rivera", handle: "@arivera_creative", date: "Blocked on Feb 10, 2026" },
    { name: "Studio Pulse", handle: "@studiopulse", date: "Blocked on Jan 22, 2026" },
];

export function BlockedCreators() {
    const [blocked, setBlocked] = useState<BlockedUser[]>(INITIAL_BLOCKED);
    const [search, setSearch] = useState("");
    const [unblockTarget, setUnblockTarget] = useState<BlockedUser | null>(null);

    const filtered = blocked.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.handle.toLowerCase().includes(search.toLowerCase())
    );

    const handleUnblock = () => {
        if (!unblockTarget) return;
        setBlocked(prev => prev.filter(u => u.handle !== unblockTarget.handle));
        toast.success(`${unblockTarget.name} unblocked`, { description: "They can now see your campaigns and contact you." });
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="p-4 border border-red-500/20 bg-red-950/10 rounded-sm flex gap-4 items-center">
                <Ban className="w-5 h-5 text-red-500 shrink-0" />
                <div>
                    <h3 className="text-sm font-bold text-white">Blocked List</h3>
                    <p className="text-xs text-zinc-400">Blocked creators cannot see your campaigns or contact you.</p>
                </div>
            </div>

            <SettingsSection title="Manage Blocked Users">
                <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search blocked users..."
                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-sm py-2 px-10 text-xs text-white placeholder:text-zinc-600 focus:border-red-500/50 focus:outline-none transition-all font-mono"
                    />
                </div>

                {filtered.length === 0 ? (
                    <div className="text-center py-10 text-zinc-600 font-mono text-xs">
                        {search ? "No blocked users match your search." : "No blocked creators."}
                    </div>
                ) : (
                    <div className="space-y-2">
                        {filtered.map(user => (
                            <div key={user.handle} className="flex items-center justify-between p-4 border border-white/5 bg-white/[0.02] rounded-sm hover:border-white/10 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
                                        <UserX className="w-5 h-5 text-zinc-500" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-white">{user.name}</div>
                                        <div className="text-xs text-zinc-500 font-mono">{user.handle}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-[10px] text-zinc-600 font-mono hidden sm:block">{user.date}</span>
                                    <button
                                        onClick={() => setUnblockTarget(user)}
                                        className="px-3 py-1.5 border border-zinc-700 text-xs font-bold text-zinc-400 hover:text-white hover:border-white transition-colors uppercase rounded-sm"
                                    >
                                        Unblock
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </SettingsSection>

            <ConfirmModal
                open={!!unblockTarget}
                onClose={() => setUnblockTarget(null)}
                onConfirm={handleUnblock}
                title="Unblock Creator"
                description={`${unblockTarget?.name} (${unblockTarget?.handle}) will be able to see your campaigns and send you messages again.`}
                confirmLabel="Yes, Unblock"
            />
        </div>
    );
}
