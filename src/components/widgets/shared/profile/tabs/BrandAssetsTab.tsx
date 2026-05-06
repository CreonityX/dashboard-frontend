"use client";

import { ProfileSection } from "@/components/widgets/shared/profile/ProfileComponents";
import { Download, FileImage, FileText, Image as ImageIcon, Package, Upload } from "lucide-react";

export function BrandAssetsTab() {
    return (
        <div className="max-w-4xl mx-auto px-6 pb-20 animate-in fade-in zoom-in-95 duration-500 space-y-8">
            <div className="p-4 border border-zinc-800 bg-zinc-900/50 rounded-sm mb-8">
                <p className="text-xs text-zinc-400">
                    Assets uploaded here will be available to creators you work with. keeping these updated ensures brand consistency.
                </p>
            </div>

            <ProfileSection title="Core Identity">
                <div className="space-y-3">
                    <AssetRow
                        name="Brand Guidelines 2026.pdf"
                        size="2.4 MB"
                        type="PDF"
                        icon={FileText}
                        date="Updated 2 days ago"
                    />
                    <AssetRow
                        name="Logo Pack (Vector + PNG)"
                        size="15.8 MB"
                        type="ZIP"
                        icon={Package}
                        date="Updated Jun 2025"
                    />
                </div>
            </ProfileSection>

            <ProfileSection title="Product Imagery">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <ImagePreview name="Summer_Collection_Hero.jpg" />
                    <ImagePreview name="Product_Detail_Shot.jpg" />
                    <ImagePreview name="Lifestyle_Shoot_01.jpg" />
                    <UploadPlaceholder />
                </div>
            </ProfileSection>

            <ProfileSection title="Marketing Materials">
                <div className="space-y-3">
                    <AssetRow
                        name="Campaign Brief Template"
                        size="150 KB"
                        type="DOCX"
                        icon={FileText}
                        date="Updated Jan 2026"
                    />
                </div>
            </ProfileSection>
        </div>
    );
}

function AssetRow({ name, size, type, icon: Icon, date }: { name: string, size: string, type: string, icon: any, date: string }) {
    return (
        <div className="flex items-center justify-between p-4 border border-white/5 bg-white/[0.02] rounded-sm hover:bg-white/[0.05] transition-colors group cursor-pointer">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-zinc-800 rounded-sm flex items-center justify-center">
                    <Icon className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
                </div>
                <div>
                    <h4 className="text-sm font-bold text-white mb-0.5 group-hover:underline decoration-[#a3e635] underline-offset-4">{name}</h4>
                    <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-mono">
                        <span className="px-1.5 py-0.5 bg-zinc-800 rounded-sm text-zinc-300">{type}</span>
                        <span>{size}</span>
                        <span>•</span>
                        <span>{date}</span>
                    </div>
                </div>
            </div>
            <button className="p-2 text-zinc-500 hover:text-[#a3e635] transition-colors border border-transparent hover:border-[#a3e635]/20 rounded-sm">
                <Download className="w-5 h-5" />
            </button>
        </div>
    )
}

function ImagePreview({ name }: { name: string }) {
    return (
        <div className="aspect-square bg-zinc-900 border border-zinc-800 rounded-sm relative group overflow-hidden cursor-pointer">
            <div className="absolute inset-0 flex items-center justify-center p-4">
                <FileImage className="w-8 h-8 text-zinc-700" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-2 bg-black/80 backdrop-blur-sm truncate text-[10px] text-zinc-300 font-mono border-t border-white/10">
                {name}
            </div>
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Download className="w-5 h-5 text-white" />
            </div>
        </div>
    )
}

function UploadPlaceholder() {
    return (
        <div className="aspect-square border border-dashed border-zinc-700 bg-zinc-900/20 rounded-sm flex flex-col items-center justify-center gap-2 text-zinc-500 hover:text-white hover:border-zinc-500 transition-colors cursor-pointer">
            <Upload className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase">Upload</span>
        </div>
    )
}
