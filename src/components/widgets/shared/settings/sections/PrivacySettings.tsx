"use client";

import { SettingsSection, ToggleGroup } from "../SettingsComponents";
import { Download, Trash2, Eye, Share2 } from "lucide-react";

export function PrivacySettings() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Data Management */}
            <SettingsSection title="Your Data">
                <div className="flex items-center justify-between p-4 border border-zinc-800 bg-zinc-900/40 rounded-sm">
                    <div className="flex items-center gap-3">
                        <Download className="w-4 h-4 text-zinc-400" />
                        <div>
                            <div className="text-sm font-bold text-white">Download Your Data</div>
                            <div className="text-xs text-zinc-500">Get a copy of your content, messages, and settings.</div>
                        </div>
                    </div>
                    <button className="px-3 py-1.5 border border-zinc-700 text-zinc-400 hover:text-white hover:border-white transition-colors text-xs uppercase font-mono">
                        Request_Archive
                    </button>
                </div>
            </SettingsSection>

            {/* Visibility */}
            <SettingsSection title="Visibility & Sharing">
                <div className="space-y-4">
                    <ToggleGroup label="Profile Visibility" description="Allow search engines to index your profile." checked={true} onChange={() => { }} />
                    <ToggleGroup label="Activity Status" description="Show when you are online to other users." checked={true} onChange={() => { }} />
                    <ToggleGroup label="Data Sharing" description="Share anonymous usage data to help us improve." checked={false} onChange={() => { }} />
                </div>
            </SettingsSection>
        </div>
    );
}
