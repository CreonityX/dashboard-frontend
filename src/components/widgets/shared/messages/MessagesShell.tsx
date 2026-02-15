"use client";

import { useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Edit } from "lucide-react";
import { ConversationListPanel } from "./panels/ConversationListPanel";
import { ThreadPanel } from "./panels/ThreadPanel";
import { DetailsPanel } from "./panels/DetailsPanel";

export function MessagesShell() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const selectedConversationId = searchParams.get('conversation');
    const [showDetails, setShowDetails] = useState(true);

    const toggleDetails = () => setShowDetails(!showDetails);

    const handleSelect = (id: string | null) => {
        if (id) {
            router.push(`/messages?conversation=${id}`);
        } else {
            router.push('/messages');
        }
    };

    return (
        <div className="flex h-full w-full relative overflow-hidden backdrop-blur-md">
            {/* Thread List Panel */}
            <div className="w-80 border-r border-zinc-800 flex flex-col bg-zinc-900/20">

                <ConversationListPanel
                    selectedId={selectedConversationId}
                    onSelect={handleSelect}
                />
            </div>

            {/* Center Panel: Thread */}
            <div className={cn(
                "flex-1 flex flex-col bg-zinc-900/20 transition-all",
                !selectedConversationId ? "hidden md:flex" : "flex"
            )}>
                <ThreadPanel
                    conversationId={selectedConversationId}
                    onBack={() => handleSelect(null)}
                    onToggleDetails={toggleDetails}
                    showDetails={showDetails}
                />
            </div>

            {/* Right Panel: Details */}
            {selectedConversationId && showDetails && (
                <DetailsPanel
                    conversationId={selectedConversationId}
                    onClose={() => setShowDetails(false)}
                />
            )}
        </div>
    );
}
