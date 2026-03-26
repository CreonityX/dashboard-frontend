"use client";

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { useSettingsMvp } from "@/components/widgets/shared/settings/SettingsMvpContext";

export type FinanceRange = "1W" | "1M" | "3M" | "1Y";
export type TransactionType = "credit" | "debit";
export type TransactionStatus = "completed" | "pending";
export type PayoutStatus = "Processing" | "Completed";
export type InvoiceStatus = "draft" | "sent" | "paid";

export type MonthlyEarningPoint = {
    month: string;
    amount: number;
};

export type Transaction = {
    id: string;
    date: string;
    desc: string;
    type: TransactionType;
    amount: number;
    status: TransactionStatus;
    brand: string;
    invoiceId?: string;
};

export type PaymentMethod = {
    id: string;
    name: string;
    type: "bank" | "paypal";
    default: boolean;
};

export type PayoutRecord = {
    id: string;
    date: string;
    amount: number;
    method: string;
    status: PayoutStatus;
    eta: string;
};

export type InvoiceRecord = {
    id: string;
    client: string;
    campaign: string;
    dateIssued: string;
    amount: number;
    status: InvoiceStatus;
};

export type TaxDocument = {
    id: string;
    form: string;
    year: string;
};

export type ReferralEntry = {
    id: string;
    name: string;
    earned: number;
};

type FinanceState = {
    selectedRange: FinanceRange;
    selectedMonth: string;
    monthlyEarnings: MonthlyEarningPoint[];
    transactions: Transaction[];
    transactionTypeFilter: "all" | TransactionType;
    transactionStatusFilter: "all" | TransactionStatus;
    searchQuery: string;
    availableToWithdraw: number;
    withdrawalAmount: string;
    paymentMethods: PaymentMethod[];
    selectedMethodId: string;
    payoutHistory: PayoutRecord[];
    invoices: InvoiceRecord[];
    taxResidency: "United States (W-9)" | "International (W-8BEN)";
    taxIdMasked: string;
    taxDocuments: TaxDocument[];
    referralLink: string;
    totalReferrals: number;
    referralLifetimeEarnings: number;
    referralPendingRewards: number;
    leaderboard: ReferralEntry[];
};

const STORAGE_KEY = "finance_mvp_state_v1";

const INITIAL_STATE: FinanceState = {
    selectedRange: "1Y",
    selectedMonth: "Feb",
    monthlyEarnings: [
        { month: "J", amount: 4200 },
        { month: "F", amount: 5600 },
        { month: "M", amount: 5100 },
        { month: "A", amount: 6200 },
        { month: "M", amount: 5800 },
        { month: "J", amount: 6400 },
        { month: "J", amount: 6100 },
        { month: "A", amount: 6700 },
        { month: "S", amount: 5900 },
        { month: "O", amount: 7000 },
        { month: "N", amount: 7500 },
        { month: "D", amount: 8200 }
    ],
    transactions: [
        { id: "TX-8821", date: "Feb 12, 2026", desc: "Nike - Air Max Launch", type: "credit", amount: 4500, status: "completed", brand: "Nike", invoiceId: "INV-2026-001" },
        { id: "TX-8820", date: "Feb 10, 2026", desc: "Withdrawal to Chase Bank", type: "debit", amount: 2100, status: "completed", brand: "Transfer" },
        { id: "TX-8819", date: "Feb 08, 2026", desc: "Samsung - Galaxy S26", type: "credit", amount: 3200, status: "pending", brand: "Samsung", invoiceId: "INV-2026-002" },
        { id: "TX-8818", date: "Feb 05, 2026", desc: "Adobe - Creative Cloud", type: "credit", amount: 1800, status: "completed", brand: "Adobe", invoiceId: "INV-2026-003" },
        { id: "TX-8817", date: "Feb 01, 2026", desc: "Monthly Subscription", type: "debit", amount: 29, status: "completed", brand: "Service" }
    ],
    transactionTypeFilter: "all",
    transactionStatusFilter: "all",
    searchQuery: "",
    availableToWithdraw: 5250,
    withdrawalAmount: "5250.00",
    paymentMethods: [
        { id: "chase", name: "Chase Checking ****8821", type: "bank", default: true },
        { id: "paypal", name: "rishabh@creonity.com", type: "paypal", default: false }
    ],
    selectedMethodId: "chase",
    payoutHistory: [
        { id: "WD-4421", date: "Feb 10, 2026", amount: 2100, method: "Chase ****8821", status: "Processing", eta: "Feb 13" },
        { id: "WD-4420", date: "Jan 15, 2026", amount: 4500, method: "Chase ****8821", status: "Completed", eta: "Jan 18" },
        { id: "WD-4419", date: "Dec 20, 2025", amount: 1200, method: "PayPal", status: "Completed", eta: "Dec 21" }
    ],
    invoices: [
        { id: "INV-2026-001", client: "Nike", campaign: "Air Max Launch", dateIssued: "Feb 09, 2026", amount: 4500, status: "paid" },
        { id: "INV-2026-002", client: "Samsung", campaign: "Galaxy S26", dateIssued: "Feb 06, 2026", amount: 3200, status: "sent" },
        { id: "INV-2026-003", client: "Adobe", campaign: "Creative Cloud", dateIssued: "Feb 03, 2026", amount: 1800, status: "paid" },
        { id: "INV-2026-004", client: "Notion", campaign: "Productivity Sprint", dateIssued: "Jan 30, 2026", amount: 1700, status: "draft" }
    ],
    taxResidency: "United States (W-9)",
    taxIdMasked: "***-**-8821",
    taxDocuments: [
        { id: "tax-2025", form: "1099-NEC", year: "2025" },
        { id: "tax-2024", form: "1099-NEC", year: "2024" }
    ],
    referralLink: "creonity.com/invite/kai_zen",
    totalReferrals: 42,
    referralLifetimeEarnings: 1250,
    referralPendingRewards: 145,
    leaderboard: [
        { id: "rf-1", name: "CreatorName_1", earned: 4500 },
        { id: "rf-2", name: "CreatorName_2", earned: 3900 },
        { id: "rf-3", name: "CreatorName_3", earned: 3200 }
    ]
};

type FinanceMvpContextValue = {
    isLoading: boolean;
    selectedRange: FinanceRange;
    selectedMonth: string;
    monthlyEarnings: MonthlyEarningPoint[];
    transactions: Transaction[];
    transactionTypeFilter: "all" | TransactionType;
    transactionStatusFilter: "all" | TransactionStatus;
    searchQuery: string;
    availableToWithdraw: number;
    withdrawalAmount: string;
    paymentMethods: PaymentMethod[];
    selectedMethodId: string;
    payoutHistory: PayoutRecord[];
    invoices: InvoiceRecord[];
    taxResidency: "United States (W-9)" | "International (W-8BEN)";
    taxIdMasked: string;
    taxDocuments: TaxDocument[];
    referralLink: string;
    totalReferrals: number;
    referralLifetimeEarnings: number;
    referralPendingRewards: number;
    leaderboard: ReferralEntry[];
    filteredTransactions: Transaction[];
    lifetimeEarnings: number;
    monthEarnings: number;
    pendingPayments: number;
    formatCurrency: (value: number, type?: "credit" | "debit") => string;
    setSelectedRange: (range: FinanceRange) => void;
    setSelectedMonth: (month: string) => void;
    setSearchQuery: (query: string) => void;
    cycleTypeFilter: () => void;
    cycleStatusFilter: () => void;
    setWithdrawalAmount: (amount: string) => void;
    setMaxWithdrawalAmount: () => void;
    cycleSelectedMethod: () => void;
    requestWithdrawal: () => { ok: boolean; message: string };
    addPaymentMethod: () => void;
    setDefaultMethod: (methodId: string) => void;
    createInvoice: () => InvoiceRecord;
    sendInvoice: (invoiceId: string) => boolean;
    markInvoicePaid: (invoiceId: string) => boolean;
    updateTaxResidency: (residency: "United States (W-9)" | "International (W-8BEN)") => void;
    revealTaxIdTemporarily: () => string;
    getTransactionsCsv: () => string;
    getInvoiceDownloadText: (invoiceId: string) => string;
    getTaxDocumentText: (docId: string) => string;
    copyReferralLink: () => string;
    boostReferralEntry: (entryId: string) => void;
};

const FinanceMvpContext = createContext<FinanceMvpContextValue | undefined>(undefined);

function getInitialState(): FinanceState {
    if (typeof window === "undefined") return INITIAL_STATE;
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return INITIAL_STATE;
        const parsed = JSON.parse(raw) as FinanceState;
        if (!parsed.transactions || !parsed.paymentMethods || !parsed.invoices) {
            return INITIAL_STATE;
        }
        return parsed;
    } catch {
        return INITIAL_STATE;
    }
}

function amountToNumber(raw: string) {
    const cleaned = raw.replace(/[^\d.]/g, "");
    const parsed = Number(cleaned);
    return Number.isFinite(parsed) ? parsed : 0;
}

export function FinanceMvpProvider({ children }: { children: ReactNode }) {
    const settings = useSettingsMvp();
    const [state, setState] = useState<FinanceState>(getInitialState);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 300);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return;
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }, [state]);

    const lifetimeEarnings = useMemo(
        () => state.transactions.filter((item) => item.type === "credit").reduce((sum, item) => sum + item.amount, 0),
        [state.transactions]
    );

    const monthEarnings = useMemo(() => {
        const visible = state.monthlyEarnings[state.monthlyEarnings.length - 1];
        return visible?.amount ?? 0;
    }, [state.monthlyEarnings]);

    const pendingPayments = useMemo(
        () => state.transactions.filter((item) => item.status === "pending" && item.type === "credit").reduce((sum, item) => sum + item.amount, 0),
        [state.transactions]
    );

    const filteredTransactions = useMemo(
        () => state.transactions.filter((tx) => {
            const typeMatch = state.transactionTypeFilter === "all" || tx.type === state.transactionTypeFilter;
            const statusMatch = state.transactionStatusFilter === "all" || tx.status === state.transactionStatusFilter;
            const q = state.searchQuery.trim().toLowerCase();
            const searchMatch = !q || tx.id.toLowerCase().includes(q) || tx.brand.toLowerCase().includes(q) || tx.desc.toLowerCase().includes(q);
            return typeMatch && statusMatch && searchMatch;
        }),
        [state.searchQuery, state.transactionStatusFilter, state.transactionTypeFilter, state.transactions]
    );

    const setSelectedRange = (range: FinanceRange) => {
        setState((current) => ({ ...current, selectedRange: range }));
    };

    const setSelectedMonth = (month: string) => {
        setState((current) => ({ ...current, selectedMonth: month }));
    };

    const setSearchQuery = (query: string) => {
        setState((current) => ({ ...current, searchQuery: query }));
    };

    const cycleTypeFilter = () => {
        const order: Array<"all" | TransactionType> = ["all", "credit", "debit"];
        setState((current) => ({
            ...current,
            transactionTypeFilter: order[(order.indexOf(current.transactionTypeFilter) + 1) % order.length]
        }));
    };

    const cycleStatusFilter = () => {
        const order: Array<"all" | TransactionStatus> = ["all", "completed", "pending"];
        setState((current) => ({
            ...current,
            transactionStatusFilter: order[(order.indexOf(current.transactionStatusFilter) + 1) % order.length]
        }));
    };

    const setWithdrawalAmount = (amount: string) => {
        setState((current) => ({ ...current, withdrawalAmount: amount }));
    };

    const setMaxWithdrawalAmount = () => {
        setState((current) => ({ ...current, withdrawalAmount: current.availableToWithdraw.toFixed(2) }));
    };

    const cycleSelectedMethod = () => {
        setState((current) => {
            const currentIndex = current.paymentMethods.findIndex((method) => method.id === current.selectedMethodId);
            if (currentIndex < 0) return current;
            const next = current.paymentMethods[(currentIndex + 1) % current.paymentMethods.length];
            return { ...current, selectedMethodId: next.id };
        });
    };

    const requestWithdrawal = () => {
        const amount = amountToNumber(state.withdrawalAmount);
        if (amount <= 0) {
            return { ok: false, message: "Enter a valid withdrawal amount." };
        }
        if (amount > state.availableToWithdraw) {
            return { ok: false, message: "Withdrawal exceeds available balance." };
        }

        setState((current) => {
            const method = current.paymentMethods.find((item) => item.id === current.selectedMethodId);
            const methodLabel = method?.type === "paypal" ? "PayPal" : "Chase ****8821";
            const now = new Date();
            const date = now.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });

            const payout: PayoutRecord = {
                id: `WD-${Math.floor(1000 + Math.random() * 9000)}`,
                date,
                amount,
                method: methodLabel,
                status: "Processing",
                eta: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", { month: "short", day: "2-digit" })
            };

            const tx: Transaction = {
                id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
                date,
                desc: `Withdrawal to ${methodLabel}`,
                type: "debit",
                amount,
                status: "pending",
                brand: "Transfer"
            };

            const remaining = Math.max(0, current.availableToWithdraw - amount);

            return {
                ...current,
                availableToWithdraw: remaining,
                withdrawalAmount: remaining.toFixed(2),
                payoutHistory: [payout, ...current.payoutHistory],
                transactions: [tx, ...current.transactions]
            };
        });

        return { ok: true, message: `Transfer initiated for ${settings.formatCurrency(amount)}.` };
    };

    const addPaymentMethod = () => {
        setState((current) => {
            const newMethod: PaymentMethod = {
                id: `bank-${Date.now()}`,
                name: `New Bank Account ****${Math.floor(1000 + Math.random() * 9000)}`,
                type: "bank",
                default: false
            };
            return {
                ...current,
                paymentMethods: [...current.paymentMethods, newMethod]
            };
        });
    };

    const setDefaultMethod = (methodId: string) => {
        setState((current) => ({
            ...current,
            selectedMethodId: methodId,
            paymentMethods: current.paymentMethods.map((method) => ({ ...method, default: method.id === methodId }))
        }));
    };

    const createInvoice = () => {
        let created: InvoiceRecord = {
            id: "",
            client: "",
            campaign: "",
            dateIssued: "",
            amount: 0,
            status: "draft"
        };

        setState((current) => {
            const nextIndex = current.invoices.length + 1;
            const newInvoice: InvoiceRecord = {
                id: `INV-2026-${String(nextIndex).padStart(3, "0")}`,
                client: `New Brand ${nextIndex}`,
                campaign: "Custom Deliverables",
                dateIssued: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
                amount: 1500 + nextIndex * 100,
                status: "draft"
            };
            created = newInvoice;
            return { ...current, invoices: [newInvoice, ...current.invoices] };
        });

        return created;
    };

    const sendInvoice = (invoiceId: string) => {
        let didUpdate = false;
        setState((current) => ({
            ...current,
            invoices: current.invoices.map((invoice) => {
                if (invoice.id !== invoiceId || invoice.status !== "draft") return invoice;
                didUpdate = true;
                return { ...invoice, status: "sent" };
            })
        }));
        return didUpdate;
    };

    const markInvoicePaid = (invoiceId: string) => {
        let didUpdate = false;
        setState((current) => ({
            ...current,
            invoices: current.invoices.map((invoice) => {
                if (invoice.id !== invoiceId || invoice.status === "paid") return invoice;
                didUpdate = true;
                return { ...invoice, status: "paid" };
            })
        }));
        return didUpdate;
    };

    const updateTaxResidency = (residency: "United States (W-9)" | "International (W-8BEN)") => {
        setState((current) => ({ ...current, taxResidency: residency }));
    };

    const revealTaxIdTemporarily = () => {
        return "845-12-8821";
    };

    const getTransactionsCsv = () => {
        const header = "id,date,description,type,status,amount\n";
        const rows = filteredTransactions
            .map((tx) => [tx.id, tx.date, tx.desc, tx.type, tx.status, tx.amount.toFixed(2)].join(","))
            .join("\n");
        return `${header}${rows}`;
    };

    const getInvoiceDownloadText = (invoiceId: string) => {
        const invoice = state.invoices.find((item) => item.id === invoiceId);
        if (!invoice) return "Invoice not found.";

        return [
            `Invoice: ${invoice.id}`,
            `Client: ${invoice.client}`,
            `Campaign: ${invoice.campaign}`,
            `Date: ${invoice.dateIssued}`,
            `Amount: ${settings.formatCurrency(invoice.amount)}`,
            `Status: ${invoice.status.toUpperCase()}`
        ].join("\n");
    };

    const getTaxDocumentText = (docId: string) => {
        const doc = state.taxDocuments.find((item) => item.id === docId);
        if (!doc) return "Tax document not found.";
        return `Form ${doc.form} for tax year ${doc.year}.`;
    };

    const copyReferralLink = () => state.referralLink;

    const boostReferralEntry = (entryId: string) => {
        setState((current) => ({
            ...current,
            leaderboard: current.leaderboard
                .map((entry) => (entry.id === entryId ? { ...entry, earned: entry.earned + 100 } : entry))
                .sort((a, b) => b.earned - a.earned)
        }));
    };

    return (
        <FinanceMvpContext.Provider
            value={{
                isLoading,
                selectedRange: state.selectedRange,
                selectedMonth: state.selectedMonth,
                monthlyEarnings: state.monthlyEarnings,
                transactions: state.transactions,
                transactionTypeFilter: state.transactionTypeFilter,
                transactionStatusFilter: state.transactionStatusFilter,
                searchQuery: state.searchQuery,
                availableToWithdraw: state.availableToWithdraw,
                withdrawalAmount: state.withdrawalAmount,
                paymentMethods: state.paymentMethods,
                selectedMethodId: state.selectedMethodId,
                payoutHistory: state.payoutHistory,
                invoices: state.invoices,
                taxResidency: state.taxResidency,
                taxIdMasked: state.taxIdMasked,
                taxDocuments: state.taxDocuments,
                referralLink: state.referralLink,
                totalReferrals: state.totalReferrals,
                referralLifetimeEarnings: state.referralLifetimeEarnings,
                referralPendingRewards: state.referralPendingRewards,
                leaderboard: state.leaderboard,
                filteredTransactions,
                lifetimeEarnings,
                monthEarnings,
                pendingPayments,
                formatCurrency: settings.formatCurrency,
                setSelectedRange,
                setSelectedMonth,
                setSearchQuery,
                cycleTypeFilter,
                cycleStatusFilter,
                setWithdrawalAmount,
                setMaxWithdrawalAmount,
                cycleSelectedMethod,
                requestWithdrawal,
                addPaymentMethod,
                setDefaultMethod,
                createInvoice,
                sendInvoice,
                markInvoicePaid,
                updateTaxResidency,
                revealTaxIdTemporarily,
                getTransactionsCsv,
                getInvoiceDownloadText,
                getTaxDocumentText,
                copyReferralLink,
                boostReferralEntry
            }}
        >
            {children}
        </FinanceMvpContext.Provider>
    );
}

export function useFinanceMvp() {
    const context = useContext(FinanceMvpContext);
    if (!context) {
        throw new Error("useFinanceMvp must be used within a FinanceMvpProvider");
    }
    return context;
}