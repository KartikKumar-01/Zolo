import { Request, Response, NextFunction } from "express";
import { loginUser, registerUser } from "./auth.service";
import jwt from "jsonwebtoken";
import User from "./auth.model";
import { AuthRequest } from "../../middlewares/authMiddleware";

export const registerController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body;
        const user = await registerUser(name, email, password);

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user,
        });
    } catch (error: any) {
        next(error);
    }
};

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const { user, accessToken, refreshToken } = await loginUser(
            email,
            password
        );

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return res.status(200).json({
            success: true,
            message: "Login successful",
            user,
            tokens: {
                access: accessToken,
                refresh: refreshToken,
            },
        });
    } catch (error: any) {
        next(error);
    }
};

export const refreshAccessTokenController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: "Refresh token is required",
            });
        }

        let decoded: { id: string };
        try {
            decoded = jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET as string
            ) as { id: string };
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired refresh token",
            });
        }

        if (!decoded || !decoded.id) {
            return res.status(401).json({
                success: false,
                message: "Invalid refresh token",
            });
        }

        const user = await User.findById(decoded.id).select("+refreshToken");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (user.refreshToken !== refreshToken) {
            return res.status(401).json({
                success: false,
                message: "Invalid refresh token",
            })
        }

        const newAccessToken = jwt.sign(
            { id: user._id },
            process.env.ACCESS_TOKEN_SECRET as string,
            { expiresIn: "15m" }
        );

        const newRefreshToken = jwt.sign(
            { id: user._id },
            process.env.REFRESH_TOKEN_SECRET as string,
            { expiresIn: "7d" }
        )

        user.refreshToken = newRefreshToken;
        await user.save();

        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        return res.status(200).json({
            success: true,
            message: "Access token refreshed successfully",
            accessToken: newAccessToken,
        });
    } catch (error: any) {
        next(error);
    }
};

export const logoutController = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        if (req.userId) {
            await User.findByIdAndUpdate(req.userId, {
                refreshToken: null,
            })
        }
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/"
        });

        return res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (error: any) {
        next(error);
    }
};

export const getMyProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }

        return res.status(200).json({
            success: true,
            user,
        });
    } catch (error: any) {
        next(error);
    }
};
