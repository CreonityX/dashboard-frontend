"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FinanceShell } from "@/components/widgets/shared/finance/FinanceShell";

// Tabs
import { OverviewTab } from "@/components/widgets/shared/finance/tabs/OverviewTab";
import { TransactionsTab } from "@/components/widgets/shared/finance/tabs/TransactionsTab";
import { PayoutsTab } from "@/components/widgets/shared/finance/tabs/PayoutsTab";
import { InvoicesTab } from "@/components/widgets/shared/finance/tabs/InvoicesTab";
import { TaxTab } from "@/components/widgets/shared/finance/tabs/TaxTab";
import { ReferralsTab } from "@/components/widgets/shared/finance/tabs/ReferralsTab";

function FinanceContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const activeTab = searchParams.get('tab') || 'overview';

    const handleTabChange = (id: string) => {
        router.push(`/finance?tab=${id}`);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'overview': return <OverviewTab />;
            case 'transactions': return <TransactionsTab />;
            case 'payouts': return <PayoutsTab />;
            case 'invoices': return <InvoicesTab />;
            case 'tax': return <TaxTab />;
            case 'referrals': return <ReferralsTab />;
            default: return <OverviewTab />;
        }
    };

    return (
        <FinanceShell activeTab={activeTab} onTabChange={handleTabChange}>
            {renderContent()}
        </FinanceShell>
    );
}

export default function FinancePage() {
    return (
        <Suspense fallback={<div className="h-full w-full bg-zinc-900/40" />}>
            <FinanceContent />
        </Suspense>
    );
}
