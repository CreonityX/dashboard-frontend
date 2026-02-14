"use client";

import { useState } from "react";
import { ResourcesShell } from "@/components/widgets/shared/resources/ResourcesShell";

// Tabs
import { CoursesTab } from "@/components/widgets/shared/resources/tabs/CoursesTab";
import { BestPracticesTab } from "@/components/widgets/shared/resources/tabs/BestPracticesTab";
import { ToolsTab } from "@/components/widgets/shared/resources/tabs/ToolsTab";
import { CommunityTab } from "@/components/widgets/shared/resources/tabs/CommunityTab";
import { InsightsTab } from "@/components/widgets/shared/resources/tabs/InsightsTab";
import { NewsTab } from "@/components/widgets/shared/resources/tabs/NewsTab";

export default function ResourcesPage() {
    const [activeTab, setActiveTab] = useState('courses');

    const renderContent = () => {
        switch (activeTab) {
            case 'courses': return <CoursesTab />;
            case 'best-practices': return <BestPracticesTab />;
            case 'tools': return <ToolsTab />;
            case 'community': return <CommunityTab />;
            case 'insights': return <InsightsTab />;
            case 'news': return <NewsTab />;
            default: return <CoursesTab />;
        }
    };

    return (
        <ResourcesShell activeTab={activeTab} onTabChange={setActiveTab}>
            {renderContent()}
        </ResourcesShell>
    );
}
