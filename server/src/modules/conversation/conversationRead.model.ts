import mongoose, { Document, Model, Schema } from "mongoose";

export interface IConversationRead extends Document {
  conversationId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  lastReadMessageId: mongoose.Types.ObjectId | null;
}

const ConversationReadSchema = new Schema<IConversationRead>(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lastReadMessageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },
  },
  { timestamps: true }
);

ConversationReadSchema.index(
  { conversationId: 1, userId: 1 },
  { unique: true }
);

const ConversationRead: Model<IConversationRead> = mongoose.model<IConversationRead>("ConversationRead", ConversationReadSchema);
export default ConversationRead;