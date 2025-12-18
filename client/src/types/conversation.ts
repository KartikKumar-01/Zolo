import type { Message } from "./message";

export interface Conversation{
    _id: string,
    name?: string,
    type: "dm" | "group",
    participants: string[],
    lastMessage: Message | null,
    admins: string[],
    unreadCount: number,
    createdAt: string,
    updatedAt: string
}