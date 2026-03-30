import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

interface AccessTokenPayload extends JwtPayload {
  id: string;
}
export const socketAuth = (socket: any, next: any) => {
  try {
    // Try reading accessToken from cookie header (HttpOnly cookie approach)
    const rawCookies = socket.handshake.headers.cookie || "";
    const cookies: Record<string, string> = Object.fromEntries(
      rawCookies.split("; ").filter(Boolean).map((c: string) => {
        const [k, ...v] = c.split("=");
        return [k, v.join("=")];
      })
    );
    const token = cookies["accessToken"] || socket.handshake.auth?.token;

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
