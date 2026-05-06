"use client";

import { SettingsSection, ToggleGroup } from "../BrandSettingsComponents";
import { useState } from "react";

export function NotificationSettings() {
    const [emailNotifs, setEmailNotifs] = useState({
        applications: true,
        milestones: true,
        messages: true,
        budget: false,
        news: true
    });

    const [pushNotifs, setPushNotifs] = useState({
        messages: true,
        milestones: true,
        system: false
    });

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SettingsSection title="Email Notifications">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ToggleGroup
                        label="New Creator Applications"
                        description="When a creator applies to your campaign."
                        checked={emailNotifs.applications}
                        onChange={(c) => setEmailNotifs({ ...emailNotifs, applications: c })}
                    />
                    <ToggleGroup
                        label="Campaign Milestones"
                        description="Updates on deliverables and deadlines."
                        checked={emailNotifs.milestones}
                        onChange={(c) => setEmailNotifs({ ...emailNotifs, milestones: c })}
                    />
                    <ToggleGroup
                        label="Creator Messages"
                        description="Direct messages and chat alerts."
                        checked={emailNotifs.messages}
                        onChange={(c) => setEmailNotifs({ ...emailNotifs, messages: c })}
                    />
                    <ToggleGroup
                        label="Budget Alerts"
                        description="When campaign spend reaches 80% of budget."
                        checked={emailNotifs.budget}
                        onChange={(c) => setEmailNotifs({ ...emailNotifs, budget: c })}
                    />
                    <ToggleGroup
                        label="Weekly Performance Digest"
                        description="Summary of campaign ROI and stats."
                        checked={emailNotifs.news}
                        onChange={(c) => setEmailNotifs({ ...emailNotifs, news: c })}
                    />
                </div>
            </SettingsSection>

            <SettingsSection title="Push Notifications">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ToggleGroup
                        label="Direct Messages"
                        checked={pushNotifs.messages}
                        onChange={(c) => setPushNotifs({ ...pushNotifs, messages: c })}
                    />
                    <ToggleGroup
                        label="Task Updates"
                        checked={pushNotifs.milestones}
                        onChange={(c) => setPushNotifs({ ...pushNotifs, milestones: c })}
                    />
                    <ToggleGroup
                        label="System Maintenance"
                        checked={pushNotifs.system}
                        onChange={(c) => setPushNotifs({ ...pushNotifs, system: c })}
                    />
                </div>
            </SettingsSection>
        </div>
    );
}
