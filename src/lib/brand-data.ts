import {
    User, Shield, CreditCard, Bell, Lock, Workflow, LifeBuoy, AlertTriangle, Monitor, Banknote,
    HelpCircle, Briefcase, MessageSquare, Wallet, FileText, TrendingUp, Users,
    Search, LayoutDashboard, Activity, LayoutList,
    ArrowLeftRight, Landmark, PlayCircle, Lightbulb, CalendarIcon, ClipboardList, Edit3, ShieldCheck,
    Send, Zap, CheckCircle, Bookmark, Building2, FolderOpen, Star, BarChart3, GitCompare, PieChart, ClipboardCheck
} from "lucide-react";

// Re-export shared constants from creator mock-data
export { MOCK_CONVERSATIONS, CALENDAR_VIEWS } from "./mock-data";

// ── Brand Dashboard Overview ──
export const DASHBOARD_ACTIVITY = [
    { id: 1, type: 'application', text: 'Tech_Nomad applied to S26 Launch Campaign', time: '2h ago' },
    { id: 2, type: 'content', text: 'Sarah_Vfx submitted draft for S26 Launch', time: '4h ago' },
    { id: 3, type: 'payment', text: 'Payment processed to Pixel_Artisan', time: 'Yesterday' },
    { id: 4, type: 'campaign', text: 'S26 Launch Campaign launched', time: 'Feb 15' },
];
export const DASHBOARD_ALERTS = [
    { id: 1, type: 'content', text: '3 pending content approvals', severity: 'medium', href: '/content-review' },
    { id: 2, type: 'budget', text: 'S26 Launch budget at 92%', severity: 'high', href: '/finance' },
    { id: 3, type: 'payment', text: 'Payment due to Tech_Nomad Feb 20', severity: 'medium', href: '/finance' },
    { id: 4, type: 'campaign', text: 'S26 Launch ending Mar 31', severity: 'low', href: '/campaigns/c1' },
];
export const DASHBOARD_UPCOMING_DEADLINES = [
    { id: 1, creator: 'Tech_Nomad', campaign: 'S26 Launch', dueDate: 'Feb 20', type: 'draft' },
    { id: 2, creator: 'Pixel_Artisan', campaign: 'Spring Ad Set', dueDate: 'Feb 25', type: 'revision' },
];

// ── Brand Conversations ──
export const MOCK_BRAND_CONVERSATIONS = [
    { id: '1', creator: 'Sarah_Vfx', creatorNiche: '3D Motion', campaign: 'S26 Low-Light Review', campaignId: 'c1', message: 'I\'ve uploaded the first cut for review.', time: '10:42 AM', unreadCount: 2, isOnline: true },
    { id: '2', creator: 'Tech_Nomad', creatorNiche: 'Tech Reviews', campaign: 'S26 Launch Campaign', campaignId: 'c1', message: 'Contracts signed! When can we schedule the kickoff call?', time: 'Yesterday', unreadCount: 0, isOnline: false },
    { id: '3', creator: 'Creonity Support', creatorNiche: '', campaign: null, campaignId: null, message: 'Your payment for campaign #7829 has been processed.', time: 'Feb 12', unreadCount: 0, isOnline: true, isSupport: true },
    { id: '4', creator: 'Pixel_Artisan', creatorNiche: 'Digital Art', campaign: 'Spring Ad Set', campaignId: 'c2', message: 'Do you have the brand guidelines PDF?', time: 'Feb 10', unreadCount: 1, isOnline: false },
    { id: '5', creator: 'Audio_Wizard', creatorNiche: 'Sound Design', campaign: 'S26 Audio Promo', campaignId: 'c1', message: 'Thanks for the feedback! Revised mix attached.', time: 'Feb 08', unreadCount: 0, isOnline: false },
    { id: '6', creator: 'Tech_Nomad', creatorNiche: 'Tech Reviews', campaign: 'Q2 Budget Discussion', campaignId: null, message: 'Let\'s discuss the budget for the next collaboration.', time: 'Feb 05', unreadCount: 0, isOnline: true },
];
export const MOCK_CAMPAIGNS = [
    { id: 'c1', name: 'S26 Launch Campaign' },
    { id: 'c2', name: 'Spring Ad Set' },
    { id: 'c3', name: 'S26 Audio Promo' },
];
export const MESSAGE_TEMPLATES = [
    { id: 'invitation', label: 'Campaign Invitation', text: 'Hi! We\'d love to invite you to collaborate on our upcoming campaign.' },
    { id: 'acceptance', label: 'Acceptance Confirmation', text: 'Excellent news! We\'re thrilled you\'ve accepted.' },
    { id: 'revision', label: 'Revision Request', text: 'Thanks for the first cut! We have a few minor revisions.' },
    { id: 'payment', label: 'Payment Confirmation', text: 'Your payment has been processed.' },
    { id: 'thank-you', label: 'Thank You Message', text: 'Thank you for your incredible work on this campaign.' },
];

// ── Brand Tab Configs ──
export const SETTINGS_TABS = [
    { id: 'account', label: 'Company Info', icon: User },
    { id: 'team', label: 'Team Management', icon: Users },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'payment', label: 'Payment Settings', icon: CreditCard },
    { id: 'billing', label: 'Billing & Subscription', icon: FileText },
    { id: 'integrations', label: 'Integrations', icon: Workflow },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: Monitor },
    { id: 'blocked', label: 'Blocked Creators', icon: AlertTriangle, variant: 'danger' },
];
export const SUPPORT_TABS = [
    { id: 'help-center', label: 'Help Center', icon: Search },
    { id: 'contact', label: 'Contact Support', icon: MessageSquare },
    { id: 'tickets', label: 'Submit Ticket', icon: LifeBuoy },
    { id: 'live-chat', label: 'Live Chat', icon: MessageSquare },
    { id: 'faqs', label: 'FAQs', icon: HelpCircle },
    { id: 'tutorials', label: 'Video Tutorials', icon: PlayCircle },
    { id: 'status', label: 'Platform Status', icon: Activity },
    { id: 'features', label: 'Feature Requests', icon: Lightbulb },
];
export const PROFILE_TABS = [
    { id: 'edit', label: 'Company Profile', icon: Building2 },
    { id: 'verification', label: 'Verification', icon: ShieldCheck },
    { id: 'showcase', label: 'Past Campaigns', icon: Briefcase },
    { id: 'assets', label: 'Brand Assets', icon: FolderOpen },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'privacy', label: 'Privacy', icon: Lock },
];
export const ANALYTICS_TABS = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'audience', label: 'Audience & Market', icon: Users },
    { id: 'roi', label: 'ROI & Reports', icon: PieChart },
];
export const FINANCE_TABS = [
    { id: 'overview', label: 'Budget Overview', icon: LayoutDashboard },
    { id: 'payments', label: 'Payment Queue', icon: CreditCard },
    { id: 'history', label: 'Payment History', icon: ArrowLeftRight },
    { id: 'invoices', label: 'Invoices & Receipts', icon: FileText },
    { id: 'alerts', label: 'Budget Alerts', icon: Bell },
    { id: 'reports', label: 'Financial Reports', icon: BarChart3 },
];
export const INSIGHTS_TABS = [
    { id: 'industry', label: 'Industry Trends', icon: TrendingUp },
    { id: 'marketplace', label: 'Creator Marketplace', icon: BarChart3 },
    { id: 'competitive', label: 'Competitive Intelligence', icon: GitCompare },
    { id: 'seasonal', label: 'Seasonal Planning', icon: CalendarIcon },
];
export const CAMPAIGNS_TABS = [
    { id: 'list', label: 'Campaign List', icon: LayoutList },
    { id: 'templates', label: 'Templates', icon: Bookmark },
];
export const CONTENT_REVIEW_TABS = [
    { id: 'queue', label: 'Pending Queue', icon: ClipboardList },
    { id: 'approved', label: 'Approved', icon: CheckCircle },
    { id: 'revisions', label: 'Revision Requests', icon: Send },
    { id: 'rejected', label: 'Rejected Archive', icon: AlertTriangle },
];
export const APPLICATIONS_TABS = [
    { id: 'pending', label: 'Pending Review', icon: ClipboardList },
    { id: 'shortlisted', label: 'Shortlisted', icon: Star },
    { id: 'accepted', label: 'Accepted', icon: CheckCircle },
    { id: 'rejected', label: 'Rejected', icon: AlertTriangle },
    { id: 'archive', label: 'All Archive', icon: FileText },
];
export const CREATORS_TABS = [
    { id: 'discover', label: 'Discover Creators', icon: Search },
    { id: 'saved', label: 'Saved Creators', icon: Bookmark },
    { id: 'working', label: 'Working With', icon: Zap },
    { id: 'past', label: 'Past Collaborations', icon: CheckCircle },
];
export const CAMPAIGN_DETAIL_TABS = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'creators', label: 'Creators', icon: Users },
    { id: 'applications', label: 'Applications', icon: ClipboardList },
    { id: 'content', label: 'Content', icon: LayoutList },
    { id: 'budget', label: 'Budget', icon: Wallet },
    { id: 'files', label: 'Files', icon: FolderOpen },
    { id: 'activity', label: 'Activity Log', icon: Activity },
];

// Re-export all brand data arrays
export {
    INSIGHTS_INDUSTRY, INSIGHTS_MARKETPLACE, INSIGHTS_COMPETITIVE, INSIGHTS_SEASONAL,
    ANALYTICS_OVERVIEW_KPIS, ANALYTICS_CAMPAIGNS, ANALYTICS_CREATORS, ANALYTICS_PLATFORMS,
    BUDGET_OVERVIEW, BUDGET_BY_CAMPAIGN, BUDGET_BY_PLATFORM, BUDGET_BY_TIER, BUDGET_BY_MONTH, BUDGET_BY_CONTENT,
    PENDING_PAYMENTS, SCHEDULED_PAYMENTS, PAYMENT_HISTORY, BUDGET_ALERTS,
    CAMPAIGNS_LIST, CAMPAIGN_CREATORS, CAMPAIGN_TEMPLATES,
    PENDING_CONTENT, CAMPAIGN_BRIEF, APPROVED_CONTENT, REVISION_REQUESTS, REJECTED_CONTENT,
    PENDING_APPLICATIONS, SHORTLISTED_APPLICATIONS, ACCEPTED_APPLICATIONS, REJECTED_APPLICATIONS,
    DISCOVER_CREATORS, NICHE_CATEGORIES, CREATOR_PLATFORMS, SAVED_CREATORS_LISTS, SAVED_CREATORS,
    WORKING_WITH_COLLABORATIONS, PAST_COLLABORATIONS, RESOURCE_TABS,
} from "./brand-data-arrays";
