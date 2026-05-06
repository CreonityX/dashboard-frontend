"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion as fMotion, AnimatePresence } from "framer-motion";
import { Check, X, ArrowRight, ArrowLeft, Image as ImageIcon, Briefcase, Target, Users, MapPin, Link as LinkIcon, DollarSign, Camera, Globe, MonitorPlay, Instagram, Twitter, Youtube, CheckCircle2, Building2 } from "lucide-react";
import { useUser, User } from "@/lib/UserContext";

// Component wrapper for useSearchParams to avoid Next.js build errors
export default function OnboardingPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black" />}>
            <OnboardingFlow />
        </Suspense>
    );
}

function OnboardingFlow() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { completeOnboarding } = useUser();

    // Init from URL or defaults
    const [role, setRole] = useState<"creator" | "brand">((searchParams.get("role") as any) || "creator");
    const [email, setEmail] = useState(searchParams.get("email") || "");
    const [name, setName] = useState(searchParams.get("name") || "");

    const [step, setStep] = useState(1);
    const totalSteps = role === "creator" ? 7 : 6;

    // Form State
    const [password, setPassword] = useState("");
    const [location, setLocation] = useState("");
    const [username, setUsername] = useState(name.toLowerCase().replace(/\s+/g, '_'));
    const [bio, setBio] = useState("");
    const [niches, setNiches] = useState<string[]>([]);
    const [contentTypes, setContentTypes] = useState<string[]>([]);
    const [socialLinks, setSocialLinks] = useState({ instagram: "", tiktok: "", youtube: "" });
    const [baseRate, setBaseRate] = useState("");
    const [portfolioUrl, setPortfolioUrl] = useState("");
    const [industry, setIndustry] = useState("");
    const [website, setWebsite] = useState("");
    const [primaryGoal, setPrimaryGoal] = useState("");
    const [budgetRange, setBudgetRange] = useState("");
    const [expectedActivations, setExpectedActivations] = useState("");

    // Step 1 validation
    const pwdReqs = {
        length: password.length >= 8,
        number: /\d/.test(password),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        upper: /[A-Z]/.test(password)
    };
    const isPasswordValid = Object.values(pwdReqs).every(Boolean);

    const handleNext = () => setStep(prev => Math.min(prev + 1, totalSteps));
    const handlePrev = () => setStep(prev => Math.max(prev - 1, 1));

    const handleComplete = async () => {
        const userData: User = {
            id: Math.random().toString(36).substr(2, 9),
            name,
            displayName: username || name,
            email,
            role,
            badge: role === "creator" ? "NEW_CREATOR" : "NEW_BRAND",
            initials: name.substring(0, 2).toUpperCase(),
            location,
            bio,
            niches,
            contentTypes,
            baseRate,
            portfolioUrl,
            industry,
            website,
            primaryGoal,
            budgetRange,
            expectedActivations,
            socialLinks: [
                { platform: "instagram", connected: !!socialLinks.instagram, url: socialLinks.instagram },
                { platform: "tiktok", connected: !!socialLinks.tiktok, url: socialLinks.tiktok },
                { platform: "youtube", connected: !!socialLinks.youtube, url: socialLinks.youtube }
            ].filter(s => s.connected)
        };
        await completeOnboarding(userData);
    };

    const isStepValid = () => {
        if (step === 1) return isPasswordValid;
        if (role === "creator") {
            if (step === 2) return username.length > 2 && location.length > 2;
            if (step === 3) return niches.length > 0 && contentTypes.length > 0;
            if (step === 4) return socialLinks.instagram || socialLinks.tiktok || socialLinks.youtube; // min 1 mandatory
            if (step === 5) return baseRate.length > 0;
            if (step === 6) return bio.length > 10;
        } else {
            if (step === 2) return website.length > 4 && location.length > 2;
            if (step === 3) return industry.length > 2 && primaryGoal !== "";
            if (step === 4) return niches.length > 0; // target niches
            if (step === 5) return budgetRange !== "" && expectedActivations !== "";
        }
        return true;
    };

    const accent = role === "creator" ? "#a3e635" : "#8b5cf6";
    const accentClass = role === "creator" ? "text-[#a3e635]" : "text-[#8b5cf6]";
    const bgAccentClass = role === "creator" ? "bg-[#a3e635]" : "bg-[#8b5cf6]";
    const borderAccentClass = role === "creator" ? "border-[#a3e635]" : "border-[#8b5cf6]";

    return (
        <div className="min-h-screen bg-black text-white font-mono flex flex-col relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
            <div className="absolute inset-0 bg-grid-zinc opacity-30 pointer-events-none" />
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] ${role === 'creator' ? 'bg-[#a3e635]' : 'bg-[#8b5cf6]'} opacity-[0.03] rounded-full blur-[150px] pointer-events-none`} />

            {/* Header & Progress */}
            <div className="w-full max-w-3xl mx-auto pt-12 px-6 relative z-10">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-zinc-900 border border-zinc-800 rounded-sm flex items-center justify-center">
                            <div className={`w-3 h-3 ${bgAccentClass} rounded-full animate-pulse-glow shadow-[0_0_10px_currentColor] ${accentClass}`} />
                        </div>
                        <span className="font-display font-bold text-xl tracking-tight">CREONITY</span>
                    </div>
                    <div className="text-xs text-zinc-500 uppercase tracking-widest">
                        Step {step} of {totalSteps}
                    </div>
                </div>

                <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
                    <fMotion.div 
                        className={`h-full ${bgAccentClass}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${(step / totalSteps) * 100}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 w-full max-w-2xl mx-auto px-6 py-12 flex flex-col relative z-10">
                <AnimatePresence mode="wait">
                    <fMotion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="flex-1 flex flex-col"
                    >
                        {/* ----------------- STEP 1: SECURITY ----------------- */}
                        {step === 1 && (
                            <div className="space-y-8">
                                <div>
                                    <h1 className="text-3xl font-display font-bold mb-2">Welcome, {name.split(' ')[0]}</h1>
                                    <p className="text-zinc-400 text-sm">Let's secure your account before we build your profile.</p>
                                </div>
                                
                                <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-xl space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs text-zinc-500 uppercase tracking-widest">Email Address</label>
                                        <input type="text" disabled value={email} className="w-full bg-zinc-900 border border-zinc-800 text-zinc-500 rounded-md py-3 px-4 text-sm" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs text-zinc-500 uppercase tracking-widest">Create Password</label>
                                        <input 
                                            type="password" 
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            className={`w-full bg-black border ${isPasswordValid ? borderAccentClass : 'border-zinc-800'} rounded-md py-3 px-4 text-sm focus:outline-none focus:border-zinc-500 transition-colors`} 
                                            placeholder="••••••••" 
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 pt-2">
                                        <ReqItem met={pwdReqs.length} text="8+ Characters" accent={accentClass} />
                                        <ReqItem met={pwdReqs.upper} text="Uppercase" accent={accentClass} />
                                        <ReqItem met={pwdReqs.number} text="Number" accent={accentClass} />
                                        <ReqItem met={pwdReqs.special} text="Special Char" accent={accentClass} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ----------------- CREATOR STEPS ----------------- */}
                        {role === "creator" && step === 2 && (
                            <div className="space-y-8">
                                <div>
                                    <h1 className="text-3xl font-display font-bold mb-2">Basic Profile</h1>
                                    <p className="text-zinc-400 text-sm">Upload a photo and set your public identity.</p>
                                </div>
                                <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-xl space-y-6">
                                    <div className="flex items-center gap-6">
                                        <div className="w-24 h-24 rounded-full bg-zinc-900 border border-dashed border-zinc-700 flex flex-col items-center justify-center text-zinc-500 hover:border-zinc-500 hover:text-zinc-400 cursor-pointer transition-colors group">
                                            <Camera className="w-6 h-6 mb-1 group-hover:scale-110 transition-transform" />
                                            <span className="text-[10px] uppercase">Upload</span>
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <label className="text-xs text-zinc-500 uppercase tracking-widest">Username</label>
                                            <input value={username} onChange={e => setUsername(e.target.value)} className={`w-full bg-black border border-zinc-800 focus:${borderAccentClass} rounded-md py-3 px-4 text-sm focus:outline-none transition-colors`} placeholder="@username" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs text-zinc-500 uppercase tracking-widest">City, Country</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                            <input value={location} onChange={e => setLocation(e.target.value)} className={`w-full bg-black border border-zinc-800 focus:${borderAccentClass} rounded-md py-3 pl-10 pr-4 text-sm focus:outline-none transition-colors`} placeholder="e.g. New York, USA" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {role === "creator" && step === 3 && (
                            <div className="space-y-8">
                                <div>
                                    <h1 className="text-3xl font-display font-bold mb-2">Your Niche</h1>
                                    <p className="text-zinc-400 text-sm">What kind of content do you create?</p>
                                </div>
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <label className="text-xs text-zinc-500 uppercase tracking-widest">Select Categories (up to 3)</label>
                                        <div className="flex flex-wrap gap-2">
                                            {['Tech', 'Fashion', 'Gaming', 'Fitness', 'Lifestyle', 'Beauty', 'Finance', 'Education'].map(n => (
                                                <Pill key={n} active={niches.includes(n)} onClick={() => toggleArray(setNiches, n, niches, 3)} text={n} accent={accentClass} borderAccent={borderAccentClass} bgAccent={bgAccentClass} />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-xs text-zinc-500 uppercase tracking-widest">Content Types</label>
                                        <div className="flex flex-wrap gap-2">
                                            {['Short-form Video', 'Long-form Video', 'Photography', 'UGC', 'Live Streaming'].map(n => (
                                                <Pill key={n} active={contentTypes.includes(n)} onClick={() => toggleArray(setContentTypes, n, contentTypes, 5)} text={n} accent={accentClass} borderAccent={borderAccentClass} bgAccent={bgAccentClass} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {role === "creator" && step === 4 && (
                            <div className="space-y-8">
                                <div>
                                    <h1 className="text-3xl font-display font-bold mb-2">Connect Socials</h1>
                                    <p className="text-zinc-400 text-sm">Link your primary platforms to pull live metrics. (Min 1 required)</p>
                                </div>
                                <div className="space-y-4">
                                    <SocialInput icon={<Instagram className="w-5 h-5" />} label="Instagram URL" value={socialLinks.instagram} onChange={(v: string) => setSocialLinks(s => ({...s, instagram: v}))} accent={borderAccentClass} />
                                    <SocialInput icon={<MonitorPlay className="w-5 h-5" />} label="TikTok URL" value={socialLinks.tiktok} onChange={(v: string) => setSocialLinks(s => ({...s, tiktok: v}))} accent={borderAccentClass} />
                                    <SocialInput icon={<Youtube className="w-5 h-5" />} label="YouTube URL" value={socialLinks.youtube} onChange={(v: string) => setSocialLinks(s => ({...s, youtube: v}))} accent={borderAccentClass} />
                                </div>
                            </div>
                        )}

                        {role === "creator" && step === 5 && (
                            <div className="space-y-8">
                                <div>
                                    <h1 className="text-3xl font-display font-bold mb-2">Rates & Services</h1>
                                    <p className="text-zinc-400 text-sm">Set your baseline pricing to help brands match with you.</p>
                                </div>
                                <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-xl space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs text-zinc-500 uppercase tracking-widest">Base Rate per Dedicated Post (USD)</label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                            <input type="number" value={baseRate} onChange={e => setBaseRate(e.target.value)} className={`w-full bg-black border border-zinc-800 focus:${borderAccentClass} rounded-md py-3 pl-10 pr-4 text-sm focus:outline-none transition-colors`} placeholder="500" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {role === "creator" && step === 6 && (
                            <div className="space-y-8">
                                <div>
                                    <h1 className="text-3xl font-display font-bold mb-2">Bio & Portfolio</h1>
                                    <p className="text-zinc-400 text-sm">Sell yourself to potential brand partners.</p>
                                </div>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <label className="text-xs text-zinc-500 uppercase tracking-widest">Short Bio</label>
                                            <span className="text-[10px] text-zinc-600">{bio.length}/160</span>
                                        </div>
                                        <textarea maxLength={160} value={bio} onChange={e => setBio(e.target.value)} className={`w-full h-32 bg-zinc-950 border border-zinc-800 focus:${borderAccentClass} rounded-md p-4 text-sm focus:outline-none transition-colors resize-none`} placeholder="I create aesthetic tech setups and lifestyle vlogs..." />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs text-zinc-500 uppercase tracking-widest">Portfolio / Media Kit URL (Optional)</label>
                                        <div className="relative">
                                            <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                            <input value={portfolioUrl} onChange={e => setPortfolioUrl(e.target.value)} className={`w-full bg-zinc-950 border border-zinc-800 focus:${borderAccentClass} rounded-md py-3 pl-10 pr-4 text-sm focus:outline-none transition-colors`} placeholder="https://..." />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {role === "creator" && step === 7 && (
                            <div className="flex flex-col items-center text-center space-y-6 py-12">
                                <div className={`w-20 h-20 rounded-full ${bgAccentClass}/20 flex items-center justify-center mb-4`}>
                                    <CheckCircle2 className={`w-10 h-10 ${accentClass}`} />
                                </div>
                                <h1 className="text-3xl font-display font-bold">Profile Ready</h1>
                                <p className="text-zinc-400 text-sm max-w-sm">Your creator profile is fully setup. You're ready to discover campaigns and collaborate.</p>
                            </div>
                        )}

                        {/* ----------------- BRAND STEPS ----------------- */}
                        {role === "brand" && step === 2 && (
                            <div className="space-y-8">
                                <div>
                                    <h1 className="text-3xl font-display font-bold mb-2">Company Identity</h1>
                                    <p className="text-zinc-400 text-sm">Upload your logo and company details.</p>
                                </div>
                                <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-xl space-y-6">
                                    <div className="flex items-center gap-6">
                                        <div className="w-24 h-24 rounded-lg bg-zinc-900 border border-dashed border-zinc-700 flex flex-col items-center justify-center text-zinc-500 hover:border-zinc-500 hover:text-zinc-400 cursor-pointer transition-colors group">
                                            <ImageIcon className="w-6 h-6 mb-1 group-hover:scale-110 transition-transform" />
                                            <span className="text-[10px] uppercase">Upload</span>
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <label className="text-xs text-zinc-500 uppercase tracking-widest">Company Website</label>
                                            <input value={website} onChange={e => setWebsite(e.target.value)} className={`w-full bg-black border border-zinc-800 focus:${borderAccentClass} rounded-md py-3 px-4 text-sm focus:outline-none transition-colors`} placeholder="https://acme.com" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs text-zinc-500 uppercase tracking-widest">HQ Location</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                            <input value={location} onChange={e => setLocation(e.target.value)} className={`w-full bg-black border border-zinc-800 focus:${borderAccentClass} rounded-md py-3 pl-10 pr-4 text-sm focus:outline-none transition-colors`} placeholder="e.g. San Francisco, CA" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {role === "brand" && step === 3 && (
                            <div className="space-y-8">
                                <div>
                                    <h1 className="text-3xl font-display font-bold mb-2">Industry & Goals</h1>
                                    <p className="text-zinc-400 text-sm">Help us tailor your dashboard experience.</p>
                                </div>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs text-zinc-500 uppercase tracking-widest">Primary Industry</label>
                                        <select value={industry} onChange={e => setIndustry(e.target.value)} className={`w-full bg-zinc-950 border border-zinc-800 focus:${borderAccentClass} rounded-md py-3 px-4 text-sm focus:outline-none transition-colors appearance-none`}>
                                            <option value="">Select an industry...</option>
                                            <option value="SaaS">SaaS & Software</option>
                                            <option value="Ecommerce">E-Commerce</option>
                                            <option value="Fashion">Fashion & Apparel</option>
                                            <option value="ConsumerTech">Consumer Tech</option>
                                            <option value="FoodBev">Food & Beverage</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs text-zinc-500 uppercase tracking-widest">Primary Campaign Goal</label>
                                        <div className="grid grid-cols-1 gap-3">
                                            {[
                                                {id: 'awareness', icon: <Globe className="w-5 h-5"/>, title: 'Brand Awareness', desc: 'Reach new audiences and increase visibility'},
                                                {id: 'conversions', icon: <Target className="w-5 h-5"/>, title: 'Conversions & Sales', desc: 'Drive traffic and direct purchases'},
                                                {id: 'ugc', icon: <Camera className="w-5 h-5"/>, title: 'UGC Generation', desc: 'Acquire content for your own ad creatives'}
                                            ].map(goal => (
                                                <div key={goal.id} onClick={() => setPrimaryGoal(goal.id)} className={`p-4 rounded-lg border flex gap-4 cursor-pointer transition-all ${primaryGoal === goal.id ? `bg-[${accent}]/10 ${borderAccentClass}` : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'}`}>
                                                    <div className={`mt-0.5 ${primaryGoal === goal.id ? accentClass : 'text-zinc-500'}`}>{goal.icon}</div>
                                                    <div>
                                                        <h3 className={`font-bold text-sm ${primaryGoal === goal.id ? 'text-white' : 'text-zinc-300'}`}>{goal.title}</h3>
                                                        <p className="text-xs text-zinc-500 mt-1">{goal.desc}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {role === "brand" && step === 4 && (
                            <div className="space-y-8">
                                <div>
                                    <h1 className="text-3xl font-display font-bold mb-2">Target Audience</h1>
                                    <p className="text-zinc-400 text-sm">What kind of creators do you want to collaborate with?</p>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs text-zinc-500 uppercase tracking-widest">Preferred Creator Niches</label>
                                    <div className="flex flex-wrap gap-2">
                                        {['Tech', 'Fashion', 'Gaming', 'Fitness', 'Lifestyle', 'Beauty', 'Finance', 'Education'].map(n => (
                                            <Pill key={n} active={niches.includes(n)} onClick={() => toggleArray(setNiches, n, niches, 5)} text={n} accent={accentClass} borderAccent={borderAccentClass} bgAccent={bgAccentClass} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {role === "brand" && step === 5 && (
                            <div className="space-y-8">
                                <div>
                                    <h1 className="text-3xl font-display font-bold mb-2">Scale & Budget</h1>
                                    <p className="text-zinc-400 text-sm">Give us an idea of your influencer marketing scale.</p>
                                </div>
                                <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-xl space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs text-zinc-500 uppercase tracking-widest">Typical Monthly Budget</label>
                                        <select value={budgetRange} onChange={e => setBudgetRange(e.target.value)} className={`w-full bg-black border border-zinc-800 focus:${borderAccentClass} rounded-md py-3 px-4 text-sm focus:outline-none transition-colors appearance-none`}>
                                            <option value="">Select range...</option>
                                            <option value="under5k">Under $5,000</option>
                                            <option value="5k_25k">$5,000 - $25,000</option>
                                            <option value="25k_100k">$25,000 - $100,000</option>
                                            <option value="over100k">$100,000+</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs text-zinc-500 uppercase tracking-widest">Creators activated per month</label>
                                        <select value={expectedActivations} onChange={e => setExpectedActivations(e.target.value)} className={`w-full bg-black border border-zinc-800 focus:${borderAccentClass} rounded-md py-3 px-4 text-sm focus:outline-none transition-colors appearance-none`}>
                                            <option value="">Select volume...</option>
                                            <option value="1_10">1 - 10 creators</option>
                                            <option value="11_50">11 - 50 creators</option>
                                            <option value="50+">50+ creators</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {role === "brand" && step === 6 && (
                            <div className="flex flex-col items-center text-center space-y-6 py-12">
                                <div className={`w-20 h-20 rounded-lg ${bgAccentClass}/20 flex items-center justify-center mb-4 border border-[${accent}]/30`}>
                                    <Building2 className={`w-10 h-10 ${accentClass}`} />
                                </div>
                                <h1 className="text-3xl font-display font-bold">Brand Profile Ready</h1>
                                <p className="text-zinc-400 text-sm max-w-sm">Your brand profile is setup. You're ready to launch campaigns and discover talent.</p>
                            </div>
                        )}

                    </fMotion.div>
                </AnimatePresence>

                {/* Navigation Footer */}
                <div className="mt-auto pt-12 flex items-center justify-between">
                    {step > 1 ? (
                        <button onClick={handlePrev} className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Back
                        </button>
                    ) : (
                        <div />
                    )}
                    
                    {step < totalSteps ? (
                        <button 
                            onClick={handleNext}
                            disabled={!isStepValid()}
                            className={`flex items-center gap-2 text-sm font-bold text-black py-2.5 px-6 rounded-md transition-all ${isStepValid() ? `${bgAccentClass} hover:opacity-90` : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'}`}
                        >
                            Next <ArrowRight className="w-4 h-4" />
                        </button>
                    ) : (
                        <button 
                            onClick={handleComplete}
                            className={`flex items-center gap-2 text-sm font-bold text-black py-2.5 px-6 rounded-md transition-all ${bgAccentClass} hover:opacity-90`}
                        >
                            Launch Dashboard <ArrowRight className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

// Helpers
function ReqItem({ met, text, accent }: { met: boolean, text: string, accent: string }) {
    return (
        <div className={`flex items-center gap-2 text-xs ${met ? accent : 'text-zinc-600'}`}>
            {met ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
            {text}
        </div>
    );
}

function Pill({ active, onClick, text, accent, borderAccent, bgAccent }: any) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${active ? `${bgAccent}/20 ${accent} ${borderAccent}` : 'border-zinc-800 text-zinc-400 hover:border-zinc-600'}`}
        >
            {text}
        </button>
    );
}

function toggleArray(setter: any, val: string, current: string[], max?: number) {
    if (current.includes(val)) {
        setter(current.filter(x => x !== val));
    } else {
        if (!max || current.length < max) {
            setter([...current, val]);
        }
    }
}

function SocialInput({ icon, label, value, onChange, accent }: any) {
    const isConnected = value.length > 0;
    return (
        <div className={`flex items-center p-3 rounded-lg border transition-all ${isConnected ? `bg-zinc-900 ${accent}` : 'bg-zinc-950 border-zinc-800'}`}>
            <div className={`mr-4 ${isConnected ? accent.replace('border-', 'text-') : 'text-zinc-500'}`}>{icon}</div>
            <div className="flex-1">
                <input 
                    value={value} 
                    onChange={e => onChange(e.target.value)} 
                    placeholder={label} 
                    className="w-full bg-transparent focus:outline-none text-sm text-white placeholder-zinc-600" 
                />
            </div>
            {isConnected && <CheckCircle2 className={`w-4 h-4 ${accent.replace('border-', 'text-')}`} />}
        </div>
    );
}
