import type { MessageResponse } from "./message.types";

export interface ServerToClientEvents {
  "message:new": (message: MessageResponse) => void;
}

export interface ClientToServerEvents {
  "join-conversation": (conversationId: string) => void;
  "leave-conversation": (conversationId: string) => void;
}