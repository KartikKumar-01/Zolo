import { Router } from "express";
import { validate } from "../../middlewares/validate";
import { loginSchema, registerSchema } from "./auth.validation";
import { getMyProfile, login, logout, refreshAccessToken, register } from "./auth.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/refresh-token", refreshAccessToken);
router.post("/logout", logout);
router.get("/me", authMiddleware, getMyProfile);

export default router;
