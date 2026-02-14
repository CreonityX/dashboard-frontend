import { User, Shield, CreditCard, Bell, Lock, Workflow, LifeBuoy, AlertTriangle, Monitor, Banknote } from "lucide-react";

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
