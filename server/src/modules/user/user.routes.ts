import { Router } from "express";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { setUserName } from "./user.controller";

const router = Router();

router.post("/set-username", authMiddleware, setUserName)

export default router;