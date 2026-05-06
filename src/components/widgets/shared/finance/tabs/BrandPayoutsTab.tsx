"use client";

import { useState } from "react";
import { CreditCard, Building2, Plus, ArrowRight, CheckCircle2, AlertCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { ConfirmModal } from "../../ConfirmModal";

const INITIAL_PAYMENT_METHODS = [
    { id: 'chase', name: 'Chase Checking ****8821', type: 'bank', icon: Building2, default: true },
    { id: 'paypal', name: 'rishabh@creonity.com', type: 'paypal', icon: CreditCard, default: false },
];

const PAYOUT_HISTORY = [
    { id: 'WD-4421', date: 'Feb 10, 2026', amount: '$2,100.00', method: 'Chase ****8821', status: 'Processing', eta: 'Feb 13' },
    { id: 'WD-4420', date: 'Jan 15, 2026', amount: '$4,500.00', method: 'Chase ****8821', status: 'Completed', eta: 'Jan 18' },
    { id: 'WD-4419', date: 'Dec 20, 2025', amount: '$1,200.00', method: 'PayPal', status: 'Completed', eta: 'Dec 21' },
];

export function PayoutsTab() {
    const [amount, setAmount] = useState("5,250.00");
    const [showConfirm, setShowConfirm] = useState(false);
    const [showAddMethod, setShowAddMethod] = useState(false);
    const [newMethodName, setNewMethodName] = useState("");
    const [newMethodType, setNewMethodType] = useState("bank");
    const [newAccountNum, setNewAccountNum] = useState("");
    const [paymentMethods, setPaymentMethods] = useState(INITIAL_PAYMENT_METHODS);
    const [editTarget, setEditTarget] = useState<string | null>(null);
    const [editName, setEditName] = useState("");

    const handleTransfer = () => {
        if (!amount.trim() || parseFloat(amount.replace(/,/g, "")) <= 0) {
            toast.error("Enter a valid amount.");
            return;
        }
        setShowConfirm(true);
    };

    const handleConfirmTransfer = () => {
        toast.success(`Transfer of $${amount} initiated`, {
            description: "Funds will arrive in Chase Checking ****8821 within 1–3 business days.",
        });
        setShowConfirm(false);
    };

    const handleAddMethod = () => {
        if (!newMethodName.trim() || !newAccountNum.trim()) {
            toast.error("Please fill in all fields.");
            return;
        }
        const newMethod = {
            id: Date.now().toString(),
            name: newMethodType === "bank" ? `${newMethodName} ****${newAccountNum.slice(-4)}` : newMethodName,
            type: newMethodType,
            icon: newMethodType === "bank" ? Building2 : CreditCard,
            default: false,
        };
        setPaymentMethods(prev => [...prev, newMethod]);
        toast.success("Payment method added");
        setShowAddMethod(false);
        setNewMethodName("");
        setNewAccountNum("");
        setNewMethodType("bank");
    };

    const handleEditSave = () => {
        if (!editName.trim()) return;
        setPaymentMethods(prev => prev.map(m => m.id === editTarget ? { ...m, name: editName } : m));
        toast.success("Payment method updated");
        setEditTarget(null);
        setEditName("");
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Withdrawal & Methods */}
            <div className="lg:col-span-2 space-y-6">
                {/* Withdrawal Card */}
                <div className="tech-border p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <CreditCard className="w-32 h-32 text-zinc-500" />
                    </div>

                    <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider mb-6 relative z-10 flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-[#a3e635]" /> Request_Withdrawal
                    </h3>

                    <div className="relative z-10 space-y-6">
                        <div>
                            <label className="text-[10px] text-zinc-500 font-mono uppercase mb-2 block tracking-wider">Amount to Withdraw</label>
                            <div className="flex items-center gap-4">
                                <div className="flex-1 bg-zinc-950 border border-zinc-800 px-4 py-3 flex items-center focus-within:border-[#a3e635]/50 transition-colors">
                                    <span className="text-zinc-500 mr-2 font-mono">$</span>
                                    <input
                                        type="text"
                                        value={amount}
                                        onChange={e => setAmount(e.target.value)}
                                        className="bg-transparent border-none outline-none text-xl font-bold text-white font-mono w-full placeholder:text-zinc-800"
                                    />
                                </div>
                                <button
                                    onClick={() => setAmount("5,250.00")}
                                    className="text-[10px] font-bold text-[#a3e635] bg-[#a3e635]/10 px-4 py-3 border border-[#a3e635]/20 hover:bg-[#a3e635]/20 font-mono uppercase transition-colors"
                                >
                                    MAX
                                </button>
                            </div>
                            <p className="text-[10px] text-zinc-500 font-mono mt-2">Available Balance: <span className="text-white font-bold">$5,250.00</span></p>
                        </div>

                        <div>
                            <label className="text-[10px] text-zinc-500 font-mono uppercase mb-2 block tracking-wider">Destination</label>
                            <div className="bg-zinc-950 border border-zinc-800 p-3 flex items-center justify-between cursor-pointer hover:border-[#a3e635]/30 transition-colors group/dest">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-zinc-900/50 flex items-center justify-center border border-zinc-800 group-hover/dest:border-zinc-700">
                                        <Building2 className="w-5 h-5 text-zinc-400 group-hover/dest:text-white transition-colors" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-white mb-0.5">Chase Checking ****8821</div>
                                        <div className="text-[10px] text-zinc-500 font-mono">Instant Transfer (1.5% fee)</div>
                                    </div>
                                </div>
                                <div className="w-8 h-8 flex items-center justify-center bg-zinc-900 border border-zinc-800 group-hover/dest:bg-[#a3e635] group-hover/dest:text-black transition-all">
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleTransfer}
                            className="w-full py-4 bg-[#a3e635] text-black font-bold font-mono text-xs uppercase tracking-widest hover:bg-[#b2eb59] transition-colors relative overflow-hidden group/btn"
                        >
                            <span className="relative z-10">Initiate_Transfer</span>
                            <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300" />
                        </button>
                    </div>
                </div>

                {/* Payment Methods */}
                <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider">Payout_Methods</h3>
                        <button
                            onClick={() => setShowAddMethod(true)}
                            className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 hover:text-white transition-colors bg-zinc-950 px-3 py-1.5 rounded-sm border border-zinc-800 hover:border-zinc-700"
                        >
                            <Plus className="w-3 h-3" /> ADD_NEW
                        </button>
                    </div>

                    <div className="space-y-3">
                        {paymentMethods.map(method => (
                            <div key={method.id} className="flex items-center justify-between p-4 bg-zinc-950/30 border border-zinc-800 rounded-sm">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-sm bg-zinc-900 flex items-center justify-center border border-zinc-800 text-zinc-500">
                                        <method.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-white flex items-center gap-2">
                                            {method.name}
                                            {method.default && <span className="text-[9px] bg-zinc-800 text-zinc-400 px-1.5 rounded-[1px] py-0.5 font-mono font-normal">DEFAULT</span>}
                                        </div>
                                        <div className="text-[10px] text-zinc-500 font-mono capitalize">{method.type} Account</div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => { setEditTarget(method.id); setEditName(method.name); }}
                                    className="text-[10px] text-zinc-500 hover:text-white underline decoration-zinc-700 font-mono transition-colors"
                                >
                                    EDIT
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Column: History */}
            <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-sm flex flex-col h-full">
                <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider mb-6">Payout_History</h3>

                <div className="flex-1 space-y-6 relative">
                    <div className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-zinc-800"></div>

                    {PAYOUT_HISTORY.map((payout) => (
                        <div key={payout.id} className="relative pl-6">
                            <div className={cn(
                                "absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 bg-zinc-950 z-10",
                                payout.status === 'Processing' ? "border-[#a3e635] animate-pulse" : "border-zinc-700"
                            )} />
                            <div className="mb-1 flex justify-between items-start">
                                <span className="text-xs font-bold text-white">{payout.amount}</span>
                                <span className={cn(
                                    "text-[9px] font-mono px-1.5 py-0.5 rounded-sm uppercase border",
                                    payout.status === 'Processing' ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" : "bg-zinc-800 text-zinc-500 border-zinc-700"
                                )}>{payout.status}</span>
                            </div>
                            <div className="text-[10px] text-zinc-500 font-mono mb-1">{payout.date} via {payout.method}</div>
                            <div className="text-[10px] text-zinc-600 font-mono">ETA: {payout.eta}</div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 pt-6 border-t border-zinc-800">
                    <div className="flex gap-3 items-start p-3 bg-zinc-950/50 border border-zinc-800 rounded-sm">
                        <AlertCircle className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
                        <p className="text-[10px] text-zinc-500 font-mono leading-relaxed">
                            Payouts are processed daily. Allow 1-3 business days for bank transfers to appear in your account.
                        </p>
                    </div>
                </div>
            </div>

            {/* Confirm Transfer Modal */}
            <ConfirmModal
                open={showConfirm}
                onClose={() => setShowConfirm(false)}
                onConfirm={handleConfirmTransfer}
                title="Confirm Transfer"
                description={`Transfer $${amount} to Chase Checking ****8821? This action cannot be undone once processed.`}
                confirmLabel="Initiate Transfer"
            />

            {/* Add Payment Method Modal */}
            {showAddMethod && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowAddMethod(false)} />
                    <div className="relative z-10 w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-sm shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
                            <h3 className="text-sm font-bold text-white font-display uppercase">Add Payout Method</h3>
                            <button onClick={() => setShowAddMethod(false)} className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-sm">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="px-6 py-5 space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-mono text-zinc-500 uppercase">Type</label>
                                <div className="flex gap-2">
                                    {["bank", "paypal"].map(t => (
                                        <button
                                            key={t}
                                            onClick={() => setNewMethodType(t)}
                                            className={cn("flex-1 py-2 border rounded-sm text-[10px] font-mono uppercase transition-colors", newMethodType === t ? "border-[#a3e635]/50 text-[#a3e635] bg-[#a3e635]/10" : "border-zinc-800 text-zinc-500 hover:border-zinc-700")}
                                        >
                                            {t === "bank" ? "Bank Account" : "PayPal"}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-mono text-zinc-500 uppercase">{newMethodType === "bank" ? "Bank / Institution Name" : "PayPal Email"}</label>
                                <input
                                    autoFocus
                                    type={newMethodType === "paypal" ? "email" : "text"}
                                    value={newMethodName}
                                    onChange={e => setNewMethodName(e.target.value)}
                                    placeholder={newMethodType === "bank" ? "Chase, Wells Fargo..." : "you@example.com"}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-sm px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#a3e635]/50"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-mono text-zinc-500 uppercase">{newMethodType === "bank" ? "Account Number" : "Confirm Email"}</label>
                                <input
                                    type={newMethodType === "paypal" ? "email" : "text"}
                                    value={newAccountNum}
                                    onChange={e => setNewAccountNum(e.target.value)}
                                    onKeyDown={e => e.key === "Enter" && handleAddMethod()}
                                    placeholder={newMethodType === "bank" ? "Account number" : "Confirm email"}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-sm px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#a3e635]/50"
                                />
                            </div>
                        </div>
                        <div className="flex gap-3 px-6 py-4 border-t border-zinc-800">
                            <button onClick={() => setShowAddMethod(false)} className="flex-1 py-2 border border-zinc-700 text-zinc-400 text-xs uppercase font-mono rounded-sm transition-colors">Cancel</button>
                            <button
                                onClick={handleAddMethod}
                                disabled={!newMethodName.trim() || !newAccountNum.trim()}
                                className="flex-1 py-2 bg-[#a3e635] text-black font-bold text-xs uppercase rounded-sm hover:bg-[#bef264] disabled:opacity-40 transition-colors"
                            >
                                Add Method
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Method Modal */}
            {editTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setEditTarget(null)} />
                    <div className="relative z-10 w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-sm shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
                            <h3 className="text-sm font-bold text-white font-display uppercase">Edit Payout Method</h3>
                            <button onClick={() => setEditTarget(null)} className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-sm">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="px-6 py-5 space-y-3">
                            <label className="text-[10px] font-mono text-zinc-500 uppercase">Display Name</label>
                            <input
                                autoFocus
                                type="text"
                                value={editName}
                                onChange={e => setEditName(e.target.value)}
                                onKeyDown={e => e.key === "Enter" && handleEditSave()}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-sm px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#a3e635]/50"
                            />
                        </div>
                        <div className="flex gap-3 px-6 py-4 border-t border-zinc-800">
                            <button onClick={() => setEditTarget(null)} className="flex-1 py-2 border border-zinc-700 text-zinc-400 text-xs uppercase font-mono rounded-sm transition-colors">Cancel</button>
                            <button
                                onClick={handleEditSave}
                                disabled={!editName.trim()}
                                className="flex-1 py-2 bg-[#a3e635] text-black font-bold text-xs uppercase rounded-sm hover:bg-[#bef264] disabled:opacity-40 transition-colors"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
