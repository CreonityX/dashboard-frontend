"use client";

import { SettingsSection, InputGroup, SelectGroup } from "../SettingsComponents";
import { User, Mail, Lock } from "lucide-react";

export function AccountSettings() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Personal Information */}
            <SettingsSection title="Personal Information" description="Manage your public and private identity details.">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputGroup label="Full Name" defaultValue="Kai Zen" />
                    <InputGroup label="Display Name" defaultValue="Kai_Zen" />
                    <InputGroup label="Date of Birth" type="date" defaultValue="1998-05-21" />
                    <SelectGroup
                        label="Gender"
                        options={[
                            { label: 'Prefer not to say', value: 'ns' },
                            { label: 'Male', value: 'm' },
                            { label: 'Female', value: 'f' },
                            { label: 'Non-binary', value: 'nb' }
                        ]}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SelectGroup
                        label="Country / Region"
                        options={[
                            { label: 'United States', value: 'us' },
                            { label: 'United Kingdom', value: 'uk' },
                            { label: 'Japan', value: 'jp' },
                            { label: 'Germany', value: 'de' }
                        ]}
                    />
                    <SelectGroup
                        label="Timezone"
                        options={[
                            { label: '(UTC-08:00) Pacific Time', value: 'pst' },
                            { label: '(UTC+00:00) UTC', value: 'utc' },
                            { label: '(UTC+09:00) Tokyo', value: 'jst' }
                        ]}
                    />
                </div>
            </SettingsSection>

            {/* Email & Contact */}
            <SettingsSection title="Contact Details" description="Verify your communication channels.">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputGroup
                        label="Email Address"
                        type="email"
                        defaultValue="kai.zen@creonity.com"
                        action={<span className="text-[10px] text-[#a3e635] font-mono">VERIFIED</span>}
                    />
                    <InputGroup label="Phone Number" type="tel" defaultValue="+1 (555) 000-0000" />
                </div>
                <div className="flex justify-end">
                    <button className="px-4 py-2 border border-zinc-700 text-xs text-zinc-300 hover:text-white hover:border-white transition-colors font-mono uppercase">
                        Update_Contact_Info
                    </button>
                </div>
            </SettingsSection>

            {/* Password */}
            <SettingsSection title="Security Credentials" description="Update your password periodically to stay secure.">
                <div className="space-y-4 max-w-md">
                    <InputGroup label="Current Password" type="password" placeholder="••••••••" />
                    <div className="grid grid-cols-2 gap-4">
                        <InputGroup label="New Password" type="password" />
                        <InputGroup label="Confirm Password" type="password" />
                    </div>
                    <button className="px-4 py-2 bg-[#a3e635] text-black font-bold text-xs uppercase hover:bg-[#b5f045] transition-colors w-full">
                        Change_Password
                    </button>
                </div>
            </SettingsSection>
        </div>
    );
}
