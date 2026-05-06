"use client";

import { SupportSection } from "@/components/widgets/shared/support/BrandSupportComponents";
import { Mail, Phone, MapPin, MessageSquare, Twitter, Globe, Clock, ShieldCheck } from "lucide-react";

export function ContactSupport() {
    return (
        <div className="max-w-4xl mx-auto pb-20 animate-in fade-in zoom-in-95 duration-500 space-y-8">
            <div className="p-6 border border-[#a3e635]/20 bg-[#a3e635]/5 rounded-sm mb-6 flex items-start gap-4">
                <div className="p-3 bg-[#a3e635]/20 rounded-full border border-[#a3e635]/30 mt-1">
                    <MessageSquare className="w-6 h-6 text-[#a3e635]" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-white font-display uppercase tracking-wide">Get in Touch</h2>
                    <p className="text-sm text-zinc-400 font-mono mt-1">We're here to help you scale. Reach out to our dedicated brand support team.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SupportSection title="Direct Channels">
                    <div className="grid gap-4">
                        <ContactCard
                            icon={Mail}
                            title="Email Support"
                            value="brands@creonity.com"
                            desc="Average response time: 2 hours"
                            action="Send Email"
                        />
                        <ContactCard
                            icon={Phone}
                            title="Enterprise Hotline"
                            value="+1 (888) 555-0123"
                            desc="Mon-Fri, 9am - 6pm EST"
                            action="Call Now"
                        />
                    </div>
                </SupportSection>

                <SupportSection title="Other Ways to Connect">
                    <div className="grid gap-4">
                        <ContactCard
                            icon={Twitter}
                            title="Twitter Support"
                            value="@creonity_help"
                            desc="Quick updates & status alerts"
                            action="Follow"
                        />
                        <ContactCard
                            icon={Globe}
                            title="Community Forum"
                            value="community.creonity.com"
                            desc="Connect with other brands & creators"
                            action="Visit"
                        />
                    </div>
                </SupportSection>
            </div>

            <SupportSection title="Global Offices">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <OfficeCard city="San Francisco" address="548 Market St, CA 94104" time="PST (UTC-8)" />
                    <OfficeCard city="London" address="71-75 Shelton St, WC2H" time="GMT (UTC+0)" />
                    <OfficeCard city="Singapore" address="1 Raffles Place, 048616" time="SGT (UTC+8)" />
                </div>
            </SupportSection>
        </div>
    );
}

function ContactCard({ icon: Icon, title, value, desc, action }: { icon: any, title: string, value: string, desc: string, action: string }) {
    return (
        <div className="flex items-start gap-4 p-4 border border-white/5 bg-zinc-900/40 rounded-sm hover:bg-zinc-900/60 transition-colors group">
            <div className="p-2.5 bg-zinc-800 rounded-sm group-hover:bg-zinc-700 transition-colors">
                <Icon className="w-5 h-5 text-zinc-400 group-hover:text-white" />
            </div>
            <div className="flex-1">
                <h4 className="text-xs font-bold text-zinc-500 uppercase font-mono mb-1">{title}</h4>
                <div className="text-sm font-bold text-white mb-1 group-hover:text-[#a3e635] transition-colors">{value}</div>
                <div className="text-[10px] text-zinc-600 font-mono mb-3">{desc}</div>
                <button className="text-[10px] font-bold text-[#a3e635] uppercase border border-[#a3e635]/30 bg-[#a3e635]/5 px-3 py-1.5 rounded-sm hover:bg-[#a3e635]/10 transition-colors">
                    {action}
                </button>
            </div>
        </div>
    );
}

function OfficeCard({ city, address, time }: { city: string, address: string, time: string }) {
    return (
        <div className="p-4 border border-white/5 bg-zinc-900/20 rounded-sm hover:border-zinc-700 transition-colors">
            <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-3 h-3 text-zinc-500" />
                <h4 className="text-sm font-bold text-white uppercase">{city}</h4>
            </div>
            <p className="text-xs text-zinc-400 mb-2 leading-relaxed">{address}</p>
            <div className="flex items-center gap-1.5 text-[10px] text-zinc-600 font-mono">
                <Clock className="w-3 h-3" />
                <span>{time}</span>
            </div>
        </div>
    );
}
