"use client";

import { useState, ReactNode } from "react";
import { User, Shield, CreditCard, Bell, Lock, Workflow, LifeBuoy, AlertTriangle, Monitor, Banknote } from "lucide-react";
import { cn } from "@/lib/utils";

interface SettingsShellProps {
    children?: ReactNode; // Optional if we route internally, but for now we might swap components locally
}

{/* Define Tabs */ }
const SETTINGS_TABS = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'payment', label: 'Payout Methods', icon: Banknote },
    { id: 'billing', label: 'Subscription & Billing', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Preferences', icon: Monitor },
    { id: 'privacy', label: 'Privacy & Data', icon: Lock },
    { id: 'integrations', label: 'Integrations', icon: Workflow },
    { id: 'support', label: 'Help & Support', icon: LifeBuoy },
    { id: 'danger', label: 'Account Management', icon: AlertTriangle, variant: 'danger' },
];

export function SettingsShell({ activeTab, onTabChange, children }: { activeTab: string, onTabChange: (id: string) => void, children: ReactNode }) {

    return (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-140px)] gap-6 overflow-hidden">
            {/* Sidebar Navigation */}
            <aside className="w-full lg:w-64 flex-shrink-0 bg-zinc-900/20 border border-white/5 rounded-lg overflow-y-auto">
                <div className="p-4 border-b border-white/5">
                    <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-widest font-mono">System_Settings</h2>
                </div>
                <nav className="p-2 space-y-1">
                    {SETTINGS_TABS.map((tab) => {
                        const isActive = activeTab === tab.id;
                        const isDanger = tab.variant === 'danger';
                        return (
                            <button
                                key={tab.id}
                                onClick={() => onTabChange(tab.id)}
                                className={cn(
                                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-sm transition-all duration-200 text-left group",
                                    isActive
                                        ? "bg-white/5 text-white shadow-sm"
                                        : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.02]",
                                    isDanger && !isActive && "text-red-900/50 hover:text-red-500 hover:bg-red-950/20",
                                    isDanger && isActive && "bg-red-950/20 text-red-500 border border-red-900/20"
                                )}
                            >
                                <tab.icon className={cn(
                                    "w-4 h-4 transition-colors",
                                    isActive ? (isDanger ? "text-red-500" : "text-[#a3e635]") : "text-zinc-600 group-hover:text-zinc-400",
                                    isDanger && !isActive && "text-red-900/50 group-hover:text-red-500"
                                )} />
                                <span className="text-xs font-mono font-medium">{tab.label}</span>
                                {isActive && !isDanger && (
                                    <div className="ml-auto w-1 h-1 rounded-full bg-[#a3e635] shadow-[0_0_4px_#a3e635]" />
                                )}
                            </button>
                        );
                    })}
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 bg-zinc-900/20 border border-white/5 rounded-lg overflow-hidden flex flex-col relative">
                {/* Header Decoration */}
                <div className="absolute top-0 right-0 p-4 pointer-events-none">
                    <div className="flex gap-1">
                        <div className="w-1 h-1 bg-zinc-800 rounded-full" />
                        <div className="w-1 h-1 bg-zinc-800 rounded-full" />
                        <div className="w-1 h-1 bg-zinc-800 rounded-full" />
                    </div>
                </div>

                {/* Live Content */}
                <div className="flex-1 overflow-y-auto p-6 lg:p-10 custom-scrollbar relative z-10">
                    {children}
                </div>

                {/* Bottom Status Bar */}
                <div className="h-6 border-t border-white/5 bg-black/20 flex items-center px-4 justify-between text-[10px] text-zinc-600 font-mono select-none">
                    <span>MODULE_ID: {activeTab.toUpperCase()}</span>
                    <span>STATUS: READY</span>
                </div>
            </main>
        </div>
    );
}
