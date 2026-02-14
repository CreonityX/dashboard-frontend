import { Suspense } from "react";
import { MessagesShell } from "@/components/widgets/shared/messages/MessagesShell";

export default function MessagesPage() {
    return (
        <div className="h-full">
            <Suspense fallback={<div className="h-full w-full bg-zinc-900/40" />}>
                <MessagesShell />
            </Suspense>
        </div>
    );
}
