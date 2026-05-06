"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/lib/UserContext";
import { FinanceMvpProvider } from "@/components/widgets/shared/finance/FinanceMvpContext";

// Creator Imports
import { FinanceShell as CreatorFinanceShell } from "@/components/widgets/shared/finance/FinanceShell";
import { OverviewTab as CreatorOverviewTab } from "@/components/widgets/shared/finance/tabs/OverviewTab";
import { TransactionsTab as CreatorTransactionsTab } from "@/components/widgets/shared/finance/tabs/TransactionsTab";
import { PayoutsTab as CreatorPayoutsTab } from "@/components/widgets/shared/finance/tabs/PayoutsTab";
import { InvoicesTab as CreatorInvoicesTab } from "@/components/widgets/shared/finance/tabs/InvoicesTab";
import { ReferralsTab as CreatorReferralsTab } from "@/components/widgets/shared/finance/tabs/ReferralsTab";

// Brand Imports
import { FinanceShell as BrandFinanceShell } from "@/components/widgets/shared/finance/BrandFinanceShell";
import { OverviewTab as BrandOverviewTab } from "@/components/widgets/shared/finance/tabs/BrandOverviewTab";
import { PaymentsTab } from "@/components/widgets/shared/finance/tabs/PaymentsTab";
import { HistoryTab } from "@/components/widgets/shared/finance/tabs/HistoryTab";
import { InvoicesTab as BrandInvoicesTab } from "@/components/widgets/shared/finance/tabs/BrandInvoicesTab";
import { AlertsTab } from "@/components/widgets/shared/finance/tabs/AlertsTab";
import { ReportsTab } from "@/components/widgets/shared/finance/tabs/ReportsTab";
import { TaxTab as BrandTaxTab } from "@/components/widgets/shared/finance/tabs/BrandTaxTab";
import { ReferralsTab as BrandReferralsTab } from "@/components/widgets/shared/finance/tabs/BrandReferralsTab";

function CreatorFinanceContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const activeTab = searchParams.get('tab') || 'overview';

    const handleTabChange = (id: string) => {
        router.push(`/finance?tab=${id}`);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'overview': return <CreatorOverviewTab />;
            case 'transactions': return <CreatorTransactionsTab />;
            case 'payouts': return <CreatorPayoutsTab />;
            case 'invoices': return <CreatorInvoicesTab />;
            case 'referrals': return <CreatorReferralsTab />;
            default: return <CreatorOverviewTab />;
        }
    };

    return (
        <CreatorFinanceShell activeTab={activeTab} onTabChange={handleTabChange}>
            {renderContent()}
        </CreatorFinanceShell>
    );
}

function BrandFinanceContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const activeTab = searchParams.get('tab') || 'overview';

    const handleTabChange = (id: string) => {
        router.push(`/finance?tab=${id}`);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'overview': return <BrandOverviewTab />;
            case 'payments': return <PaymentsTab />;
            case 'history': return <HistoryTab />;
            case 'invoices': return <BrandInvoicesTab />;
            case 'alerts': return <AlertsTab />;
            case 'reports': return <ReportsTab />;
            case 'tax': return <BrandTaxTab />;
            case 'referrals': return <BrandReferralsTab />;
            default: return <BrandOverviewTab />;
        }
    };

    return (
        <BrandFinanceShell activeTab={activeTab} onTabChange={handleTabChange}>
            {renderContent()}
        </BrandFinanceShell>
    );
}

export default function FinancePage() {
    const { isBrand } = useUser();
    return (
        <Suspense fallback={<div className="h-full w-full bg-zinc-900/40" />}>
            <FinanceMvpProvider>
                {isBrand ? <BrandFinanceContent /> : <CreatorFinanceContent />}
            </FinanceMvpProvider>
        </Suspense>
    );
}
