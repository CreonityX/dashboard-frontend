"use client";

import { SettingsSection, SelectGroup, ToggleGroup } from "../SettingsComponents";
import { Monitor, Moon, Sun } from "lucide-react";

export function PreferenceSettings() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Theme */}
            <SettingsSection title="Theme & Display">
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <ThemeCard label="Light" icon={Sun} active={false} />
                    <ThemeCard label="Dark" icon={Moon} active={false} />
                    <ThemeCard label="System" icon={Monitor} active={true} />
                </div>
                <div className="space-y-2">
                    <ToggleGroup label="Holographic Effects" description="Enable glassmorphism and ambient glow." checked={true} onChange={() => { }} />
                    <ToggleGroup label="Reduced Motion" description="Minimize animations for performance." checked={false} onChange={() => { }} />
                </div>
            </SettingsSection>

            {/* Localization */}
            <SettingsSection title="Localization">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SelectGroup
                        label="Interface Language"
                        options={[
                            { label: 'English (US)', value: 'en-us' },
                            { label: 'Japanese', value: 'ja' },
                            { label: 'Spanish', value: 'es' }
                        ]}
                    />
                    <SelectGroup
                        label="Date Format"
                        options={[
                            { label: 'MM/DD/YYYY', value: 'mdy' },
                            { label: 'DD/MM/YYYY', value: 'dmy' },
                            { label: 'YYYY-MM-DD', value: 'ymd' }
                        ]}
                    />
                </div>
            </SettingsSection>
        </div>
    );
}

function ThemeCard({ label, icon: Icon, active }: { label: string, icon: any, active: boolean }) {
    return (
        <button className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition-all ${active ? "border-[#a3e635] bg-[#a3e635]/10 text-white" : "border-zinc-800 bg-zinc-900/40 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300"}`}>
            <Icon className="w-6 h-6" />
            <span className="text-xs font-mono uppercase">{label}</span>
        </button>
    )
}
