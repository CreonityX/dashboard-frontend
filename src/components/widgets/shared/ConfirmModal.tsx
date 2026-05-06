"use client";

import { ReactNode } from "react";
import { AlertTriangle, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConfirmModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: "danger" | "default";
    children?: ReactNode;
}

export function ConfirmModal({
    open, onClose, onConfirm, title, description,
    confirmLabel = "Confirm", cancelLabel = "Cancel",
    variant = "default", children
}: ConfirmModalProps) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
            <div className="relative z-10 w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-sm shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-start justify-between px-6 pt-5 pb-4 border-b border-zinc-800">
                    <div className="flex items-start gap-3">
                        {variant === "danger" && (
                            <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        )}
                        <div>
                            <h3 className="text-sm font-bold text-white font-display uppercase tracking-wide">{title}</h3>
                            <p className="text-xs text-zinc-500 font-mono mt-1 leading-relaxed">{description}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-sm transition-colors ml-4 shrink-0">
                        <X className="w-4 h-4" />
                    </button>
                </div>
                {children && (
                    <div className="px-6 py-4">{children}</div>
                )}
                <div className={cn("flex items-center justify-end gap-3 px-6 py-4", !children && "border-t border-zinc-800")}>
                    <button onClick={onClose} className="px-5 py-2 border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors text-xs uppercase font-mono rounded-sm">
                        {cancelLabel}
                    </button>
                    <button
                        onClick={() => { onConfirm(); onClose(); }}
                        className={cn(
                            "px-5 py-2 text-xs font-bold uppercase font-mono rounded-sm transition-colors",
                            variant === "danger"
                                ? "bg-red-600 text-white hover:bg-red-500"
                                : "bg-[#a3e635] text-black hover:bg-[#b0f545] shadow-[0_0_12px_rgba(163,230,53,0.2)]"
                        )}
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}
