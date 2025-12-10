import { Router } from "express";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { createGrooupConversationController, getOrCreateConversationController } from "./conversation.controller";

const router = Router();

router.get("/dm/:otherUserId", authMiddleware, getOrCreateConversationController);
router.post("/create-group", authMiddleware, createGrooupConversationController);

export default router;