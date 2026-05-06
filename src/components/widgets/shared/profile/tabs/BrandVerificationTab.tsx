"use client";

import { ProfileSection } from "@/components/widgets/shared/profile/ProfileComponents";
import { Upload, FileText, CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export function VerificationTab() {
    return (
        <div className="max-w-3xl mx-auto px-6 pb-20 animate-in fade-in zoom-in-95 duration-500 space-y-12">

            {/* Status Banner */}
            <div className="p-6 border border-[#a3e635]/20 bg-[#a3e635]/5 rounded-sm flex items-start gap-4">
                <ShieldCheck className="w-6 h-6 text-[#a3e635] shrink-0 mt-1" />
                <div>
                    <h3 className="text-lg font-bold text-white font-display mb-1">Verification Compliance</h3>
                    <p className="text-sm text-zinc-400 mb-4">Complete your business verification to unlock "Trusted Brand" status and access premium creators.</p>
                    <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-[#a3e635]/20 text-[#a3e635] text-[10px] font-bold uppercase rounded-sm border border-[#a3e635]/30">Pending Review</span>
                        <span className="text-[10px] text-zinc-500 font-mono">Submitted on Feb 14, 2026</span>
                    </div>
                </div>
            </div>

            {/* Document Upload */}
            <ProfileSection title="Business Documents">
                <div className="space-y-4">
                    <DocumentUploadRow
                        title="Business Registration / Incorporation"
                        description="Upload a copy of your Articles of Incorporation or Business License."
                        status="uploaded"
                        fileName="creonity_inc_articles.pdf"
                    />
                    <DocumentUploadRow
                        title="Tax Identification Number (EIN)"
                        description="Official IRS letter or tax return document."
                        status="pending"
                    />
                    <DocumentUploadRow
                        title="Proof of Address"
                        description="Utility bill or bank statement dated within 3 months."
                        status="pending"
                    />
                </div>
            </ProfileSection>

            {/* Contact Verification */}
            <ProfileSection title="Contact Verification">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border border-zinc-800 bg-zinc-900/30 rounded-sm flex justify-between items-center">
                        <div>
                            <div className="text-xs font-bold text-zinc-300 uppercase">Work Email</div>
                            <div className="text-sm text-white font-mono">kai@creonity.com</div>
                        </div>
                        <CheckCircle2 className="w-5 h-5 text-[#a3e635]" />
                    </div>
                    <div className="p-4 border border-zinc-800 bg-zinc-900/30 rounded-sm flex justify-between items-center">
                        <div>
                            <div className="text-xs font-bold text-zinc-300 uppercase">Phone Number</div>
                            <div className="text-sm text-white font-mono">+1 (555) 012-3456</div>
                        </div>
                        <button onClick={() => toast.success("Verification code sent to +1 (555) 012-3456")} className="text-[10px] bg-zinc-800 hover:bg-zinc-700 text-white px-2 py-1 rounded-sm uppercase font-bold transition-colors">
                            Verify
                        </button>
                    </div>
                </div>
            </ProfileSection>

            <div className="flex justify-end pt-6 border-t border-white/5">
                <button onClick={() => toast("Documents pending", { description: "Upload all required documents before submitting." })} className="px-6 py-2 bg-zinc-200 text-black font-bold text-xs uppercase hover:bg-white transition-colors opacity-50 cursor-not-allowed">
                    Submit_For_Review
                </button>
            </div>
        </div>
    );
}

function DocumentUploadRow({ title, description, status, fileName }: { title: string, description: string, status: 'pending' | 'uploaded', fileName?: string }) {
    return (
        <div className="p-4 border border-white/5 bg-white/[0.02] rounded-sm hover:border-white/10 transition-colors">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h4 className="text-sm font-bold text-white mb-1">{title}</h4>
                    <p className="text-xs text-zinc-500 max-w-lg">{description}</p>
                </div>
                {status === 'uploaded' ? (
                    <div className="flex items-center gap-2 text-[#a3e635]">
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="text-[10px] font-bold uppercase">Uploaded</span>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 text-zinc-500">
                        <AlertTriangle className="w-4 h-4" />
                        <span className="text-[10px] font-bold uppercase">Required</span>
                    </div>
                )}
            </div>

            {status === 'uploaded' ? (
                <div className="mt-3 p-2 bg-zinc-900 border border-zinc-800 rounded-sm flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-zinc-400" />
                        <span className="text-xs text-zinc-300 font-mono">{fileName}</span>
                    </div>
                    <button className="text-[10px] text-zinc-500 hover:text-red-500 uppercase font-bold">Remove</button>
                </div>
            ) : (
                <div className="mt-3 border border-dashed border-zinc-700 bg-zinc-900/30 h-16 rounded-sm flex items-center justify-center gap-2 cursor-pointer hover:border-zinc-500 hover:text-white text-zinc-500 transition-all">
                    <Upload className="w-4 h-4" />
                    <span className="text-xs font-mono uppercase">Click to Upload PDF/JPG</span>
                </div>
            )}
        </div>
    )
}
