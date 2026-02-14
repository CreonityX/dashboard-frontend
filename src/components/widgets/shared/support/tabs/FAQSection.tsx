"use client";

import { SupportSection, FAQAccordion } from "@/components/widgets/shared/support/SupportComponents";
import { Search } from "lucide-react";

export function FAQSection() {
    return (
        <div className="max-w-3xl mx-auto pb-20 animate-in fade-in zoom-in-95 duration-500 space-y-8">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                    type="text"
                    placeholder="Search FAQs..."
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-sm py-2.5 pl-9 pr-4 text-sm text-white focus:border-[#a3e635]/50 focus:outline-none transition-all placeholder:text-zinc-600 font-mono"
                />
            </div>

            <SupportSection title="Payments & Earnings">
                <FAQAccordion
                    question="When do I get paid?"
                    answer="Payouts are processed every Friday for withdrawal requests made before Wednesday 12:00 PM UTC. Funds usually arrive in your bank account within 2-3 business days."
                />
                <FAQAccordion
                    question="What are the platform fees?"
                    answer="We charge a flat 10% service fee on all completed gigs. For 'Pro' subscribers, this fee is reduced to 5%."
                />
                <FAQAccordion
                    question="Can I receive payments in crypto?"
                    answer="Yes, we support USDC and BTC withdrawals for verified accounts. Minimum withdrawal amount is $50 equivalent."
                />
            </SupportSection>

            <SupportSection title="Account Management">
                <FAQAccordion
                    question="How do I verify my identity?"
                    answer="Go to Profile > Verification tab and upload a government-issued ID. Verification typically takes less than 24 hours."
                />
                <FAQAccordion
                    question="Can I change my username?"
                    answer="Yes, you can change your username once every 30 days from the Edit Profile section. Note that this will break old profile links."
                />
            </SupportSection>
        </div>
    );
}
