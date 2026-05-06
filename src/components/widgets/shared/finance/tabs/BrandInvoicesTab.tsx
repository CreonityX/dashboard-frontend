"use client";

import { useState } from "react";
import { FileText, Download, Mail, ExternalLink, X, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const INVOICES = [
    { id: 'INV-2026-001', creator: 'Tech_Nomad', campaign: 'S26 Launch', amount: 8500, date: 'Feb 12', status: 'Paid' },
    { id: 'INV-2026-002', creator: 'Sarah_Vfx', campaign: 'S26 Launch', amount: 6500, date: 'Feb 10', status: 'Paid' },
    { id: 'INV-2026-003', creator: 'Pixel_Artisan', campaign: 'Spring Ad Set', amount: 4200, date: 'Feb 08', status: 'Pending' },
];

export function InvoicesTab() {
    const [emailTarget, setEmailTarget] = useState<string | null>(null);
    const [emailAddress, setEmailAddress] = useState("");
    const [connectTarget, setConnectTarget] = useState<"QuickBooks" | "Xero" | null>(null);
    const [apiKey, setApiKey] = useState("");
    const [connected, setConnected] = useState<Set<string>>(new Set());

    const emailInvoice = INVOICES.find(i => i.id === emailTarget);

    const handleDownload = (inv: typeof INVOICES[0]) => {
        toast.success(`Downloading ${inv.id}`, { description: `${inv.creator} — ${inv.campaign}` });
    };

    const handleSendEmail = () => {
        if (!emailAddress.trim() || !emailAddress.includes("@")) {
            toast.error("Enter a valid email address.");
            return;
        }
        toast.success(`Invoice sent to ${emailAddress}`, { description: `${emailInvoice?.id} — $${emailInvoice?.amount.toLocaleString()}` });
        setEmailTarget(null);
        setEmailAddress("");
    };

    const handleConnect = () => {
        if (!apiKey.trim()) {
            toast.error("Enter your API key.");
            return;
        }
        setConnected(prev => new Set([...prev, connectTarget!]));
        toast.success(`${connectTarget} connected successfully`);
        setConnectTarget(null);
        setApiKey("");
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xs font-bold text-zinc-500 font-display tracking-widest uppercase">Auto_Generated_Invoices_Per_Payment</h2>

            {/* Invoices Table */}
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-sm overflow-hidden">
                <div className="divide-y divide-zinc-800">
                    <div className="grid grid-cols-12 px-4 py-3 bg-zinc-950/30 text-[9px] font-mono text-zinc-500 uppercase">
                        <div className="col-span-2">Invoice #</div>
                        <div className="col-span-2">Creator</div>
                        <div className="col-span-2">Campaign</div>
                        <div className="col-span-2">Date</div>
                        <div className="col-span-1 text-right">Amount</div>
                        <div className="col-span-1 text-center">Status</div>
                        <div className="col-span-2 text-right">Actions</div>
                    </div>
                    {INVOICES.map(inv => (
                        <div key={inv.id} className="grid grid-cols-12 px-4 py-4 items-center hover:bg-zinc-800/20 group">
                            <div className="col-span-2 text-xs font-mono text-zinc-400">{inv.id}</div>
                            <div className="col-span-2 text-xs font-bold text-white">{inv.creator}</div>
                            <div className="col-span-2 text-xs text-zinc-500 font-mono">{inv.campaign}</div>
                            <div className="col-span-2 text-xs text-zinc-500 font-mono">{inv.date}</div>
                            <div className="col-span-1 text-right text-xs font-bold text-[#a3e635] font-mono">${inv.amount.toLocaleString()}</div>
                            <div className="col-span-1 text-center">
                                <span className={cn(
                                    "text-[9px] font-mono px-2 py-0.5 rounded-sm",
                                    inv.status === 'Paid' ? "bg-[#a3e635]/10 text-[#a3e635]" : "bg-yellow-500/10 text-yellow-500"
                                )}>{inv.status}</span>
                            </div>
                            <div className="col-span-2 flex justify-end gap-1">
                                <button
                                    onClick={() => setEmailTarget(inv.id)}
                                    className="p-2 hover:bg-zinc-800 rounded-sm text-zinc-500 hover:text-white transition-colors"
                                    title="Email Invoice"
                                >
                                    <Mail className="w-3.5 h-3.5" />
                                </button>
                                <button
                                    onClick={() => handleDownload(inv)}
                                    className="p-2 hover:bg-zinc-800 rounded-sm text-zinc-500 hover:text-[#a3e635] transition-colors"
                                    title="Download PDF"
                                >
                                    <Download className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Accounting Integration */}
            <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-sm">
                <h3 className="text-xs font-bold text-zinc-400 font-display tracking-widest uppercase mb-4 flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 text-[#a3e635]" /> Accounting_Software_Integration
                </h3>
                <div className="flex flex-wrap gap-4">
                    {(["QuickBooks", "Xero"] as const).map(name => (
                        <button
                            key={name}
                            onClick={() => connected.has(name) ? toast(`${name} is already connected`) : setConnectTarget(name)}
                            className={cn(
                                "flex items-center gap-3 p-4 border rounded-sm transition-colors w-48",
                                connected.has(name)
                                    ? "bg-[#a3e635]/5 border-[#a3e635]/20 cursor-default"
                                    : "bg-zinc-950/50 border-zinc-800 hover:border-[#a3e635]/30 cursor-pointer"
                            )}
                        >
                            <div className="w-10 h-10 bg-zinc-800 rounded-sm flex items-center justify-center text-zinc-500 font-bold text-xs">
                                {name === "QuickBooks" ? "QB" : "X"}
                            </div>
                            <div>
                                <div className="text-xs font-bold text-white">{name}</div>
                                <div className={cn("text-[10px] font-mono", connected.has(name) ? "text-[#a3e635]" : "text-zinc-500")}>
                                    {connected.has(name) ? "Connected" : "Connect"}
                                </div>
                            </div>
                            {connected.has(name) && <CheckCircle2 className="w-3.5 h-3.5 text-[#a3e635] ml-auto" />}
                        </button>
                    ))}
                </div>
            </div>

            {/* Email Modal */}
            {emailTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => { setEmailTarget(null); setEmailAddress(""); }} />
                    <div className="relative z-10 w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-sm shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
                            <div>
                                <h3 className="text-sm font-bold text-white font-display uppercase">Email Invoice</h3>
                                <p className="text-[10px] text-zinc-500 font-mono mt-0.5">{emailTarget} — ${emailInvoice?.amount.toLocaleString()}</p>
                            </div>
                            <button onClick={() => { setEmailTarget(null); setEmailAddress(""); }} className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-sm">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="px-6 py-5 space-y-3">
                            <label className="text-[10px] font-mono text-zinc-500 uppercase">Recipient Email</label>
                            <input
                                autoFocus
                                type="email"
                                value={emailAddress}
                                onChange={e => setEmailAddress(e.target.value)}
                                onKeyDown={e => e.key === "Enter" && handleSendEmail()}
                                placeholder="recipient@example.com"
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-sm px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#a3e635]/50"
                            />
                        </div>
                        <div className="flex gap-3 px-6 py-4 border-t border-zinc-800">
                            <button onClick={() => { setEmailTarget(null); setEmailAddress(""); }} className="flex-1 py-2 border border-zinc-700 text-zinc-400 text-xs uppercase font-mono rounded-sm transition-colors">Cancel</button>
                            <button
                                onClick={handleSendEmail}
                                disabled={!emailAddress.trim()}
                                className="flex-1 py-2 bg-[#a3e635] text-black font-bold text-xs uppercase rounded-sm hover:bg-[#bef264] disabled:opacity-40 transition-colors flex items-center justify-center gap-2"
                            >
                                <Mail className="w-3.5 h-3.5" /> Send
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Connect Accounting Modal */}
            {connectTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => { setConnectTarget(null); setApiKey(""); }} />
                    <div className="relative z-10 w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-sm shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
                            <h3 className="text-sm font-bold text-white font-display uppercase">Connect {connectTarget}</h3>
                            <button onClick={() => { setConnectTarget(null); setApiKey(""); }} className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-sm">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="px-6 py-5 space-y-3">
                            <label className="text-[10px] font-mono text-zinc-500 uppercase">API Key</label>
                            <input
                                autoFocus
                                type="text"
                                value={apiKey}
                                onChange={e => setApiKey(e.target.value)}
                                onKeyDown={e => e.key === "Enter" && handleConnect()}
                                placeholder={`Paste your ${connectTarget} API key`}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-sm px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#a3e635]/50"
                            />
                        </div>
                        <div className="flex gap-3 px-6 py-4 border-t border-zinc-800">
                            <button onClick={() => { setConnectTarget(null); setApiKey(""); }} className="flex-1 py-2 border border-zinc-700 text-zinc-400 text-xs uppercase font-mono rounded-sm transition-colors">Cancel</button>
                            <button
                                onClick={handleConnect}
                                disabled={!apiKey.trim()}
                                className="flex-1 py-2 bg-[#a3e635] text-black font-bold text-xs uppercase rounded-sm hover:bg-[#bef264] disabled:opacity-40 transition-colors"
                            >
                                Connect
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
