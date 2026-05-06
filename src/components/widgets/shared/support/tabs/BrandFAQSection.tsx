"use client";

import { SupportSection, FAQAccordion } from "@/components/widgets/shared/support/BrandSupportComponents";
import { Search } from "lucide-react";

export function FAQSection() {
    return (
        <div className="max-w-3xl mx-auto pb-20 animate-in fade-in zoom-in-95 duration-500 space-y-8">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                    type="text"
                    placeholder="Search FAQs..."
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-sm py-2.5 pl-9 pr-4 text-xs text-white focus:border-[#a3e635]/50 focus:outline-none transition-all placeholder:text-zinc-600 font-mono"
                />
            </div>

            <SupportSection title="Billing & Payments">
                <FAQAccordion
                    question="How do I download my invoices?"
                    answer="Invoices are automatically generated at the end of each billing cycle. You can download them from Settings > Billing & Subscription."
                />
                <FAQAccordion
                    question="What payment methods do you accept?"
                    answer="We accept major credit cards (Visa, Mastercard, Amex), PayPal, and ACH transfers for enterprise accounts."
                />
                <FAQAccordion
                    question="How are creators paid?"
                    answer="Once you approve a milestone or deliverable, funds are released from escrow to the creator's wallet immediately."
                />
            </SupportSection>

            <SupportSection title="Campaign Management">
                <FAQAccordion
                    question="Can I edit a campaign after publishing?"
                    answer="Yes, but significant changes to budget or deliverables will require re-approval if creators have already applied."
                />
                <FAQAccordion
                    question="How do I invite specific creators?"
                    answer="You can search for creators in the 'Discover' tab and click 'Invite to Campaign' on their profile."
                />
                <FAQAccordion
                    question="What happens if a creator misses a deadline?"
                    answer="You will be notified, and you can choose to extend the deadline or cancel the contract for a refund of the escrowed amount."
                />
            </SupportSection>
        </div>
    );
}
