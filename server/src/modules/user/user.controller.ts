import { Response } from "express";
import { AuthRequest } from "../../middlewares/authMiddleware";
import User from "../auth/auth.model";
import {getUsers, setUserNameService} from "./user.service";

export const setUserName = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { username } = req.body;
    if (!username || typeof username !== "string") {
      return res.status(400).json({
        success: false,
        message: "Username is required.",
      });
    }

    const result = await setUserNameService({
      userId,
      username,
    });
    return res.status(200).json({
      success: true,
      message: "Username set successfully.",
      data: result,
    });
  } catch (error: any) {
    switch (error.message) {
      case "USERNAME_TOO_SHORT":
        return res.status(400).json({
          success: false,
          message: "Username must be at least 3 characters.",
        });

      case "USERNAME_ALREADY_SET":
        return res.status(400).json({
          success: false,
          message: "Username is already set and cannot be changed.",
        });

      case "USERNAME_TAKEN":
        return res.status(409).json({
          success: false,
          message: "Username is already taken.",
        });

      case "INVALID_USERNAME":
        return res.status(400).json({
          success: false,
          message:
            "Username must be 3–20 characters and can contain letters, numbers, _ or .",
        });

      case "USER_NOT_FOUND":
        return res.status(404).json({
          success: false,
          message: "User not found.",
        });

      default:
        console.error("Set username error:", error);
        return res.status(500).json({
          success: false,
          message: "Server error",
        });
    }
  }
};


export const searchUsers = async (req: AuthRequest, res: Response) => {
  try{
    const userId = req.userId;
    if(!userId){
      return res.status(401).json({message: "Unauthorized"});
    }

    const q = typeof req.query.q === "string" ? req.query.q : "";
    const users = await getUsers(q, userId);

    return res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    })

  }catch (error: any) {
    console.error("Search users error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
}