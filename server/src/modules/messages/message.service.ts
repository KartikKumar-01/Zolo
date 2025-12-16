import mongoose from "mongoose";
import Conversation from "../conversation/conversation.model";
import Message from "./message.model";
import ConversationRead from "../conversation/conversationRead.model";

interface SendMessageType {
  conversationId: string;
  senderId: string;
  content: string;
  type?: "text" | "image" | "file";
}

interface FetchMessageType {
  conversationId: string;
  userId: string;
  limit?: number;
  before?: string;
}

export const sendMessageService = async ({
  conversationId,
  senderId,
  content,
  type = "text",
}: SendMessageType) => {
  if (!mongoose.Types.ObjectId.isValid(conversationId)) {
    throw new Error("Invalid conversation id");
  }

  const conversation = await Conversation.findById(conversationId);
  if (!conversation) {
    throw new Error("Conversation not found");
  }

  const isParticipant = conversation.participants.some(
    (id) => id.toString() === senderId
  );

  if (!isParticipant) {
    throw new Error("Not a participant of this conversation");
  }

  const message = await Message.create({
    conversationId: new mongoose.Types.ObjectId(conversationId),
    sender: new mongoose.Types.ObjectId(senderId),
    content,
    type,
    readBy: [new mongoose.Types.ObjectId(senderId)],
  });

  conversation.lastMessage = message._id;
  await conversation.save();
  return message;
};

export const fetchMessagesService = async ({
  conversationId,
  userId,
  limit = 20,
  before,
}: FetchMessageType) => {
  if (!mongoose.Types.ObjectId.isValid(conversationId)) {
    throw new Error("Invalid conversation id");
  }
  const conversation = await Conversation.findById(conversationId);

  if (!conversation) {
    throw new Error("Conversation not found");
  }

  const isParticipant = conversation.participants.some(
    (id) => id.toString() === userId
  );

  if (!isParticipant) {
    throw new Error("Not a participant of this conversation");
  }

  const query: any = {
    conversationId: new mongoose.Types.ObjectId(conversationId),
  };

  if (before) {
    query.createdAt = { $lt: new Date(before) };
  }

  const messages = await Message.find(query)
    .sort({ createdAt: -1 })
    .limit(limit + 1);

  const hasMore = messages.length > limit;
  if (hasMore) messages.pop();

  let conversationRead = await ConversationRead.findOne({
    conversationId: new mongoose.Types.ObjectId(conversationId),
    userId: new mongoose.Types.ObjectId(userId),
  });

  if (!conversationRead) {
    conversationRead = await ConversationRead.create({
      conversationId: new mongoose.Types.ObjectId(conversationId),
      userId: new mongoose.Types.ObjectId(userId),
      lastReadMessageId: null,
    });
  }

  if (messages.length > 0) {
    const latestMessage = messages[0];
    await ConversationRead.findOneAndUpdate(conversationRead._id, {
      lastReadMessageId: latestMessage,
    });
  }

  return {
    messages: messages.reverse(),
    hasMore,
  };
};
