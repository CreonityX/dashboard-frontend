"use client";

import { ReactNode } from "react";

interface HomeShellProps {
    children?: ReactNode;
}

export function HomeShell({ children }: HomeShellProps) {
    return (
        <div className="flex flex-col lg:flex-row h-full w-full overflow-hidden relative">
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto custom-scrollbar relative backdrop-blur-md flex flex-col lg:order-1">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none z-0" />

                    <div className="flex-1 p-4 lg:p-6 space-y-6 relative z-10 max-w-6xl mx-auto w-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
