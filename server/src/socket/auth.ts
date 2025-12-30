import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

interface AccessTokenPayload extends JwtPayload {
  id: string;
}
export const socketAuth = (socket: any, next: any) => {
  try {
    const token = socket.handshake.auth?.token;
    if (!token) {
      return next(new Error("Unauthorized"));
    }

    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET! as string
    ) as AccessTokenPayload;
    socket.userId = decoded.id;

    next();
  } catch (error) {
    next(new Error("Unauthorized"));
  }
};
