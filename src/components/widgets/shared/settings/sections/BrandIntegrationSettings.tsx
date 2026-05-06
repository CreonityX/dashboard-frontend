"use client";

import { useState } from "react";
import { SettingsSection } from "../BrandSettingsComponents";
import { BarChart3, ShoppingBag, Users, MessageSquare, Briefcase, FileText, CheckCircle2, X, ExternalLink, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { ConfirmModal } from "../../ConfirmModal";
import { cn } from "@/lib/utils";

type IntegrationName = "Shopify" | "WooCommerce" | "QuickBooks" | "Google Analytics 4" | "Salesforce" | "HubSpot" | "Slack" | "Asana";

interface IntegrationState {
    name: IntegrationName;
    status: "connected" | "disconnected";
}

const INITIAL_INTEGRATIONS: IntegrationState[] = [
    { name: "Shopify", status: "connected" },
    { name: "WooCommerce", status: "disconnected" },
    { name: "QuickBooks", status: "disconnected" },
    { name: "Google Analytics 4", status: "disconnected" },
    { name: "Salesforce", status: "disconnected" },
    { name: "HubSpot", status: "disconnected" },
    { name: "Slack", status: "connected" },
    { name: "Asana", status: "disconnected" },
];

const ICONS: Record<IntegrationName, any> = {
    "Shopify": ShoppingBag,
    "WooCommerce": ShoppingBag,
    "QuickBooks": FileText,
    "Google Analytics 4": BarChart3,
    "Salesforce": Users,
    "HubSpot": Users,
    "Slack": MessageSquare,
    "Asana": Briefcase,
};

const DESCRIPTIONS: Record<IntegrationName, string> = {
    "Shopify": "Sync products and track sales attributed to campaigns.",
    "WooCommerce": "Connect your WordPress store for conversion tracking.",
    "QuickBooks": "Automate creator payouts and tax documentation.",
    "Google Analytics 4": "Track campaign traffic and conversion events.",
    "Salesforce": "Sync influencer data with your CRM leads.",
    "HubSpot": "Manage creator relationships in HubSpot.",
    "Slack": "Receive real-time campaign notifications in channels.",
    "Asana": "Auto-create tasks from campaign milestones.",
};

export function IntegrationSettings() {
    const [integrations, setIntegrations] = useState<IntegrationState[]>(INITIAL_INTEGRATIONS);
    const [connectTarget, setConnectTarget] = useState<IntegrationName | null>(null);
    const [disconnectTarget, setDisconnectTarget] = useState<IntegrationName | null>(null);
    const [configureTarget, setConfigureTarget] = useState<IntegrationName | null>(null);
    const [apiKey, setApiKey] = useState("");
    const [connecting, setConnecting] = useState(false);

    const connected = integrations.filter(i => i.status === "connected");

    const handleConnect = () => {
        if (!connectTarget) return;
        setConnecting(true);
        setTimeout(() => {
            setIntegrations(prev => prev.map(i => i.name === connectTarget ? { ...i, status: "connected" } : i));
            toast.success(`${connectTarget} connected successfully`);
            setConnecting(false);
            setConnectTarget(null);
            setApiKey("");
        }, 1000);
    };

    const handleDisconnect = () => {
        if (!disconnectTarget) return;
        setIntegrations(prev => prev.map(i => i.name === disconnectTarget ? { ...i, status: "disconnected" } : i));
        toast.success(`${disconnectTarget} disconnected`);
    };

    const ecomm = integrations.filter(i => ["Shopify", "WooCommerce", "QuickBooks"].includes(i.name));
    const analytics = integrations.filter(i => ["Google Analytics 4", "Salesforce", "HubSpot"].includes(i.name));
    const workflow = integrations.filter(i => ["Slack", "Asana"].includes(i.name));

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Connected Summary */}
            <div className="p-4 border border-zinc-800 bg-zinc-900/40 rounded-sm">
                <h3 className="text-sm font-bold text-white mb-2">Connected Apps ({connected.length})</h3>
                <div className="flex flex-wrap gap-3">
                    {connected.length === 0 ? (
                        <span className="text-xs text-zinc-500 font-mono">No integrations connected yet.</span>
                    ) : connected.map(i => (
                        <div key={i.name} className="flex items-center gap-2 px-3 py-1.5 bg-[#a3e635]/10 border border-[#a3e635]/20 rounded-full">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#a3e635]" />
                            <span className="text-[10px] font-bold text-[#a3e635] uppercase">{i.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            <IntegrationGroup title="E-Commerce & Payments" items={ecomm} onConnect={setConnectTarget} onDisconnect={setDisconnectTarget} onConfigure={setConfigureTarget} />
            <IntegrationGroup title="Analytics & CRM" items={analytics} onConnect={setConnectTarget} onDisconnect={setDisconnectTarget} onConfigure={setConfigureTarget} />

            {/* Connect Modal */}
            {connectTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => { setConnectTarget(null); setApiKey(""); }} />
                    <div className="relative z-10 w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-sm shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
                            <div>
                                <h3 className="text-sm font-bold text-white font-display uppercase tracking-wide">Connect {connectTarget}</h3>
                                <p className="text-[10px] text-zinc-500 font-mono mt-0.5">{DESCRIPTIONS[connectTarget]}</p>
                            </div>
                            <button onClick={() => { setConnectTarget(null); setApiKey(""); }} className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-sm transition-colors"><X className="w-4 h-4" /></button>
                        </div>
                        <div className="px-6 py-5 space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-mono text-zinc-400 uppercase">API Key / Access Token</label>
                                <input
                                    autoFocus
                                    value={apiKey}
                                    onChange={e => setApiKey(e.target.value)}
                                    placeholder={`Paste your ${connectTarget} API key`}
                                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-sm px-4 py-2.5 text-xs text-white font-mono placeholder:text-zinc-700 outline-none focus:border-[#a3e635]/50 transition-all"
                                />
                            </div>
                            <a href="#" className="flex items-center gap-1 text-[10px] text-[#a3e635] hover:underline font-mono">
                                <ExternalLink className="w-3 h-3" /> Where to find your API key →
                            </a>
                        </div>
                        <div className="flex gap-3 px-6 py-4 border-t border-zinc-800">
                            <button onClick={() => { setConnectTarget(null); setApiKey(""); }} className="flex-1 py-2 border border-zinc-700 text-zinc-400 hover:text-white text-xs uppercase font-mono rounded-sm transition-colors">Cancel</button>
                            <button
                                onClick={handleConnect}
                                disabled={!apiKey.trim() || connecting}
                                className="flex-1 py-2 bg-[#a3e635] text-black font-bold text-xs uppercase rounded-sm hover:bg-[#b0f545] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                {connecting ? "Connecting..." : "Connect"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Configure Modal */}
            {configureTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setConfigureTarget(null)} />
                    <div className="relative z-10 w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-sm shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
                            <h3 className="text-sm font-bold text-white font-display uppercase tracking-wide">Configure {configureTarget}</h3>
                            <button onClick={() => setConfigureTarget(null)} className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-sm transition-colors"><X className="w-4 h-4" /></button>
                        </div>
                        <div className="px-6 py-5 space-y-4">
                            <div className="flex items-center gap-2 p-3 bg-[#a3e635]/5 border border-[#a3e635]/20 rounded-sm">
                                <CheckCircle2 className="w-4 h-4 text-[#a3e635]" />
                                <span className="text-xs text-[#a3e635] font-mono">Connected and active</span>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 border border-zinc-800 rounded-sm">
                                    <span className="text-xs text-zinc-300 font-mono">Sync frequency</span>
                                    <select className="bg-zinc-900 border border-zinc-700 text-xs text-zinc-400 font-mono px-2 py-1 rounded-sm outline-none">
                                        <option>Every 15 min</option>
                                        <option>Every hour</option>
                                        <option>Daily</option>
                                    </select>
                                </div>
                                <div className="flex items-center justify-between p-3 border border-zinc-800 rounded-sm">
                                    <span className="text-xs text-zinc-300 font-mono">Webhooks</span>
                                    <span className="text-[10px] text-[#a3e635] font-mono">ACTIVE</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3 px-6 py-4 border-t border-zinc-800">
                            <button onClick={() => { setDisconnectTarget(configureTarget); setConfigureTarget(null); }} className="flex items-center gap-1.5 px-4 py-2 border border-red-900/40 text-red-500 text-xs font-mono rounded-sm hover:bg-red-950/20 transition-colors">
                                <Trash2 className="w-3.5 h-3.5" /> Disconnect
                            </button>
                            <button onClick={() => { toast.success(`${configureTarget} settings saved`); setConfigureTarget(null); }} className="flex-1 py-2 bg-[#a3e635] text-black font-bold text-xs uppercase rounded-sm hover:bg-[#b0f545] transition-colors">Save Settings</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Disconnect Confirm */}
            <ConfirmModal
                open={!!disconnectTarget}
                onClose={() => setDisconnectTarget(null)}
                onConfirm={handleDisconnect}
                title={`Disconnect ${disconnectTarget}`}
                description={`Removing this integration will stop all data syncs. Your existing data won't be deleted.`}
                confirmLabel="Disconnect"
                variant="danger"
            />
        </div>
    );
}

function IntegrationGroup({ title, items, onConnect, onDisconnect, onConfigure }: {
    title: string;
    items: IntegrationState[];
    onConnect: (n: IntegrationName) => void;
    onDisconnect: (n: IntegrationName) => void;
    onConfigure: (n: IntegrationName) => void;
}) {
    return (
        <SettingsSection title={title}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {items.map(i => {
                    const Icon = ICONS[i.name];
                    const isConnected = i.status === "connected";
                    return (
                        <div key={i.name} className="flex items-center justify-between p-4 border border-white/5 bg-white/[0.02] rounded-sm hover:border-white/10 transition-colors group">
                            <div className="flex items-center gap-4">
                                <div className={cn("w-10 h-10 rounded-sm flex items-center justify-center border", isConnected ? "bg-white border-white text-black" : "bg-zinc-900 border-zinc-800 text-zinc-500")}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <div className="text-sm font-bold text-white leading-none">{i.name}</div>
                                        {isConnected && <CheckCircle2 className="w-3 h-3 text-[#a3e635]" />}
                                    </div>
                                    <div className="text-[11px] text-zinc-500 font-mono mt-1">{DESCRIPTIONS[i.name]}</div>
                                </div>
                            </div>
                            <button
                                onClick={() => isConnected ? onConfigure(i.name) : onConnect(i.name)}
                                className={cn("px-4 py-2 text-[10px] font-bold uppercase tracking-wider border transition-all shrink-0", isConnected ? "border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500" : "bg-[#a3e635] border-[#a3e635] text-black hover:bg-[#b0f545]")}
                            >
                                {isConnected ? "Configure" : "Connect"}
                            </button>
                        </div>
                    );
                })}
            </div>
        </SettingsSection>
    );
}
