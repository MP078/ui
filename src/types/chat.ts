export interface ChatUser {
    id: string;
    name: string;
    avatar: string;
}

export interface ChatMessage {
    id: string;
    content: string;
    timestamp: string;
    sender: ChatUser;
    isOwn: boolean;
    status: 'sent' | 'delivered' | 'read';
    reactions?: Array<{
        emoji: string;
        count: number;
        users: string[];
    }>;
}

export interface Chat {
    id: string;
    name: string;
    image: string;
    isOnline: boolean;
    lastActive: string;
    lastMessage: string;
    unreadCount: number;
}

// Add ChatListItem and ChatMessage types for API mapping
export interface ChatListItem {
    id: string;
    other_user: {
        avatar_url: string;
        id: string;
        name: string;
        username: string;
    };
    last_message: {
        id: string;
        content: string;
        created_at: string;
        user_id: string;
    } | null;
    unread_count: number;
    created_at: string;
}

export interface ChatMessage {
    id: string;
    content: string;
    user_id: string;
    read: boolean;
    created_at: string;
}

export interface Chat {
    id: string;
    name: string;
    image: string;
    isOnline: boolean;
    lastActive: string;
    lastMessage: string;
    unreadCount: number;
}

export interface ChatMessageUI {
    id: string;
    content: string;
    timestamp: string;
    sender: {
        id: string;
        name: string;
        avatar: string;
    };
    isOwn: boolean;
    status: 'sent' | 'delivered' | 'read';
    reactions?: Array<{
        emoji: string;
        count: number;
        users: string[];
    }>;
}
