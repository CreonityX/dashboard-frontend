import { UploadCloud, FileType, CheckSquare } from "lucide-react";
import { GlassTechCard } from "../GlassTechCard";

export function MediaUpload() {
    return (
        <GlassTechCard title="Asset_Ingest" description="DRAG_DROP_ZONE" className="h-full">

            {/* Drop Zone */}
            <div className="flex-1 border border-dashed border-white/20 bg-white/5 flex flex-col items-center justify-center p-4 transition-colors hover:border-[#a3e635]/50 hover:bg-[#a3e635]/5 cursor-pointer group mb-4 relative rounded-sm">
                <UploadCloud className="w-8 h-8 text-zinc-500 group-hover:text-[#a3e635] transition-colors mb-2" />
                <p className="text-xs font-bold text-white font-mono uppercase">Upload_File</p>
            </div>

            {/* Compact File List */}
            <div className="space-y-2">
                {/* Active Upload */}
                <div className="flex items-center gap-3 p-2 border border-white/5 bg-black/40">
                    <div className="w-6 h-6 flex items-center justify-center bg-white/5 rounded-sm">
                        <FileType className="w-3 h-3 text-zinc-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between text-[10px] font-mono text-zinc-400 mb-1">
                            <span>HERO_BANNER.PNG</span>
                            <span className="text-white">75%</span>
                        </div>
                        <div className="h-0.5 w-full bg-zinc-800">
                            <div className="h-full w-[75%] bg-[#a3e635] shadow-[0_0_5px_#a3e635]"></div>
                        </div>
                    </div>
                </div>

                {/* Completed */}
                <div className="flex items-center gap-3 p-2 border border-white/5 bg-black/20 opacity-60">
                    <div className="w-6 h-6 flex items-center justify-center bg-white/5 rounded-sm">
                        <CheckSquare className="w-3 h-3 text-[#a3e635]" />
                    </div>
                    <div className="text-[10px] font-mono text-zinc-500 truncate">LOGO_MARK.SVG</div>
                </div>
            </div>

        </GlassTechCard>
    );
}
