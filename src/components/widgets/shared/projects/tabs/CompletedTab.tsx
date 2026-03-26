import { useMemo } from "react";
import { Download, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useProjectsMvp } from "@/components/widgets/shared/projects/ProjectsMvpContext";

export function CompletedTab() {
    const { completedProjects } = useProjectsMvp();

    const lifetimeEarnings = useMemo(() => {
        const total = completedProjects.reduce((sum, project) => {
            const value = Number(project.earned.replace(/[$,]/g, ""));
            return sum + (Number.isNaN(value) ? 0 : value);
        }, 0);
        return `$${total.toLocaleString()}`;
    }, [completedProjects]);

    const exportPortfolio = () => {
        if (typeof window === "undefined") return;
        const data = JSON.stringify(completedProjects, null, 2);
        const blob = new Blob([data], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = "completed-projects-portfolio.json";
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center gap-3 flex-wrap">
                <p className="text-zinc-500 font-mono text-xs">LIFETIME_EARNINGS // {lifetimeEarnings}</p>
                <button
                    onClick={exportPortfolio}
                    className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-sm text-[10px] font-mono text-zinc-400 hover:text-white transition-colors uppercase"
                >
                    <Download className="w-3 h-3" /> Export_Portfolio
                </button>
            </div>

            <div className="bg-zinc-900/40 border border-zinc-800 rounded-sm overflow-hidden text-sm">
                <div className="grid grid-cols-12 px-6 py-3 bg-zinc-950/30 text-[10px] font-mono text-zinc-500 uppercase tracking-wider border-b border-zinc-800">
                    <div className="col-span-4">Campaign</div>
                    <div className="col-span-3">Date Completed</div>
                    <div className="col-span-2 text-right">Earned</div>
                    <div className="col-span-3 text-center">Rating</div>
                </div>

                <div className="divide-y divide-zinc-800">
                    {completedProjects.map((project) => (
                        <div key={project.id} className="grid grid-cols-12 px-6 py-4 items-center hover:bg-zinc-800/30 transition-colors group">
                            <div className="col-span-4 flex items-center gap-3">
                                <div className={cn("w-8 h-8 rounded-sm flex items-center justify-center text-[10px] font-bold border border-zinc-700/50", project.logoBg)}>
                                    {project.brand[0]}
                                </div>
                                <div>
                                    <div className="font-bold text-white text-xs">{project.campaign}</div>
                                    <div className="text-[10px] text-zinc-500 font-mono">{project.brand}</div>
                                </div>
                            </div>

                            <div className="col-span-3 text-xs text-zinc-400 font-mono">{project.date}</div>

                            <div className="col-span-2 text-right">
                                <span className="font-bold text-[#a3e635] font-mono text-xs">{project.earned}</span>
                            </div>

                            <div className="col-span-3 flex justify-center gap-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star key={i} className={cn("w-3 h-3", i < project.rating ? "text-yellow-500 fill-yellow-500" : "text-zinc-700")} />
                                ))}
                            </div>
                        </div>
                    ))}

                    {completedProjects.length === 0 && (
                        <div className="px-6 py-8 text-center text-zinc-400 text-sm">No completed projects yet.</div>
                    )}
                </div>
            </div>
        </div>
    );
}
