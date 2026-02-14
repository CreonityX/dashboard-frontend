"use client";

import { CloudUpload, FileType, CheckCircle2, RotateCw } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function UploadNexus() {
    const [isDragging, setIsDragging] = useState(false);

    return (
        <div className="h-full flex flex-col p-6 bg-black/20">
            {/* Drop Zone */}
            <div
                className={cn(
                    "flex-1 border-2 border-dashed rounded-sm transition-colors flex flex-col items-center justify-center gap-4 relative overflow-hidden group mb-6",
                    isDragging ? "border-[#a3e635] bg-[#a3e635]/5" : "border-zinc-800 hover:border-zinc-600 bg-zinc-900/50"
                )}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
            >
                <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative z-10">
                    <CloudUpload className="w-8 h-8 text-zinc-500 group-hover:text-[#a3e635] transition-colors" />
                </div>
                <div className="text-center relative z-10">
                    <p className="font-bold text-white text-sm mb-1">DRAG_MEDIA_HERE</p>
                    <p className="font-mono text-[10px] text-zinc-500">MP4, MOV, PNG (MAX 2GB)</p>
                </div>

                {/* Scanline Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#a3e635]/10 to-transparent h-full w-full -translate-y-full group-hover:translate-y-full transition-transform duration-1000 ease-in-out pointer-events-none" />
            </div>

            {/* Recent Uploads List */}
            <div className="space-y-3">
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest px-1">Recent_Processing</div>

                {/* Item 1: Processing */}
                <div className="flex items-center gap-3 p-3 bg-zinc-900/50 border border-zinc-800 rounded-sm">
                    <div className="w-8 h-8 bg-zinc-800 flex items-center justify-center rounded-sm">
                        <FileType className="w-4 h-4 text-zinc-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-white truncate">project_titan_v4.mp4</div>
                        <div className="text-[10px] font-mono text-zinc-500 flex items-center gap-2">
                            <RotateCw className="w-3 h-3 animate-spin text-amber-500" />
                            PROCESSING...
                        </div>
                    </div>
                    <div className="font-mono text-xs text-zinc-400">45%</div>
                </div>

                {/* Item 2: Complete */}
                <div className="flex items-center gap-3 p-3 bg-zinc-900/50 border border-zinc-800 rounded-sm group hover:border-zinc-700 transition-colors">
                    <div className="w-8 h-8 bg-zinc-800 flex items-center justify-center rounded-sm">
                        <FileType className="w-4 h-4 text-zinc-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-white truncate">brand_assets_finals.zip</div>
                        <div className="text-[10px] font-mono text-zinc-500 flex items-center gap-2">
                            <CheckCircle2 className="w-3 h-3 text-[#a3e635]" />
                            COMPLETE
                        </div>
                    </div>
                    <div className="font-mono text-xs text-zinc-600">2.4GB</div>
                </div>
            </div>
        </div>
    );
}
