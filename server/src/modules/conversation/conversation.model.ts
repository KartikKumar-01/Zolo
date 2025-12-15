import mongoose, { Document, Model, Schema } from "mongoose";

export interface IConversation extends Document {
  name?: string;
  type: "dm" | "group";
  participants: mongoose.Types.ObjectId[];
  admins?: mongoose.Types.ObjectId[];
  lastMessage?: mongoose.Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
}

const ConversationSchema = new Schema<IConversation>(
  {
    name: {
      type: String,
      required: function () {
        return this.type === "group"; 
      },
    },
    type: {
      type: String,
    //   enum: ["dm", "group"],
      required: true,
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    admins: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: function () {
          return this.type === "group";
        },
      },
    ],
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },
  },
  { timestamps: true }
);

const Conversation: Model<IConversation>= mongoose.model<IConversation>("Conversation", ConversationSchema);
export default Conversation;
