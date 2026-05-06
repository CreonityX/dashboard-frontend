"use client";

import { useState } from "react";
import { SettingsSection } from "../BrandSettingsComponents";
import { AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { ConfirmModal } from "../../ConfirmModal";

export function AccountManagement() {
    const [showDeactivate, setShowDeactivate] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [deleteInput, setDeleteInput] = useState("");
    const [deactivated, setDeactivated] = useState(false);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="p-4 border border-red-500/20 bg-red-950/20 rounded-sm flex gap-4 items-start">
                <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div className="space-y-2">
                    <h3 className="text-sm font-bold text-red-400">Danger Zone</h3>
                    <p className="text-xs text-zinc-400 max-w-lg">
                        Actions here are irreversible. Please proceed with caution. Deleting your account will remove all your data, campaign history, and payment records permanently.
                    </p>
                </div>
            </div>

            <SettingsSection title="Account Actions">
                <div className="flex items-center justify-between p-4 border border-zinc-800 bg-zinc-900/40 rounded-sm">
                    <div>
                        <div className="text-sm font-bold text-white">Deactivate Account</div>
                        <div className="text-xs text-zinc-500 mt-1">Temporarily disable your profile. You can reactivate anytime by signing back in.</div>
                    </div>
                    {deactivated ? (
                        <button onClick={() => { setDeactivated(false); toast.success("Account reactivated"); }} className="px-4 py-2 border border-[#a3e635]/40 text-[#a3e635] hover:bg-[#a3e635]/10 transition-colors text-xs uppercase font-mono">
                            Reactivate
                        </button>
                    ) : (
                        <button onClick={() => setShowDeactivate(true)} className="px-4 py-2 border border-zinc-700 text-zinc-400 hover:text-white hover:border-white transition-colors text-xs uppercase font-mono">
                            Deactivate
                        </button>
                    )}
                </div>

                <div className="flex items-center justify-between p-4 border border-red-900/30 bg-red-950/10 rounded-sm">
                    <div>
                        <div className="text-sm font-bold text-white">Delete Account</div>
                        <div className="text-xs text-zinc-500 mt-1">Permanently remove your account and all associated data. This cannot be undone.</div>
                    </div>
                    <button onClick={() => setShowDelete(true)} className="px-4 py-2 bg-red-900/20 border border-red-900/50 text-red-500 hover:bg-red-900/40 hover:text-red-400 transition-colors text-xs uppercase font-mono">
                        Delete_Account
                    </button>
                </div>
            </SettingsSection>

            {/* Deactivate Confirm */}
            <ConfirmModal
                open={showDeactivate}
                onClose={() => setShowDeactivate(false)}
                onConfirm={() => { setDeactivated(true); toast("Account deactivated", { description: "Your profile is now hidden. Sign in again to reactivate." }); }}
                title="Deactivate Account"
                description="Your profile will be hidden from creators and campaigns will be paused. You can reactivate by signing back in at any time."
                confirmLabel="Yes, Deactivate"
                variant="danger"
            />

            {/* Delete Account Modal with type-to-confirm */}
            {showDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => { setShowDelete(false); setDeleteInput(""); }} />
                    <div className="relative z-10 w-full max-w-md bg-zinc-950 border border-red-900/40 rounded-sm shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="px-6 pt-5 pb-4 border-b border-zinc-800">
                            <div className="flex items-start gap-3">
                                <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="text-sm font-bold text-red-400 font-display uppercase tracking-wide">Delete Account Permanently</h3>
                                    <p className="text-xs text-zinc-500 font-mono mt-1 leading-relaxed">
                                        This will immediately delete all your campaigns, creator relationships, payment history, and account data. This action cannot be undone.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="px-6 py-5 space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-mono text-zinc-400 uppercase">
                                    Type <span className="text-red-400 font-bold">DELETE</span> to confirm
                                </label>
                                <input
                                    autoFocus
                                    value={deleteInput}
                                    onChange={e => setDeleteInput(e.target.value)}
                                    placeholder="DELETE"
                                    className="w-full bg-zinc-900/50 border border-red-900/40 rounded-sm px-4 py-2.5 text-xs text-white font-mono placeholder:text-zinc-700 outline-none focus:border-red-500/60 transition-all tracking-widest"
                                />
                            </div>
                        </div>
                        <div className="flex gap-3 px-6 py-4 border-t border-zinc-800">
                            <button onClick={() => { setShowDelete(false); setDeleteInput(""); }} className="flex-1 py-2 border border-zinc-700 text-zinc-400 hover:text-white text-xs uppercase font-mono rounded-sm transition-colors">Cancel</button>
                            <button
                                disabled={deleteInput !== "DELETE"}
                                onClick={() => { setShowDelete(false); setDeleteInput(""); toast.error("Account deletion scheduled", { description: "Your account will be permanently deleted in 30 days. Contact support to cancel." }); }}
                                className="flex-1 py-2 bg-red-600 text-white font-bold text-xs uppercase rounded-sm hover:bg-red-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                Delete Forever
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
