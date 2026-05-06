"use client";

import { useState } from "react";
import { SettingsSection, ToggleGroup, SelectGroup, InputGroup } from "../BrandSettingsComponents";
import { CreditCard, Plus, X, Lock } from "lucide-react";
import { GlassTechCard } from "@/components/GlassTechCard";
import { toast } from "sonner";

export function PaymentSettings() {
    const [requireApproval, setRequireApproval] = useState(true);
    const [showAddCard, setShowAddCard] = useState(false);
    const [cardNumber, setCardNumber] = useState("");
    const [cardName, setCardName] = useState("");
    const [cardExpiry, setCardExpiry] = useState("");
    const [cardCvc, setCardCvc] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});

    const formatCardNumber = (v: string) => {
        const digits = v.replace(/\D/g, "").slice(0, 16);
        return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
    };

    const formatExpiry = (v: string) => {
        const digits = v.replace(/\D/g, "").slice(0, 4);
        if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2);
        return digits;
    };

    const validate = () => {
        const e: Record<string, string> = {};
        if (cardNumber.replace(/\s/g, "").length < 16) e.cardNumber = "Enter a valid 16-digit card number";
        if (!cardName.trim()) e.cardName = "Cardholder name is required";
        if (cardExpiry.length < 5) e.cardExpiry = "Enter a valid expiry (MM/YY)";
        if (cardCvc.length < 3) e.cardCvc = "Enter a valid CVC";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleAddCard = () => {
        if (!validate()) return;
        toast.success("Payment method added", { description: `Visa ending in ${cardNumber.replace(/\s/g, "").slice(-4)} added successfully.` });
        setShowAddCard(false);
        setCardNumber(""); setCardName(""); setCardExpiry(""); setCardCvc("");
        setErrors({});
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Payment Methods */}
            <SettingsSection title="Payment Methods" description="Manage cards and accounts for campaign funding.">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <GlassTechCard title="DEFAULT_PAYMENT" className="h-auto p-4 border-dashed border-[#a3e635]/30 bg-[#a3e635]/5 relative overflow-hidden">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-[#a3e635]/20 flex items-center justify-center">
                                <CreditCard className="w-5 h-5 text-[#a3e635]" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-white">Visa Corporate</h4>
                                <p className="text-[10px] text-zinc-400 font-mono">Quicksilver **** 4242</p>
                                <p className="text-[10px] text-zinc-500 font-mono mt-1">Exp 12/28</p>
                            </div>
                        </div>
                        <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-[#a3e635] text-black text-[9px] font-bold font-mono rounded-sm">PRIMARY</div>
                    </GlassTechCard>

                    <button
                        onClick={() => setShowAddCard(true)}
                        className="h-full min-h-[80px] border border-dashed border-zinc-700 bg-zinc-900/30 rounded-sm flex items-center justify-center gap-2 text-zinc-500 hover:text-white hover:border-zinc-500 transition-colors group"
                    >
                        <div className="w-6 h-6 rounded-full border border-zinc-600 flex items-center justify-center group-hover:border-white">
                            <Plus className="w-3 h-3" />
                        </div>
                        <span className="text-xs font-mono font-medium">ADD_NEW_METHOD</span>
                    </button>
                </div>

                <div className="space-y-4 max-w-lg mt-6">
                    <h4 className="text-xs font-bold text-zinc-400 font-mono uppercase mb-2">Spending Controls</h4>
                    <ToggleGroup
                        label="Require Approval for Large Spend"
                        description="Admins must approve payments over $5,000."
                        checked={requireApproval}
                        onChange={(v) => { setRequireApproval(v); toast.success(v ? "Approval required for large spend" : "Large spend approval disabled"); }}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <InputGroup label="Monthly Spending Limit" defaultValue="$50,000.00" />
                        <SelectGroup
                            label="Currency"
                            options={[
                                { label: 'USD ($)', value: 'usd' },
                                { label: 'EUR (€)', value: 'eur' },
                                { label: 'GBP (£)', value: 'gbp' }
                            ]}
                        />
                    </div>
                </div>
            </SettingsSection>

            {/* Invoice Settings */}
            <SettingsSection title="Invoice Settings" description="Details to appear on your billing statements.">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputGroup label="Billing Email" type="email" defaultValue="billing@creonity.com" />
                    <InputGroup label="PO Number Requirement" placeholder="Optional PO Prefix" />
                </div>
                <div className="mt-4">
                    <label className="text-xs font-mono text-zinc-400 font-medium uppercase mb-2 block">Billing Address</label>
                    <textarea
                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-sm px-4 py-2.5 text-xs text-white font-mono outline-none focus:border-[#a3e635]/50 min-h-[80px] resize-y"
                        defaultValue={"123 Innovation Dr, Suite 400\nSan Francisco, CA 94107\nUnited States"}
                    />
                </div>
            </SettingsSection>

            <div className="flex justify-end pt-4 border-t border-white/5">
                <button onClick={() => toast.success("Payment settings saved")} className="px-6 py-2 bg-[#a3e635] text-black font-bold text-xs uppercase hover:bg-[#b5f045] transition-colors rounded-sm shadow-[0_0_10px_rgba(163,230,53,0.2)]">
                    Save_Changes
                </button>
            </div>

            {/* Add Payment Method Modal */}
            {showAddCard && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowAddCard(false)} />
                    <div className="relative z-10 w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-sm shadow-2xl shadow-black/60 animate-in fade-in zoom-in-95 duration-200">
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
                            <div>
                                <h3 className="text-sm font-bold text-white font-display uppercase tracking-wide flex items-center gap-2">
                                    <CreditCard className="w-4 h-4 text-[#a3e635]" />
                                    Add Payment Method
                                </h3>
                                <p className="text-[10px] text-zinc-500 font-mono mt-0.5">Your card details are encrypted and secure.</p>
                            </div>
                            <button onClick={() => setShowAddCard(false)} className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-sm transition-colors">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Form */}
                        <div className="px-6 py-5 space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-mono text-zinc-400 font-medium uppercase">Card Number</label>
                                <div className="relative">
                                    <input
                                        autoFocus
                                        value={cardNumber}
                                        onChange={e => setCardNumber(formatCardNumber(e.target.value))}
                                        placeholder="1234 5678 9012 3456"
                                        maxLength={19}
                                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-sm px-4 py-2.5 pr-10 text-xs text-white font-mono placeholder:text-zinc-700 outline-none transition-all focus:border-[#a3e635]/50 focus:bg-zinc-900 tracking-widest"
                                    />
                                    <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                                </div>
                                {errors.cardNumber && <p className="text-[10px] text-red-500 font-mono">{errors.cardNumber}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-mono text-zinc-400 font-medium uppercase">Cardholder Name</label>
                                <input
                                    value={cardName}
                                    onChange={e => setCardName(e.target.value)}
                                    placeholder="As it appears on card"
                                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-sm px-4 py-2.5 text-xs text-white font-mono placeholder:text-zinc-700 outline-none transition-all focus:border-[#a3e635]/50 focus:bg-zinc-900"
                                />
                                {errors.cardName && <p className="text-[10px] text-red-500 font-mono">{errors.cardName}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-mono text-zinc-400 font-medium uppercase">Expiry</label>
                                    <input
                                        value={cardExpiry}
                                        onChange={e => setCardExpiry(formatExpiry(e.target.value))}
                                        placeholder="MM/YY"
                                        maxLength={5}
                                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-sm px-4 py-2.5 text-xs text-white font-mono placeholder:text-zinc-700 outline-none transition-all focus:border-[#a3e635]/50 focus:bg-zinc-900"
                                    />
                                    {errors.cardExpiry && <p className="text-[10px] text-red-500 font-mono">{errors.cardExpiry}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-mono text-zinc-400 font-medium uppercase">CVC</label>
                                    <input
                                        value={cardCvc}
                                        onChange={e => setCardCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
                                        placeholder="•••"
                                        maxLength={4}
                                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-sm px-4 py-2.5 text-xs text-white font-mono placeholder:text-zinc-700 outline-none transition-all focus:border-[#a3e635]/50 focus:bg-zinc-900"
                                    />
                                    {errors.cardCvc && <p className="text-[10px] text-red-500 font-mono">{errors.cardCvc}</p>}
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-[10px] text-zinc-600 font-mono">
                                <Lock className="w-3 h-3" />
                                256-bit SSL encrypted · PCI DSS compliant
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-zinc-800">
                            <button onClick={() => setShowAddCard(false)} className="px-5 py-2 border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors text-xs uppercase font-mono rounded-sm">
                                Cancel
                            </button>
                            <button onClick={handleAddCard} className="px-5 py-2 bg-[#a3e635] text-black font-bold text-xs uppercase rounded-sm hover:bg-[#b0f545] transition-colors shadow-[0_0_12px_rgba(163,230,53,0.2)] flex items-center gap-2">
                                <Plus className="w-3.5 h-3.5" />
                                Add Card
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
