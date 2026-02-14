import { ReactNode } from "react";

interface GlassTechCardProps {
    children: ReactNode;
    title?: string;
    description?: string;
    className?: string;
}

export function GlassTechCard({ children, title, description, className = "" }: GlassTechCardProps) {
    return (
        <div className={`relative group border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden flex flex-col ${className}`}>

            {/* 1. Industrial Corner Markers */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/40"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/40"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/40"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/40"></div>

            {/* 2. Holographic Noise & Gradient */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>

            {/* 3. Tech Header (Optional) */}
            {(title || description) && (
                <div className="flex items-start justify-between p-5 border-b border-white/5 relative z-10 bg-black/20">
                    <div>
                        {title && <h3 className="text-sm font-bold text-white uppercase tracking-widest font-display">{title}</h3>}
                        {description && <p className="text-[10px] text-zinc-500 font-mono mt-1">{description}</p>}
                    </div>
                    {/* Decorative Status Light */}
                    <div className="flex gap-1">
                        <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                        <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                        <div className="w-1 h-1 bg-[#a3e635] rounded-full shadow-[0_0_5px_#a3e635]"></div>
                    </div>
                </div>
            )}

            {/* 4. Content Area */}
            <div className="flex-1 p-5 relative z-10 overflow-hidden">
                {children}
            </div>

        </div>
    );
}
