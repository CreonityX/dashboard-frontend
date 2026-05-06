"use client";

import { Suspense } from "react";
import { useUser } from "@/lib/UserContext";

// Creator Imports
import { MessagesShell as CreatorMessagesShell } from "@/components/widgets/shared/messages/MessagesShell";

// Brand Imports
import { MessagesShell as BrandMessagesShell } from "@/components/widgets/shared/messages/BrandMessagesShell";

export default function MessagesPage() {
    const { isBrand } = useUser();
    return (
        <div className="h-full">
            <Suspense fallback={<div className="h-full w-full bg-zinc-900/40" />}>
                {isBrand ? <BrandMessagesShell /> : <CreatorMessagesShell />}
            </Suspense>
        </div>
    );
}
