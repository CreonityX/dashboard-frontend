"use client";

import { ProfileSection } from "@/components/widgets/shared/profile/ProfileComponents";

export function ExpertiseSection() {
    return (
        <ProfileSection title="Core Competencies">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h4 className="text-xs font-bold text-zinc-500 font-mono uppercase mb-3">Primary Disciplines</h4>
                    <div className="flex flex-wrap gap-2">
                        {['3D Motion Design', 'Visual Effects', 'Art Direction', 'Brand Identity'].map((tag) => (
                            <span key={tag} className="px-3 py-1 bg-zinc-800 border border-zinc-700 rounded-full text-xs text-white">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
                <div>
                    <h4 className="text-xs font-bold text-zinc-500 font-mono uppercase mb-3">Software Stack</h4>
                    <div className="flex flex-wrap gap-2">
                        {['Cinema 4D', 'Houdini', 'Octane Render', 'After Effects', 'Figma'].map((tag) => (
                            <span key={tag} className="px-3 py-1 bg-zinc-900/50 border border-zinc-800 rounded-sm text-[10px] text-zinc-400 font-mono">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </ProfileSection>
    );
}
