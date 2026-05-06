"use client";

import { useState } from "react";
import { SettingsSection, ToggleGroup, InputGroup } from "../BrandSettingsComponents";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export function PrivacySettings() {
    const [benchmarking, setBenchmarking] = useState(true);
    const [gdpr, setGdpr] = useState(false);
    const [analyticsCookies, setAnalyticsCookies] = useState(true);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SettingsSection title="Data Governance">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ToggleGroup
                        label="Allow Data for Benchmarking"
                        description="Anonymously contribute to industry benchmarks."
                        checked={benchmarking}
                        onChange={(v) => { setBenchmarking(v); toast.success(v ? "Benchmarking data enabled" : "Benchmarking data disabled"); }}
                    />
                    <ToggleGroup
                        label="GDPR / CCPA Compliance Mode"
                        description="Strictly enforce data retention limits."
                        checked={gdpr}
                        onChange={(v) => { setGdpr(v); toast.success(v ? "Compliance mode enabled" : "Compliance mode disabled"); }}
                    />
                </div>
            </SettingsSection>

            <SettingsSection title="API Access">
                <div className="space-y-4">
                    <p className="text-xs text-zinc-400">Manage API keys for custom integrations.</p>
                    <div className="flex gap-2">
                        <InputGroup
                            label="Production API Key"
                            defaultValue="sk_live_51M..."
                            readOnly
                            className="flex-1"
                        />
                        <button onClick={() => { navigator.clipboard?.writeText("sk_live_51M..."); toast.success("API key copied to clipboard"); }} className="self-end mb-2 p-2.5 rounded-sm bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 hover:text-white text-zinc-400 transition-colors">
                            <Copy className="w-4 h-4" />
                        </button>
                        <button onClick={() => toast.success("New API key generated")} className="self-end mb-2 p-2.5 rounded-sm bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 hover:text-white text-zinc-400 transition-colors">
                            <RefreshCw className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </SettingsSection>

            <SettingsSection title="Cookie Preferences">
                <div className="p-4 border border-zinc-800 bg-zinc-900/50 rounded-sm">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-white">Essential Cookies</span>
                        <span className="text-[10px] text-zinc-500 font-mono">REQUIRED</span>
                    </div>
                    <p className="text-[11px] text-zinc-500 mb-4">Necessary for the platform to function securely.</p>

                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">Analytics Cookies</span>
                        <ToggleGroup label="" checked={analyticsCookies} onChange={(v) => { setAnalyticsCookies(v); toast.success(v ? "Analytics cookies enabled" : "Analytics cookies disabled"); }} />
                    </div>
                </div>
            </SettingsSection>

            <div className="flex justify-end pt-4 border-t border-white/5">
                <button onClick={() => toast.success("Privacy settings saved")} className="px-6 py-2 bg-[#a3e635] text-black font-bold text-xs uppercase hover:bg-[#b5f045] transition-colors rounded-sm shadow-[0_0_10px_rgba(163,230,53,0.2)]">
                    Save_Changes
                </button>
            </div>
        </div>
    );
}
