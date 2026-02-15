import { Briefcase, ArrowUpRight, CheckCircle2, DollarSign, BarChart } from "lucide-react";

const CAMPAIGNS = [
    { id: 1, brand: 'Nike', name: 'Air Max Launch', status: 'Active', reach: '1.2M', engagement: '5.4%', roi: '450%', conversions: 342 },
    { id: 2, brand: 'Samsung', name: 'Galaxy Unpacked', status: 'Completed', reach: '2.5M', engagement: '4.2%', roi: '320%', conversions: 890 },
    { id: 3, brand: 'Adidas', name: 'Originals Series', status: 'Review', reach: '800K', engagement: '6.1%', roi: '210%', conversions: 120 },
    { id: 4, brand: 'Sony', name: 'Alpha Camera Promo', status: 'Completed', reach: '500K', engagement: '8.5%', roi: '550%', conversions: 450 },
];

export function CampaignsTab() {
    return (
        <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-sm flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#a3e635]/10 flex items-center justify-center border border-[#a3e635]/20">
                        <DollarSign className="w-5 h-5 text-[#a3e635]" />
                    </div>
                    <div>
                        <div className="text-[10px] text-zinc-500 font-mono uppercase">Total Earnings</div>
                        <div className="text-xl font-bold text-white">$45,200</div>
                    </div>
                </div>
                <div className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-sm flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                        <BarChart className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                        <div className="text-[10px] text-zinc-500 font-mono uppercase">Avg. Campaign ROI</div>
                        <div className="text-xl font-bold text-white">380%</div>
                    </div>
                </div>
                <div className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-sm flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                        <Briefcase className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                        <div className="text-[10px] text-zinc-500 font-mono uppercase">Active Deals</div>
                        <div className="text-xl font-bold text-white">3</div>
                    </div>
                </div>
            </div>

            {/* Campaign List */}
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-zinc-800 bg-zinc-900/60 flex justify-between items-center">
                    <h3 className="text-xs font-bold text-zinc-300 font-display tracking-widest uppercase">Recent_Activity</h3>
                    <button className="text-[10px] text-[#a3e635] hover:underline font-mono">EXPORT_CSV</button>
                </div>

                <div className="divide-y divide-zinc-800">
                    {/* Header Row */}
                    <div className="grid grid-cols-6 px-4 py-2 bg-zinc-950/30 text-[9px] font-mono text-zinc-500 uppercase tracking-wider">
                        <div className="col-span-2">Campaign / Brand</div>
                        <div className="text-center">Status</div>
                        <div className="text-center">Reach</div>
                        <div className="text-center">Engagement</div>
                        <div className="text-center">ROI</div>
                    </div>

                    {CAMPAIGNS.map(campaign => (
                        <div key={campaign.id} className="grid grid-cols-6 px-4 py-4 items-center hover:bg-zinc-800/30 transition-colors">
                            <div className="col-span-2">
                                <div className="text-xs font-bold text-white">{campaign.name}</div>
                                <div className="text-[10px] text-zinc-500 font-mono">{campaign.brand}</div>
                            </div>
                            <div className="text-center">
                                <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-sm border ${campaign.status === 'Active' ? 'bg-[#a3e635]/10 text-[#a3e635] border-[#a3e635]/20' :
                                        campaign.status === 'Completed' ? 'bg-zinc-800 text-zinc-400 border-zinc-700' : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                                    }`}>
                                    {campaign.status.toUpperCase()}
                                </span>
                            </div>
                            <div className="text-center text-xs text-zinc-300 font-mono">{campaign.reach}</div>
                            <div className="text-center text-xs text-zinc-300 font-mono">{campaign.engagement}</div>
                            <div className="text-center">
                                <span className="text-xs font-bold text-[#a3e635]">{campaign.roi}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
