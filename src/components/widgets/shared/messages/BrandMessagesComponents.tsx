"use client";

import { cn } from "@/lib/utils";

// Reusable Avatar
export function Avatar({ src, fallback, size = "md", online = false }: { src?: string, fallback: string, size?: "sm" | "md" | "lg", online?: boolean }) {
    const sizeClasses = {
        sm: "w-6 h-6 text-[10px]",
        md: "w-8 h-8 text-xs",
        lg: "w-10 h-10 text-sm"
    };

    return (
        <div className={cn("rounded-sm bg-zinc-800 flex items-center justify-center relative shrink-0 font-bold border border-zinc-700 font-mono text-zinc-400", sizeClasses[size])}>
            {src ? (
                <img src={src} alt="Avatar" className="w-full h-full rounded-sm object-cover" />
            ) : (
                <span>{fallback}</span>
            )}
            {online && (
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#a3e635] border-2 border-zinc-900 rounded-full" />
            )}
        </div>
    );
}

// Conversation Card (Sidebar Item)
export function ConversationCard({
    isActive,
    onClick,
    brand,
    message,
    time,
    unreadCount
}: {
    isActive: boolean;
    onClick: () => void;
    brand: string;
    message: string;
    time: string;
    unreadCount?: number;
}) {
    return (
        <div
            onClick={onClick}
            className={cn(
                "p-4 border-b border-zinc-800 cursor-pointer hover:bg-zinc-800/50 transition-all group relative",
                isActive ? "bg-[#a3e635]/5 border-l-2 border-l-[#a3e635]" : "border-l-2 border-l-transparent"
            )}
        >
            <div className="flex justify-between mb-1">
                <div className="flex items-center gap-2">
                    <span className={cn("font-bold text-sm tracking-tight transition-colors", isActive ? "text-white" : "text-zinc-400 group-hover:text-white")}>
                        {brand}
                    </span>
                    {unreadCount && unreadCount > 0 && (
                        <span className="bg-[#a3e635] text-black text-[9px] font-bold px-1.5 rounded-sm min-w-[16px] h-4 flex items-center justify-center font-mono">
                            {unreadCount}
                        </span>
                    )}
                </div>
                <span className={cn("text-[10px] font-mono", unreadCount ? "text-[#a3e635] font-bold" : "text-zinc-600")}>
                    {time}
                </span>
            </div>
            <p className={cn(
                "text-xs line-clamp-1 transition-colors font-sans",
                unreadCount ? "text-zinc-300 font-medium" : "text-zinc-600 group-hover:text-zinc-500"
            )}>
                {message}
            </p>
        </div>
    );
}

// Message Bubble
export function MessageBubble({
    isMe,
    text,
    time,
    isRead,
    myFallback = "BR",
    theirFallback = "CR"
}: {
    isMe: boolean;
    text: string;
    time: string;
    isRead?: boolean;
    myFallback?: string;
    theirFallback?: string;
}) {
    return (
        <div className={cn("flex gap-3 max-w-[85%] md:max-w-[75%]", isMe ? "ml-auto flex-row-reverse" : "")}>
            <Avatar fallback={isMe ? myFallback : theirFallback} size="md" />
            <div>
                <div className={cn(
                    "p-3 rounded-sm text-sm shadow-sm border font-sans",
                    isMe
                        ? "bg-[#a3e635]/10 border-[#a3e635]/20 text-zinc-100 rounded-br-none"
                        : "bg-zinc-900 border-zinc-800 text-zinc-400 rounded-bl-none"
                )}>
                    {text}
                </div>
                <div className={cn("mt-1 flex items-center gap-1 text-[10px] text-zinc-600 font-mono", isMe ? "justify-end" : "")}>
                    <span>{time}</span>
                    {isMe && isRead && <span>• R</span>}
                </div>
            </div>
        </div>
    );
}
