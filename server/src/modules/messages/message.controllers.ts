import { Request, Response } from "express";
import { AuthRequest } from "../../middlewares/authMiddleware";
import { fetchMessagesService, sendMessageService } from "./message.service";

export const sendMessage = async (req: AuthRequest, res: Response) => {
  try {
    const { conversationId, content, type } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!conversationId || !content) {
      return res.status(400).json({
        success: false,
        message: "conversationId, content, and userId are required",
      });
    }

    const message = await sendMessageService({
      conversationId,
      senderId: userId,
      content,
      type,
    });

    const io = req.app.get("io");
    console.log("Emitting message:new to room:", `conversation:${conversationId}`);
    io.to(`conversation:${conversationId}`).emit("message:new", message);

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: message,
    });
  } catch (error) {
    console.error("Send Message Error: ", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const fetchMessages = async (req: AuthRequest, res: Response) => {
  try {
    const { conversationId } = req.params;
    const { limit, before } = req.query;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Not authorised",
      });
    }

    const messages = await fetchMessagesService({
      conversationId,
      userId,
      limit: limit ? Number(limit) : undefined,
      before: before as string | undefined,
    });

    return res.status(200).json({
      success: true,
      messages,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to fetch messages",
    });
  }
};
