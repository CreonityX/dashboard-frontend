"use client";

import { createContext, ReactNode, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { MOCK_CONVERSATIONS } from "@/lib/mock-data";

export type MessageItem = {
    id: string;
    text: string;
    isMe: boolean;
    time: string;
    isRead?: boolean;
};

export type ConversationItem = {
    id: string;
    brand: string;
    message: string;
    time: string;
    unreadCount: number;
    isOnline: boolean;
    isSupport?: boolean;
    isArchived?: boolean;
    notes?: string;
};

type MessagesState = {
    conversations: ConversationItem[];
    messagesByConversation: Record<string, MessageItem[]>;
};

const STORAGE_KEY = "messages_mvp_state_v1";

const INITIAL_MESSAGES: Record<string, MessageItem[]> = {
    "1": [
        { id: "1", text: "Hi Kai! Are you available for a sponsorship next month?", isMe: false, time: "10:30 AM" },
        { id: "2", text: "Yes, happy to discuss details.", isMe: true, time: "10:32 AM", isRead: true },
        { id: "3", text: "Great. We are launching the S26 and need low-light coverage.", isMe: false, time: "10:35 AM" }
    ],
    "2": [
        { id: "1", text: "Contracts are signed. Can we schedule kickoff?", isMe: false, time: "Yesterday" },
        { id: "2", text: "Yes. Tuesday 2PM works for me.", isMe: true, time: "Yesterday", isRead: true }
    ],
    "3": [
        { id: "1", text: "Your payment for #7829 has been processed.", isMe: false, time: "Feb 12" }
    ],
    "4": [
        { id: "1", text: "Do you have the raw footage for the reel?", isMe: false, time: "Feb 10" }
    ],
    "5": [
        { id: "1", text: "Thanks for the quick turnaround!", isMe: false, time: "Feb 08" }
    ],
    "6": [
        { id: "1", text: "Let us discuss Q2 budget.", isMe: false, time: "Feb 05" }
    ]
};

const INITIAL_STATE: MessagesState = {
    conversations: MOCK_CONVERSATIONS.map((item) => ({ ...item, isArchived: false, notes: "" })),
    messagesByConversation: INITIAL_MESSAGES
};

type MessagesMvpContextValue = {
    isLoading: boolean;
    conversations: ConversationItem[];
    getConversationById: (conversationId: string | null) => ConversationItem | undefined;
    getMessagesForConversation: (conversationId: string | null) => MessageItem[];
    markConversationRead: (conversationId: string) => void;
    markAllRead: () => void;
    toggleArchiveConversation: (conversationId: string) => void;
    unarchiveAll: () => void;
    sendMessage: (conversationId: string, text: string) => void;
    setConversationNote: (conversationId: string, note: string) => void;
    startNewChat: () => string;
};

const MessagesMvpContext = createContext<MessagesMvpContextValue | undefined>(undefined);

function getInitialState(): MessagesState {
    if (typeof window === "undefined") return INITIAL_STATE;
    try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (!stored) return INITIAL_STATE;
        const parsed = JSON.parse(stored) as MessagesState;
        if (!parsed.conversations || !parsed.messagesByConversation) return INITIAL_STATE;
        return parsed;
    } catch {
        return INITIAL_STATE;
    }
}

function nowTime() {
    return new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

export function MessagesMvpProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<MessagesState>(getInitialState);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 250);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return;
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }, [state]);

    const conversations = useMemo(
        () => [...state.conversations].sort((a, b) => Number(b.unreadCount > 0) - Number(a.unreadCount > 0)),
        [state.conversations]
    );

    const getConversationById = useCallback((conversationId: string | null) => {
        if (!conversationId) return undefined;
        return state.conversations.find((item) => item.id === conversationId);
    }, [state.conversations]);

    const getMessagesForConversation = useCallback((conversationId: string | null) => {
        if (!conversationId) return [];
        return state.messagesByConversation[conversationId] || [];
    }, [state.messagesByConversation]);

    const markConversationRead = useCallback((conversationId: string) => {
        setState((current) => {
            const needsUpdate = current.conversations.some(
                item => item.id === conversationId && item.unreadCount > 0
            );
            if (!needsUpdate) return current;

            return {
                ...current,
                conversations: current.conversations.map((item) =>
                    item.id === conversationId ? { ...item, unreadCount: 0 } : item
                )
            };
        });
    }, []);

    const toggleArchiveConversation = (conversationId: string) => {
        setState((current) => ({
            ...current,
            conversations: current.conversations.map((item) =>
                item.id === conversationId ? { ...item, isArchived: !item.isArchived } : item
            )
        }));
    };

    const markAllRead = () => {
        setState((current) => ({
            ...current,
            conversations: current.conversations.map((item) => ({ ...item, unreadCount: 0 }))
        }));
    };

    const unarchiveAll = () => {
        setState((current) => ({
            ...current,
            conversations: current.conversations.map((item) => ({ ...item, isArchived: false }))
        }));
    };

    const sendMessage = (conversationId: string, text: string) => {
        const trimmed = text.trim();
        if (!trimmed) return;

        const outgoing: MessageItem = {
            id: `${Date.now()}-out`,
            text: trimmed,
            isMe: true,
            time: nowTime(),
            isRead: true
        };

        setState((current) => ({
            ...current,
            messagesByConversation: {
                ...current.messagesByConversation,
                [conversationId]: [...(current.messagesByConversation[conversationId] || []), outgoing]
            },
            conversations: current.conversations.map((item) =>
                item.id === conversationId
                    ? { ...item, message: trimmed, time: outgoing.time }
                    : item
            )
        }));

        setTimeout(() => {
            setState((current) => {
                const conversation = current.conversations.find((item) => item.id === conversationId);
                if (!conversation || conversation.isSupport) return current;

                const autoReply: MessageItem = {
                    id: `${Date.now()}-in`,
                    text: "Received. Thanks, we will review and get back shortly.",
                    isMe: false,
                    time: nowTime()
                };

                return {
                    ...current,
                    messagesByConversation: {
                        ...current.messagesByConversation,
                        [conversationId]: [...(current.messagesByConversation[conversationId] || []), autoReply]
                    },
                    conversations: current.conversations.map((item) =>
                        item.id === conversationId
                            ? {
                                ...item,
                                message: autoReply.text,
                                time: autoReply.time,
                                unreadCount: item.unreadCount + 1
                            }
                            : item
                    )
                };
            });
        }, 900);
    };

    const setConversationNote = (conversationId: string, note: string) => {
        setState((current) => ({
            ...current,
            conversations: current.conversations.map((item) =>
                item.id === conversationId ? { ...item, notes: note } : item
            )
        }));
    };

    const startNewChat = () => {
        const id = `${Date.now()}`;
        const chat: ConversationItem = {
            id,
            brand: "New Brand",
            message: "Start your first message...",
            time: "Now",
            unreadCount: 0,
            isOnline: false,
            isArchived: false,
            notes: ""
        };

        setState((current) => ({
            ...current,
            conversations: [chat, ...current.conversations],
            messagesByConversation: {
                ...current.messagesByConversation,
                [id]: []
            }
        }));

        return id;
    };

    return (
        <MessagesMvpContext.Provider
            value={{
                isLoading,
                conversations,
                getConversationById,
                getMessagesForConversation,
                markConversationRead,
                markAllRead,
                toggleArchiveConversation,
                unarchiveAll,
                sendMessage,
                setConversationNote,
                startNewChat
            }}
        >
            {children}
        </MessagesMvpContext.Provider>
    );
}

export function useMessagesMvp() {
    const context = useContext(MessagesMvpContext);
    if (!context) {
        throw new Error("useMessagesMvp must be used within a MessagesMvpProvider");
    }
    return context;
}
