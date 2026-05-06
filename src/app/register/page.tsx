"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();

    useEffect(() => {
        // Mock a redirect from the waitlist/invite email
        // We assume they clicked a link like: /onboarding?role=creator&email=newcreator@example.com&name=Alex
        router.push("/onboarding?role=creator&email=newcreator@example.com&name=Alex");
    }, [router]);

    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-zinc-700 border-t-[#a3e635] rounded-full animate-spin" />
        </div>
    );
}

