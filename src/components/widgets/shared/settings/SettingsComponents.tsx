"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SettingsSectionProps {
    title: string;
    description?: string;
    children: ReactNode;
    className?: string;
}

export function SettingsSection({ title, description, children, className }: SettingsSectionProps) {
    return (
        <div className={cn("space-y-4 pb-8 border-b border-white/5 last:border-0", className)}>
            <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">{title}</h3>
                {description && <p className="text-[11px] text-zinc-500 font-mono mt-1">{description}</p>}
            </div>
            <div className="space-y-4">
                {children}
            </div>
        </div>
    );
}

interface InputGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    helperText?: string;
    error?: string;
    action?: ReactNode;
}

export function InputGroup({ label, helperText, error, className, action, ...props }: InputGroupProps) {
    return (
        <div className={cn("space-y-2", className)}>
            <div className="flex justify-between">
                <label className="text-xs font-mono text-zinc-400 font-medium uppercase">{label}</label>
                {action}
            </div>
            <input
                className={cn(
                    "w-full bg-zinc-900/50 border border-zinc-800 rounded-sm px-4 py-2.5 text-xs text-white font-mono placeholder:text-zinc-700 outline-none transition-all duration-200 focus:border-[#a3e635]/50 focus:bg-zinc-900 focus:shadow-[0_0_10px_rgba(163,230,53,0.1)]",
                    error ? "border-red-500 text-red-400" : ""
                )}
                {...props}
            />
            {helperText && <p className="text-[10px] text-zinc-600 font-mono">{helperText}</p>}
            {error && <p className="text-[10px] text-red-500 font-mono">{error}</p>}
        </div>
    );
}

interface ToggleGroupProps {
    label: string;
    description?: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}

export function ToggleGroup({ label, description, checked, onChange }: ToggleGroupProps) {
    return (
        <div className="flex items-center justify-between p-3 border border-white/5 bg-white/[0.02] rounded-sm hover:border-white/10 transition-colors">
            <div>
                <div className="text-xs font-bold text-zinc-300 font-mono">{label}</div>
                {description && <div className="text-[10px] text-zinc-600 font-mono mt-0.5">{description}</div>}
            </div>
            <button
                onClick={() => onChange(!checked)}
                className={cn(
                    "w-10 h-5 rounded-full relative transition-all duration-300 flex items-center shadow-inner",
                    checked ? "bg-[#a3e635]/20" : "bg-zinc-800"
                )}
            >
                <div className={cn(
                    "w-3 h-3 rounded-full absolute transition-all duration-300 shadow-md",
                    checked ? "bg-[#a3e635] translate-x-6 left-[-1px]" : "bg-zinc-500 translate-x-1 left-[1px]"
                )} />
            </button>
        </div>
    );
}

interface SelectGroupProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    options: { label: string; value: string }[];
}

export function SelectGroup({ label, options, className, ...props }: SelectGroupProps) {
    return (
        <div className={cn("space-y-2", className)}>
            <label className="text-xs font-mono text-zinc-400 font-medium uppercase">{label}</label>
            <div className="relative">
                <select
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-sm px-4 py-2.5 text-xs text-white font-mono outline-none appearance-none cursor-pointer hover:border-zinc-700 focus:border-[#a3e635]/50 transition-all"
                    {...props}
                >
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-600 text-[10px]">▼</div>
            </div>
        </div>
    );
}
