import Conversation, { IConversation } from "./conversation.model";
import { HydratedDocument } from "mongoose";
import mongoose from "mongoose";

export const createOrGetDM = async (
  userId: string,
  otherUserId: string
): Promise<HydratedDocument<IConversation>> => {

  let conversation = await Conversation.findOne({
    type: "dm",
    participants: { $all: [userId, otherUserId], $size: 2 },
  });

  const uid = new mongoose.Types.ObjectId(userId);
  const oid = new mongoose.Types.ObjectId(otherUserId);

  if (!conversation) {
    const newConversation = {
      type: "dm",
      participants: [uid, oid],
    };

    conversation = await Conversation.create(newConversation);
  }

  await conversation.populate("participants", "name avatar");

  return conversation;
};

export const createGroup = async (
    name: string,
    participants: string[],
    creatorId: string
) : Promise<HydratedDocument<IConversation>> => {
    const participantsIds = participants.map(id => new mongoose.Types.ObjectId(id));

    if(!participants.includes(creatorId)){
        participantsIds.push(new mongoose.Types.ObjectId(creatorId));
    }

    let conversation = await Conversation.create({
        name,
        type: "group",
        participants: participantsIds,
        admins: [new mongoose.Types.ObjectId(creatorId)]
    })

    await conversation.populate("admins", "name avatar");
    await conversation.populate("participants", "name avatar");

    return conversation;
}
