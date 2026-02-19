import { ReactNode } from "react";

interface GlassTechCardProps {
    children: ReactNode;
    title?: string;
    description?: string;
    className?: string;
}

export function GlassTechCard({ children, title, description, className = "" }: GlassTechCardProps) {
    return (
        <div className={`relative group border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden flex flex-col transition-[border-color,box-shadow] duration-300 hover:border-white/20 hover:shadow-2xl hover:shadow-black/50 ${className}`}>

            {/* Holographic Noise & Gradient */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>

            {/* Tech Header */}
            {(title || description) && (
                <div className="flex items-start justify-between p-5 border-b border-white/5 relative z-10 bg-black/20">
                    <div>
                        {title && <h3 className="text-sm font-bold text-white uppercase tracking-widest font-display">{title}</h3>}
                        {description && <p className="text-[10px] text-zinc-500 font-mono mt-1">{description}</p>}
                    </div>
                    {/* Status Light */}
                    <div className="flex gap-1">
                        <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                        <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                        <div className="w-1 h-1 bg-[#a3e635] rounded-full shadow-[0_0_5px_#a3e635]"></div>
                    </div>
                </div>
            )}

            {/* Content */}
            <div className="flex-1 p-5 relative z-10 overflow-hidden">
                {children}
            </div>
        </div>
    );
}
