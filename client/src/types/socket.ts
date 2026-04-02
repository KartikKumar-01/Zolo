import type { MessageResponse } from "./message.types";

export interface ServerToClientEvents {
  "message:new": (message: MessageResponse) => void;
  "user:online": (data: { userId: string }) => void;
  "user:offline": (data: { userId: string; lastSeen: string }) => void;
}

export interface ClientToServerEvents {
  "join-conversation": (conversationId: string) => void;
  "leave-conversation": (conversationId: string) => void;
}