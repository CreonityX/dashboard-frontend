"use client";

import { SettingsSection } from "../SettingsComponents";
import { AlertTriangle } from "lucide-react";

export function AccountManagement() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="p-4 border border-red-500/20 bg-red-950/20 rounded-sm flex gap-4 items-start">
                <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div className="space-y-2">
                    <h3 className="text-sm font-bold text-red-400">Danger Zone</h3>
                    <p className="text-xs text-zinc-400 max-w-lg">
                        Actions here are irreversible. Please proceed with caution. Deleting your account will remove all your data, gig history, and earnings records.
                    </p>
                </div>
            </div>

            <SettingsSection title="Account Actions">
                <div className="flex items-center justify-between p-4 border border-zinc-800 bg-zinc-900/40 rounded-sm">
                    <div>
                        <div className="text-sm font-bold text-white">Deactivate Account</div>
                        <div className="text-xs text-zinc-500 mt-1">Temporarily disable your profile. You can reactivate anytime.</div>
                    </div>
                    <button className="px-4 py-2 border border-zinc-700 text-zinc-400 hover:text-white hover:border-white transition-colors text-xs uppercase font-mono">
                        Deactivate
                    </button>
                </div>

                <div className="flex items-center justify-between p-4 border border-red-900/30 bg-red-950/10 rounded-sm">
                    <div>
                        <div className="text-sm font-bold text-white">Delete Account</div>
                        <div className="text-xs text-zinc-500 mt-1">Permanently remove your account and all data.</div>
                    </div>
                    <button className="px-4 py-2 bg-red-900/20 border border-red-900/50 text-red-500 hover:bg-red-900/40 hover:text-red-400 transition-colors text-xs uppercase font-mono">
                        Delete_Account
                    </button>
                </div>
            </SettingsSection>
        </div>
    );
}
