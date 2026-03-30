import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./modules/auth/auth.routes";
import conversationRoutes from "./modules/conversation/conversation.routes";
import messagesRoutes from "./modules/messages/message.routes"
import userRoutes from "./modules/user/user.routes"
import cookieParser from "cookie-parser";
import morgan from "morgan";

const app: Application = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(helmet());
app.use("/api/auth", authRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/user", userRoutes)

import { errorHandler } from "./middlewares/errorHandler";

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.use(errorHandler);

export default app;
