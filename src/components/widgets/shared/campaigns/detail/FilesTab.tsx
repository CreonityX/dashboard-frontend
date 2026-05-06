"use client";

import { useState } from "react";
import { Download, FolderOpen, Plus, X, Upload } from "lucide-react";
import { toast } from "sonner";

export function FilesTab({ campaignId }: { campaignId: string }) {
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [uploadFolder, setUploadFolder] = useState("Guidelines");
    const [uploadName, setUploadName] = useState("");
    const [files, setFiles] = useState([
        { id: "1", name: "Brand_Guidelines_2026.pdf", folder: "Guidelines", size: "2.4 MB" },
        { id: "2", name: "Logo_Primary.svg", folder: "Logos", size: "45 KB" },
        { id: "3", name: "Product_Shots.zip", folder: "Assets", size: "18 MB" },
    ]);

    const handleDownload = (name: string) => {
        toast.success(`Downloading ${name}`);
    };

    const handleDownloadAll = () => {
        toast.success("Preparing download", { description: `${files.length} files will be packaged as a ZIP.` });
    };

    const handleUpload = () => {
        if (!uploadName.trim()) {
            toast.error("Please enter a file name.");
            return;
        }
        const newFile = {
            id: Date.now().toString(),
            name: uploadName,
            folder: uploadFolder,
            size: "—",
        };
        setFiles(prev => [...prev, newFile]);
        toast.success(`${uploadName} added to ${uploadFolder}`);
        setShowUploadModal(false);
        setUploadName("");
    };

    const folders = ["Guidelines", "Logos", "Assets"];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xs font-bold text-zinc-500 font-display tracking-widest uppercase">Campaign Files</h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => setShowUploadModal(true)}
                        className="flex items-center gap-2 px-3 py-2 bg-zinc-800 border border-zinc-700 text-[10px] font-mono text-zinc-400 rounded-sm hover:border-zinc-600 transition-colors"
                    >
                        <Plus className="w-3 h-3" /> Add files
                    </button>
                    <button
                        onClick={handleDownloadAll}
                        className="flex items-center gap-2 px-3 py-2 bg-[#a3e635]/10 border border-[#a3e635]/30 text-[10px] font-mono text-[#a3e635] rounded-sm hover:bg-[#a3e635]/20 transition-colors"
                    >
                        <Download className="w-3 h-3" /> Download all
                    </button>
                </div>
            </div>
            <div className="space-y-4">
                {folders.map(folder => {
                    const folderFiles = files.filter(f => f.folder === folder);
                    if (folderFiles.length === 0) return null;
                    return (
                        <div key={folder} className="bg-zinc-900/40 border border-zinc-800 rounded-sm overflow-hidden">
                            <div className="flex items-center gap-2 px-4 py-3 bg-zinc-950/30 border-b border-zinc-800">
                                <FolderOpen className="w-4 h-4 text-zinc-500" />
                                <span className="text-xs font-mono text-zinc-400">{folder}</span>
                                <span className="text-[10px] font-mono text-zinc-600 ml-auto">{folderFiles.length} file{folderFiles.length !== 1 ? "s" : ""}</span>
                            </div>
                            <div className="divide-y divide-zinc-800">
                                {folderFiles.map(f => (
                                    <div key={f.id} className="flex items-center justify-between px-4 py-3 hover:bg-zinc-800/20 transition-colors">
                                        <span className="text-[10px] font-mono text-white">{f.name}</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-mono text-zinc-500">{f.size}</span>
                                            <button
                                                onClick={() => handleDownload(f.name)}
                                                className="p-1 text-zinc-500 hover:text-[#a3e635] transition-colors"
                                            >
                                                <Download className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Upload Modal */}
            {showUploadModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowUploadModal(false)} />
                    <div className="relative z-10 w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-sm shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
                            <h3 className="text-sm font-bold text-white font-display uppercase">Add File</h3>
                            <button onClick={() => setShowUploadModal(false)} className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-sm">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="px-6 py-5 space-y-4">
                            <div className="border-2 border-dashed border-zinc-800 rounded-sm p-8 text-center hover:border-zinc-700 transition-colors">
                                <Upload className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
                                <p className="text-[10px] font-mono text-zinc-500">Drop files here or click to browse</p>
                                <p className="text-[9px] font-mono text-zinc-700 mt-1">PDF, SVG, ZIP, PNG, MP4 up to 100MB</p>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-mono text-zinc-500 uppercase">File name</label>
                                <input
                                    autoFocus
                                    type="text"
                                    value={uploadName}
                                    onChange={e => setUploadName(e.target.value)}
                                    onKeyDown={e => e.key === "Enter" && handleUpload()}
                                    placeholder="filename.ext"
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-sm px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#a3e635]/50"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-mono text-zinc-500 uppercase">Folder</label>
                                <select
                                    value={uploadFolder}
                                    onChange={e => setUploadFolder(e.target.value)}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-sm px-3 py-2 text-xs text-zinc-400 font-mono focus:outline-none focus:border-[#a3e635]/50"
                                >
                                    {folders.map(f => <option key={f} value={f}>{f}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="flex gap-3 px-6 py-4 border-t border-zinc-800">
                            <button onClick={() => setShowUploadModal(false)} className="flex-1 py-2 border border-zinc-700 text-zinc-400 text-xs uppercase font-mono rounded-sm transition-colors">Cancel</button>
                            <button
                                onClick={handleUpload}
                                disabled={!uploadName.trim()}
                                className="flex-1 py-2 bg-[#a3e635] text-black font-bold text-xs uppercase rounded-sm hover:bg-[#bef264] disabled:opacity-40 transition-colors flex items-center justify-center gap-2"
                            >
                                <Upload className="w-3.5 h-3.5" /> Add File
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
