import {
    User, Shield, CreditCard, Bell, Lock, Workflow, LifeBuoy, AlertTriangle, Monitor, Banknote, GraduationCap, BookOpen,
    Settings, HelpCircle, Check, Briefcase, MessageSquare, Wallet, FileText, TrendingUp, Users, Video, Image, LogOut,
    Plus, Minus, ChevronDown, ChevronRight, Search, Menu, X, LayoutDashboard, Calendar, Activity, LayoutList,
    ArrowLeftRight, Landmark, Wrench, Newspaper, PlayCircle, Lightbulb, CalendarIcon, ClipboardList, Eye, Edit3, ShieldCheck,
    Send, Zap, CheckCircle, Bookmark, Mail
} from "lucide-react";

export const MOCK_CONVERSATIONS = [
    { id: '1', brand: 'Samsung', message: 'Hey, wanted to check on the progress for the S26 review...', time: '10:42 AM', unreadCount: 2, isOnline: true },
    { id: '2', brand: 'Nike', message: 'Contracts are signed! When can we schedule kickoff?', time: 'Yesterday', unreadCount: 0, isOnline: false },
    { id: '3', brand: 'Creonity Support', message: 'Your payment for #7829 has been processed.', time: 'Feb 12', unreadCount: 0, isOnline: true, isSupport: true },
    { id: '4', brand: 'Adidas', message: 'Do you have the raw footage for the reel?', time: 'Feb 10', unreadCount: 1, isOnline: false },
    { id: '5', brand: 'Sony', message: 'Thanks for the quick turnaround!', time: 'Feb 08', unreadCount: 0, isOnline: false },
    { id: '6', brand: 'Canon', message: 'Let\'s discuss the budget for Q2.', time: 'Feb 05', unreadCount: 0, isOnline: true },
];

export const SETTINGS_TABS = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'payment', label: 'Payout Methods', icon: Banknote },
    { id: 'billing', label: 'Subscription & Billing', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Preferences', icon: Monitor },
    { id: 'privacy', label: 'Privacy & Data', icon: Lock },
    { id: 'integrations', label: 'Integrations', icon: Workflow },
    { id: 'support', label: 'Help & Support', icon: LifeBuoy },
    { id: 'danger', label: 'Account Management', icon: AlertTriangle, variant: 'danger' },
];

export const RESOURCE_TABS = [
    { id: 'best-practices', label: 'Best Practices', icon: BookOpen },
    { id: 'tools', label: 'Templates & Tools', icon: Wrench },
    { id: 'community', label: 'Creator Community', icon: Users },
];

export const SUPPORT_TABS = [
    { id: 'help-center', label: 'Help Center', icon: Search },
    { id: 'contact', label: 'Contact Support', icon: MessageSquare },
    { id: 'tickets', label: 'My Tickets', icon: LifeBuoy },
    { id: 'faqs', label: 'FAQs', icon: HelpCircle },
    { id: 'tutorials', label: 'Video Tutorials', icon: PlayCircle },
    { id: 'features', label: 'Feature Requests', icon: Lightbulb },
    { id: 'status', label: 'Platform Status', icon: Activity },
];

export const CALENDAR_VIEWS = [
    { id: 'month', label: 'Month', icon: CalendarIcon },
    { id: 'week', label: 'Week', icon: LayoutList },
    { id: 'day', label: 'Day', icon: CalendarIcon },
    { id: 'agenda', label: 'Agenda', icon: ClipboardList },
];

export const PROFILE_TABS = [
    { id: 'public', label: 'Public Profile', icon: Eye },
    { id: 'edit', label: 'Edit Profile', icon: Edit3 },
    { id: 'verification', label: 'Verification', icon: ShieldCheck },
    { id: 'mediakit', label: 'Media Kit', icon: FileText },
    { id: 'privacy', label: 'Privacy', icon: Lock },
];

export const ANALYTICS_TABS = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'performance', label: 'Performance', icon: LayoutList },
    { id: 'audience', label: 'Audience & Market', icon: Users },
];

export const FINANCE_TABS = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
    { id: 'payouts', label: 'Payouts', icon: CreditCard },
    { id: 'invoices', label: 'Invoices', icon: FileText },
    { id: 'referrals', label: 'Referrals', icon: Users },
];

export const PROJECT_TABS = [
    { id: 'discover', label: 'Discover', icon: Search },
    { id: 'invitations', label: 'Invitations', icon: Mail },
    { id: 'pipeline', label: 'Pipeline', icon: Zap },
    { id: 'completed', label: 'Completed', icon: CheckCircle },
    { id: 'saved', label: 'Saved', icon: Bookmark },
];
