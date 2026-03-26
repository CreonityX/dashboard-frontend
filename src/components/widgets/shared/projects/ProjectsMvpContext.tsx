"use client";

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

export type Opportunity = {
    id: number;
    brand: string;
    title: string;
    type: string;
    budget: string;
    deadline: string;
    match: number;
    tags: string[];
    industry: string;
    verified: boolean;
    logoBg: string;
    postedAt: string;
    description: string;
    deliverables: string[];
};

export type ApplicationStatus = "under_review" | "shortlisted" | "interview" | "rejected";
export type TaskStatus = "todo" | "progress" | "review" | "done";
export type InvitationStatus = "pending" | "accepted" | "declined";

export type ApplicationEntry = {
    opportunityId: number;
    appliedOn: string;
    status: ApplicationStatus;
    viewed: boolean;
};

export type ActiveTask = {
    id: number;
    opportunityId: number;
    title: string;
    brand: string;
    due: string;
    status: TaskStatus;
    logoBg: string;
};

export type CompletedProject = {
    id: number;
    brand: string;
    campaign: string;
    date: string;
    earned: string;
    rating: number;
    logoBg: string;
};

export type Invitation = {
    id: number;
    brand: string;
    title: string;
    offer: string;
    message: string;
    deadline: string;
    logoBg: string;
    status: InvitationStatus;
};

type ProjectsState = {
    opportunities: Opportunity[];
    savedIds: number[];
    applications: ApplicationEntry[];
    activeTasks: ActiveTask[];
    completedProjects: CompletedProject[];
    invitations: Invitation[];
};

const STORAGE_KEY = "projects_mvp_state_v1";

const INITIAL_OPPORTUNITIES: Opportunity[] = [
    {
        id: 1,
        brand: "Nike",
        title: "Air Max 2026 Launch Campaign",
        type: "Instagram Reel",
        budget: "$2,500 - $4,000",
        deadline: "Mar 15",
        match: 98,
        tags: ["Fitness", "Fashion"],
        industry: "Beauty & Fashion",
        verified: true,
        logoBg: "bg-black text-white",
        postedAt: "2026-03-22",
        description: "Launch-focused campaign for Air Max with high-energy short-form storytelling.",
        deliverables: ["1 Reel", "3 Story frames", "Usage rights: 30 days"]
    },
    {
        id: 2,
        brand: "Samsung",
        title: "Galaxy S26 Ultra Review",
        type: "YouTube Video",
        budget: "$5,000 - $8,000",
        deadline: "Feb 28",
        match: 95,
        tags: ["Tech", "Lifestyle"],
        industry: "Tech & Gaming",
        verified: true,
        logoBg: "bg-blue-600 text-white",
        postedAt: "2026-03-18",
        description: "Product review series with performance benchmarks and camera deep-dive.",
        deliverables: ["1 Long-form video", "1 Short teaser", "Affiliate link placement"]
    },
    {
        id: 3,
        brand: "Sephora",
        title: "Spring Beauty Haul",
        type: "TikTok Series",
        budget: "$1,200 - $2,000",
        deadline: "Mar 10",
        match: 88,
        tags: ["Beauty", "Makeup"],
        industry: "Beauty & Fashion",
        verified: true,
        logoBg: "bg-black text-white",
        postedAt: "2026-03-16",
        description: "Seasonal beauty campaign with trend-forward styling for spring audience.",
        deliverables: ["3 TikTok videos", "1 GRWM angle", "Brand mention in captions"]
    },
    {
        id: 4,
        brand: "Spotify",
        title: "Podcast Promotion",
        type: "Instagram Story",
        budget: "$800 - $1,500",
        deadline: "Mar 05",
        match: 82,
        tags: ["Music", "Entertainment"],
        industry: "Lifestyle",
        verified: true,
        logoBg: "bg-[#1DB954] text-black",
        postedAt: "2026-03-12",
        description: "Drive podcast discovery with concise talking points and swipe-up CTA.",
        deliverables: ["2 Story sets", "CTA link sticker", "Tag @spotify"]
    },
    {
        id: 5,
        brand: "HelloFresh",
        title: "Healthy Eating Challenge",
        type: "YouTube Integration",
        budget: "$3,000 - $5,000",
        deadline: "Mar 20",
        match: 92,
        tags: ["Food", "Health"],
        industry: "Food & Drink",
        verified: true,
        logoBg: "bg-[#96c11f] text-black",
        postedAt: "2026-03-10",
        description: "Challenge-based healthy meal content designed for family-focused audiences.",
        deliverables: ["1 Integration", "1 Recipe short", "Promo code mention"]
    },
    {
        id: 6,
        brand: "Squarespace",
        title: "Website Builder Showcase",
        type: "YouTube Integration",
        budget: "$2,500 - $4,500",
        deadline: "Apr 01",
        match: 85,
        tags: ["Tech", "Business"],
        industry: "Tech & Gaming",
        verified: true,
        logoBg: "bg-white text-black",
        postedAt: "2026-03-08",
        description: "Case-study format showcase highlighting conversion and website speed gains.",
        deliverables: ["1 Integration", "Landing page link", "Pinned comment CTA"]
    }
];

const INITIAL_STATE: ProjectsState = {
    opportunities: INITIAL_OPPORTUNITIES,
    savedIds: [4, 6],
    applications: [
        { opportunityId: 2, appliedOn: "Feb 10, 2026", status: "shortlisted", viewed: true },
        { opportunityId: 5, appliedOn: "Feb 12, 2026", status: "under_review", viewed: true },
        { opportunityId: 3, appliedOn: "Feb 05, 2026", status: "interview", viewed: true }
    ],
    activeTasks: [
        { id: 2001, opportunityId: 2, title: "Film Unboxing Video", brand: "Samsung", due: "Feb 28", status: "progress", logoBg: "bg-blue-600 text-white" },
        { id: 2002, opportunityId: 3, title: "Submit Raw Footage", brand: "Sephora", due: "Tomorrow", status: "review", logoBg: "bg-black text-white" },
        { id: 2003, opportunityId: 5, title: "Draft Story Concepts", brand: "HelloFresh", due: "Mar 02", status: "todo", logoBg: "bg-[#96c11f] text-black" }
    ],
    completedProjects: [
        { id: 3001, brand: "Coca-Cola", campaign: "Summer Vibes", date: "Jan 15, 2026", earned: "$3,500", rating: 5, logoBg: "bg-red-600 text-white" },
        { id: 3002, brand: "Sony", campaign: "PS5 Pro Launch", date: "Dec 20, 2025", earned: "$5,000", rating: 4, logoBg: "bg-black text-white" }
    ],
    invitations: [
        {
            id: 4001,
            brand: "Dyson",
            title: "Product Launch - Tech Reviewer",
            offer: "$3,500",
            message: "We love your recent tech content and think you'd be perfect for our new Airwrap launch campaign.",
            deadline: "Respond by Feb 20",
            logoBg: "bg-black text-white",
            status: "pending"
        },
        {
            id: 4002,
            brand: "Canva",
            title: "Design Tutorials Series",
            offer: "$2,000",
            message: "Looking for creators to showcase our new AI magic edit features.",
            deadline: "Respond by Feb 18",
            logoBg: "bg-[#00C4CC] text-white",
            status: "pending"
        }
    ]
};

type ProjectsMvpContextValue = {
    isLoading: boolean;
    opportunities: Opportunity[];
    savedIds: number[];
    applications: ApplicationEntry[];
    activeTasks: ActiveTask[];
    completedProjects: CompletedProject[];
    invitations: Invitation[];
    savedOpportunities: Opportunity[];
    appliedOpportunities: Opportunity[];
    toggleSave: (opportunityId: number) => void;
    applyToOpportunity: (opportunityId: number) => void;
    removeApplication: (opportunityId: number) => void;
    updateTaskStatus: (taskId: number, status: TaskStatus) => void;
    completeTask: (taskId: number) => void;
    reopenCompleted: (projectId: number) => void;
    acceptInvitation: (invitationId: number) => void;
    declineInvitation: (invitationId: number) => void;
};

const ProjectsMvpContext = createContext<ProjectsMvpContextValue | undefined>(undefined);

function parseBudgetToEarned(budget: string) {
    const values = [...budget.matchAll(/\$([\d,]+)/g)].map((match) => Number(match[1].replace(/,/g, "")));
    if (values.length === 0) return "$1,000";
    if (values.length === 1) return `$${values[0].toLocaleString()}`;
    const average = Math.round((values[0] + values[1]) / 2);
    return `$${average.toLocaleString()}`;
}

function getInitialState(): ProjectsState {
    if (typeof window === "undefined") return INITIAL_STATE;

    try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (!stored) return INITIAL_STATE;
        const parsed = JSON.parse(stored) as ProjectsState;

        if (!parsed.opportunities || !parsed.activeTasks || !parsed.completedProjects) {
            return INITIAL_STATE;
        }

        return parsed;
    } catch {
        return INITIAL_STATE;
    }
}

export function ProjectsMvpProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<ProjectsState>(getInitialState);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 350);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return;
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }, [state]);

    const opportunityById = useMemo(() => {
        const map = new Map<number, Opportunity>();
        state.opportunities.forEach((item) => map.set(item.id, item));
        return map;
    }, [state.opportunities]);

    const savedOpportunities = useMemo(
        () => state.savedIds.map((id) => opportunityById.get(id)).filter(Boolean) as Opportunity[],
        [opportunityById, state.savedIds]
    );

    const appliedOpportunities = useMemo(
        () => state.applications.map((entry) => opportunityById.get(entry.opportunityId)).filter(Boolean) as Opportunity[],
        [opportunityById, state.applications]
    );

    const toggleSave = (opportunityId: number) => {
        setState((current) => ({
            ...current,
            savedIds: current.savedIds.includes(opportunityId)
                ? current.savedIds.filter((id) => id !== opportunityId)
                : [...current.savedIds, opportunityId]
        }));
    };

    const applyToOpportunity = (opportunityId: number) => {
        setState((current) => {
            if (current.applications.some((item) => item.opportunityId === opportunityId)) {
                return current;
            }

            const opportunity = current.opportunities.find((item) => item.id === opportunityId);
            if (!opportunity) return current;

            const createdTask: ActiveTask = {
                id: Date.now(),
                opportunityId,
                brand: opportunity.brand,
                title: `Kickoff: ${opportunity.title}`,
                due: opportunity.deadline,
                status: "todo",
                logoBg: opportunity.logoBg
            };

            return {
                ...current,
                applications: [
                    ...current.applications,
                    {
                        opportunityId,
                        appliedOn: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
                        status: "under_review",
                        viewed: false
                    }
                ],
                activeTasks: [createdTask, ...current.activeTasks]
            };
        });
    };

    const removeApplication = (opportunityId: number) => {
        setState((current) => ({
            ...current,
            applications: current.applications.filter((item) => item.opportunityId !== opportunityId),
            activeTasks: current.activeTasks.filter((task) => task.opportunityId !== opportunityId)
        }));
    };

    const updateTaskStatus = (taskId: number, status: TaskStatus) => {
        setState((current) => ({
            ...current,
            activeTasks: current.activeTasks.map((task) =>
                task.id === taskId ? { ...task, status } : task
            )
        }));
    };

    const completeTask = (taskId: number) => {
        setState((current) => {
            const task = current.activeTasks.find((item) => item.id === taskId);
            if (!task) return current;

            const opportunity = current.opportunities.find((item) => item.id === task.opportunityId);
            const completed: CompletedProject = {
                id: Date.now(),
                brand: task.brand,
                campaign: opportunity?.title || task.title,
                date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
                earned: parseBudgetToEarned(opportunity?.budget || "$1,000 - $2,000"),
                rating: 5,
                logoBg: task.logoBg
            };

            return {
                ...current,
                activeTasks: current.activeTasks.filter((item) => item.id !== taskId),
                completedProjects: [completed, ...current.completedProjects]
            };
        });
    };

    const reopenCompleted = (projectId: number) => {
        setState((current) => {
            const project = current.completedProjects.find((item) => item.id === projectId);
            if (!project) return current;

            const reopenedTask: ActiveTask = {
                id: Date.now(),
                opportunityId: -projectId,
                title: `Revision: ${project.campaign}`,
                brand: project.brand,
                due: "Next week",
                status: "todo",
                logoBg: project.logoBg
            };

            return {
                ...current,
                completedProjects: current.completedProjects.filter((item) => item.id !== projectId),
                activeTasks: [reopenedTask, ...current.activeTasks]
            };
        });
    };

    const acceptInvitation = (invitationId: number) => {
        setState((current) => {
            const invitation = current.invitations.find((item) => item.id === invitationId);
            if (!invitation || invitation.status !== "pending") return current;

            return {
                ...current,
                invitations: current.invitations.map((item) =>
                    item.id === invitationId ? { ...item, status: "accepted" } : item
                ),
                activeTasks: [
                    {
                        id: Date.now(),
                        opportunityId: -invitationId,
                        title: invitation.title,
                        brand: invitation.brand,
                        due: invitation.deadline.replace("Respond by ", "Due "),
                        status: "todo",
                        logoBg: invitation.logoBg
                    },
                    ...current.activeTasks
                ]
            };
        });
    };

    const declineInvitation = (invitationId: number) => {
        setState((current) => ({
            ...current,
            invitations: current.invitations.map((item) =>
                item.id === invitationId ? { ...item, status: "declined" } : item
            )
        }));
    };

    return (
        <ProjectsMvpContext.Provider
            value={{
                isLoading,
                opportunities: state.opportunities,
                savedIds: state.savedIds,
                applications: state.applications,
                activeTasks: state.activeTasks,
                completedProjects: state.completedProjects,
                invitations: state.invitations,
                savedOpportunities,
                appliedOpportunities,
                toggleSave,
                applyToOpportunity,
                removeApplication,
                updateTaskStatus,
                completeTask,
                reopenCompleted,
                acceptInvitation,
                declineInvitation
            }}
        >
            {children}
        </ProjectsMvpContext.Provider>
    );
}

export function useProjectsMvp() {
    const context = useContext(ProjectsMvpContext);
    if (!context) {
        throw new Error("useProjectsMvp must be used within a ProjectsMvpProvider");
    }
    return context;
}
