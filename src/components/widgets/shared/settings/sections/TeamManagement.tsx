"use client";

import { useState, useRef, useEffect } from "react";
import { SettingsSection } from "../BrandSettingsComponents";
import { UserPlus, MoreHorizontal, Shield, X, ChevronDown, Trash2, Edit2 } from "lucide-react";
import { toast } from "sonner";
import { ConfirmModal } from "../../ConfirmModal";
import { cn } from "@/lib/utils";

interface Member {
    name: string;
    email: string;
    role: string;
    status: string;
    isCurrentUser?: boolean;
}

const INITIAL_MEMBERS: Member[] = [
    { name: "Kai Zen", email: "kai.zen@creonity.com", role: "Admin", status: "Active", isCurrentUser: true },
    { name: "Sarah Miller", email: "sarah.m@creonity.com", role: "Editor", status: "Active" },
    { name: "David Chen", email: "david.c@creonity.com", role: "Viewer", status: "Pending" },
];

const ROLES = ["Admin", "Editor", "Viewer"];

export function TeamManagement() {
    const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);
    const [showModal, setShowModal] = useState(false);
    const [inviteName, setInviteName] = useState("");
    const [inviteEmail, setInviteEmail] = useState("");
    const [inviteRole, setInviteRole] = useState("Viewer");
    const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

    // Remove confirm
    const [removeTarget, setRemoveTarget] = useState<Member | null>(null);

    // Edit role
    const [editTarget, setEditTarget] = useState<Member | null>(null);
    const [editRole, setEditRole] = useState("Viewer");

    const validate = () => {
        const e: { name?: string; email?: string } = {};
        if (!inviteName.trim()) e.name = "Name is required";
        if (!inviteEmail.trim()) e.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inviteEmail)) e.email = "Enter a valid email";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleInvite = () => {
        if (!validate()) return;
        setMembers(prev => [...prev, { name: inviteName.trim(), email: inviteEmail.trim(), role: inviteRole, status: "Pending" }]);
        toast.success("Invitation sent", { description: `${inviteEmail.trim()} has been invited as ${inviteRole}.` });
        setInviteName(""); setInviteEmail(""); setInviteRole("Viewer"); setErrors({});
        setShowModal(false);
    };

    const handleRemove = () => {
        if (!removeTarget) return;
        setMembers(prev => prev.filter(m => m.email !== removeTarget.email));
        toast.success(`${removeTarget.name} removed from team`);
    };

    const openEdit = (m: Member) => { setEditTarget(m); setEditRole(m.role); };
    const handleEditRole = () => {
        if (!editTarget) return;
        setMembers(prev => prev.map(m => m.email === editTarget.email ? { ...m, role: editRole } : m));
        toast.success(`${editTarget.name}'s role updated to ${editRole}`);
        setEditTarget(null);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-bold text-white font-display">Team Members</h2>
                    <p className="text-xs text-zinc-500 font-mono">Manage access and roles for your organization.</p>
                </div>
                <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-[#a3e635] text-black px-4 py-2 text-xs font-bold uppercase rounded-sm hover:bg-[#b0f545] transition-colors">
                    <UserPlus className="w-4 h-4" /> Invite Member
                </button>
            </div>

            <SettingsSection title="Active Members">
                <div className="border border-white/5 rounded-sm overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/5 bg-zinc-900/50 text-xs text-zinc-500 font-mono uppercase">
                                <th className="p-4 font-medium">User</th>
                                <th className="p-4 font-medium">Role</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {members.map((m, i) => (
                                <TeamMemberRow
                                    key={i}
                                    member={m}
                                    onEditRole={() => openEdit(m)}
                                    onRemove={() => setRemoveTarget(m)}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </SettingsSection>

            {/* Invite Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center" onKeyDown={e => { if (e.key === "Enter") handleInvite(); if (e.key === "Escape") setShowModal(false); }}>
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowModal(false)} />
                    <div className="relative z-10 w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-sm shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
                            <div>
                                <h3 className="text-sm font-bold text-white font-display uppercase tracking-wide">Invite Team Member</h3>
                                <p className="text-[10px] text-zinc-500 font-mono mt-0.5">They will receive an email with an invite link.</p>
                            </div>
                            <button onClick={() => setShowModal(false)} className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-sm transition-colors">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="px-6 py-5 space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-mono text-zinc-400 font-medium uppercase">Full Name</label>
                                <input autoFocus value={inviteName} onChange={e => setInviteName(e.target.value)} placeholder="e.g. Alex Johnson"
                                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-sm px-4 py-2.5 text-xs text-white font-mono placeholder:text-zinc-700 outline-none focus:border-[#a3e635]/50 focus:bg-zinc-900 transition-all" />
                                {errors.name && <p className="text-[10px] text-red-500 font-mono">{errors.name}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-mono text-zinc-400 font-medium uppercase">Work Email</label>
                                <input type="email" value={inviteEmail} onChange={e => setInviteEmail(e.target.value)} placeholder="alex@yourcompany.com"
                                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-sm px-4 py-2.5 text-xs text-white font-mono placeholder:text-zinc-700 outline-none focus:border-[#a3e635]/50 focus:bg-zinc-900 transition-all" />
                                {errors.email && <p className="text-[10px] text-red-500 font-mono">{errors.email}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-mono text-zinc-400 font-medium uppercase">Role</label>
                                <div className="relative">
                                    <select value={inviteRole} onChange={e => setInviteRole(e.target.value)}
                                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-sm px-4 py-2.5 text-xs text-white font-mono outline-none appearance-none cursor-pointer hover:border-zinc-700 focus:border-[#a3e635]/50 transition-all">
                                        <option value="Admin">Admin — Full access</option>
                                        <option value="Editor">Editor — Can edit campaigns</option>
                                        <option value="Viewer">Viewer — Read only</option>
                                    </select>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-600 text-[10px]">▼</div>
                                </div>
                                <p className="text-[10px] text-zinc-600 font-mono">
                                    {inviteRole === "Admin" && "Can manage team, billing, and all campaigns."}
                                    {inviteRole === "Editor" && "Can create and edit campaigns, cannot manage team."}
                                    {inviteRole === "Viewer" && "Read-only access to dashboard and reports."}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-zinc-800">
                            <button onClick={() => setShowModal(false)} className="px-5 py-2 border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors text-xs uppercase font-mono rounded-sm">Cancel</button>
                            <button onClick={handleInvite} className="px-5 py-2 bg-[#a3e635] text-black font-bold text-xs uppercase rounded-sm hover:bg-[#b0f545] transition-colors shadow-[0_0_12px_rgba(163,230,53,0.2)] flex items-center gap-2">
                                <UserPlus className="w-3.5 h-3.5" /> Send Invite
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Role Modal */}
            {editTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setEditTarget(null)} />
                    <div className="relative z-10 w-full max-w-sm bg-zinc-950 border border-zinc-800 rounded-sm shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
                            <h3 className="text-sm font-bold text-white font-display uppercase tracking-wide">Change Role</h3>
                            <button onClick={() => setEditTarget(null)} className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-sm transition-colors"><X className="w-4 h-4" /></button>
                        </div>
                        <div className="px-6 py-5 space-y-4">
                            <p className="text-xs text-zinc-400 font-mono">Updating role for <span className="text-white font-bold">{editTarget.name}</span></p>
                            <div className="space-y-2">
                                {ROLES.map(r => (
                                    <button key={r} onClick={() => setEditRole(r)}
                                        className={cn("w-full text-left px-4 py-3 border rounded-sm transition-all text-xs font-mono",
                                            editRole === r ? "border-[#a3e635]/50 bg-[#a3e635]/5 text-[#a3e635]" : "border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200")}>
                                        <div className="font-bold">{r}</div>
                                        <div className="text-[10px] opacity-60 mt-0.5">
                                            {r === "Admin" && "Full access including team and billing"}
                                            {r === "Editor" && "Can create and edit campaigns"}
                                            {r === "Viewer" && "Read-only access"}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="flex gap-3 px-6 py-4 border-t border-zinc-800">
                            <button onClick={() => setEditTarget(null)} className="flex-1 py-2 border border-zinc-700 text-zinc-400 hover:text-white text-xs uppercase font-mono rounded-sm transition-colors">Cancel</button>
                            <button onClick={handleEditRole} className="flex-1 py-2 bg-[#a3e635] text-black font-bold text-xs uppercase rounded-sm hover:bg-[#b0f545] transition-colors">Save Role</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Remove Confirm Modal */}
            <ConfirmModal
                open={!!removeTarget}
                onClose={() => setRemoveTarget(null)}
                onConfirm={handleRemove}
                title="Remove Team Member"
                description={`Are you sure you want to remove ${removeTarget?.name} from the team? They will lose all access immediately.`}
                confirmLabel="Remove Member"
                variant="danger"
            />
        </div>
    );
}

function TeamMemberRow({ member, onEditRole, onRemove }: { member: Member; onEditRole: () => void; onRemove: () => void }) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    return (
        <tr className="group hover:bg-white/[0.02] transition-colors">
            <td className="p-4">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-400">
                        {member.name.charAt(0)}
                    </div>
                    <div>
                        <div className="text-sm font-bold text-white flex items-center gap-2">
                            {member.name}
                            {member.isCurrentUser && <span className="text-[9px] text-zinc-500 bg-zinc-900 border border-zinc-800 px-1.5 rounded-sm uppercase">You</span>}
                        </div>
                        <div className="text-xs text-zinc-600 font-mono">{member.email}</div>
                    </div>
                </div>
            </td>
            <td className="p-4">
                <div className="flex items-center gap-1.5 text-xs text-zinc-300 font-mono bg-zinc-900/50 border border-zinc-800 px-2 py-1 rounded-sm w-fit">
                    <Shield className="w-3 h-3 text-zinc-500" /> {member.role}
                </div>
            </td>
            <td className="p-4">
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-sm border ${member.status === 'Active' ? 'text-[#a3e635] bg-[#a3e635]/10 border-[#a3e635]/20' : 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20'}`}>
                    {member.status.toUpperCase()}
                </span>
            </td>
            <td className="p-4 text-right">
                {!member.isCurrentUser ? (
                    <div className="relative inline-block" ref={ref}>
                        <button onClick={() => setOpen(v => !v)} className="p-1.5 hover:bg-zinc-800 rounded-sm text-zinc-500 hover:text-white transition-colors">
                            <MoreHorizontal className="w-4 h-4" />
                        </button>
                        {open && (
                            <div className="absolute right-0 top-full mt-1 z-20 w-44 bg-zinc-900 border border-zinc-800 rounded-sm shadow-xl py-1 animate-in fade-in zoom-in-95 duration-100">
                                <button onClick={() => { setOpen(false); onEditRole(); }}
                                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-mono text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors text-left">
                                    <Edit2 className="w-3.5 h-3.5" /> Change Role
                                </button>
                                <button onClick={() => { setOpen(false); toast("Invite resent", { description: `Invitation resent to ${member.email}` }); }}
                                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-mono text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors text-left">
                                    <UserPlus className="w-3.5 h-3.5" /> Resend Invite
                                </button>
                                <div className="my-1 border-t border-zinc-800" />
                                <button onClick={() => { setOpen(false); onRemove(); }}
                                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-mono text-red-500 hover:bg-red-950/30 transition-colors text-left">
                                    <Trash2 className="w-3.5 h-3.5" /> Remove Member
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <span className="text-[10px] text-zinc-600 font-mono">—</span>
                )}
            </td>
        </tr>
    );
}
