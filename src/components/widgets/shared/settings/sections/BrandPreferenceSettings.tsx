"use client";

import { useState } from "react";
import { SettingsSection, SelectGroup, ToggleGroup } from "../BrandSettingsComponents";
import { Monitor, Moon, Sun } from "lucide-react";
import { toast } from "sonner";

export function PreferenceSettings() {
    const [activeTheme, setActiveTheme] = useState<"Light" | "Dark" | "System">("System");
    const [holographic, setHolographic] = useState(true);
    const [reducedMotion, setReducedMotion] = useState(false);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Theme */}
            <SettingsSection title="Theme & Display">
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <ThemeCard label="Light" icon={Sun} active={activeTheme === "Light"} onClick={() => { setActiveTheme("Light"); toast.success("Theme set to Light"); }} />
                    <ThemeCard label="Dark" icon={Moon} active={activeTheme === "Dark"} onClick={() => { setActiveTheme("Dark"); toast.success("Theme set to Dark"); }} />
                    <ThemeCard label="System" icon={Monitor} active={activeTheme === "System"} onClick={() => { setActiveTheme("System"); toast.success("Theme set to System"); }} />
                </div>
                <div className="space-y-2">
                    <ToggleGroup label="Holographic Effects" description="Enable glassmorphism and ambient glow." checked={holographic} onChange={(v) => { setHolographic(v); toast.success(v ? "Holographic effects enabled" : "Holographic effects disabled"); }} />
                    <ToggleGroup label="Reduced Motion" description="Minimize animations for performance." checked={reducedMotion} onChange={(v) => { setReducedMotion(v); toast.success(v ? "Reduced motion enabled" : "Reduced motion disabled"); }} />
                </div>
            </SettingsSection>

            {/* Regional Formats */}
            <SettingsSection title="Regional Formats">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SelectGroup
                        label="Default Currency"
                        options={[
                            { label: 'USD ($)', value: 'usd' },
                            { label: 'EUR (€)', value: 'eur' },
                            { label: 'GBP (£)', value: 'gbp' },
                            { label: 'JPY (¥)', value: 'jpy' }
                        ]}
                    />
                    <SelectGroup
                        label="Language"
                        options={[
                            { label: 'English (US)', value: 'en-us' },
                            { label: 'English (UK)', value: 'en-uk' },
                            { label: 'Japanese', value: 'jp' },
                            { label: 'German', value: 'de' }
                        ]}
                    />
                    <SelectGroup
                        label="Date Format"
                        options={[
                            { label: 'MM/DD/YYYY', value: 'us' },
                            { label: 'DD/MM/YYYY', value: 'eu' },
                            { label: 'YYYY-MM-DD', value: 'iso' }
                        ]}
                    />
                    <SelectGroup
                        label="Number Format"
                        options={[
                            { label: '1,234.56', value: 'c_dot' },
                            { label: '1.234,56', value: 'd_comma' }
                        ]}
                    />
                </div>
            </SettingsSection>

            <div className="flex justify-end pt-4 border-t border-white/5">
                <button onClick={() => toast.success("Preferences saved")} className="px-6 py-2 bg-[#a3e635] text-black font-bold text-xs uppercase hover:bg-[#b5f045] transition-colors rounded-sm shadow-[0_0_10px_rgba(163,230,53,0.2)]">
                    Save_Preferences
                </button>
            </div>
        </div>
    );
}

function ThemeCard({ label, icon: Icon, active, onClick }: { label: string, icon: any, active: boolean, onClick: () => void }) {
    return (
        <button onClick={onClick} className={`p-4 border rounded-sm flex flex-col items-center gap-2 transition-all ${active ? "border-[#a3e635] bg-[#a3e635]/10 text-white" : "border-zinc-800 bg-zinc-900/40 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300"}`}>
            <Icon className="w-6 h-6" />
            <span className="text-xs font-mono uppercase">{label}</span>
        </button>
    )
}
