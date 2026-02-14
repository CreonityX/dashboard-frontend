"use client";

import { SettingsSection, ToggleGroup } from "../SettingsComponents";

export function NotificationSettings() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Email */}
            <SettingsSection title="Email Notifications" description="Manage what you receive in your inbox.">
                <div className="space-y-2">
                    <ToggleGroup label="New Gig Matches" description="Daily digest of opportunities matching your skills." checked={true} onChange={() => { }} />
                    <ToggleGroup label="Application Updates" checked={true} onChange={() => { }} />
                    <ToggleGroup label="Messages from Brands" checked={true} onChange={() => { }} />
                    <ToggleGroup label="Payment Notifications" checked={true} onChange={() => { }} />
                    <ToggleGroup label="Platform Announcements" checked={false} onChange={() => { }} />
                </div>
            </SettingsSection>

            {/* In-App */}
            <SettingsSection title="In-App Notifications" description="Real-time alerts within the dashboard.">
                <div className="space-y-2">
                    <ToggleGroup label="Desktop Notifications" description="Show browser alerts when app is in background." checked={true} onChange={() => { }} />
                    <ToggleGroup label="Sound Effects" checked={false} onChange={() => { }} />
                    <ToggleGroup label="Badge Counts" description="Show unread count on app icon." checked={true} onChange={() => { }} />
                </div>
            </SettingsSection>
        </div>
    );
}
