import {Server} from 'socket.io'
import { socketAuth } from './auth'
import { registerConversationEvents } from './events/conversation';
import app from '../app';
export const initSocket = (server: any) => {
    const io = new Server(server, {
        cors:{
            origin:"http://localhost:5173",
            credentials:true,
        }
    })
    app.set("io", io);

    io.use(socketAuth);

    io.on("connection", (socket) => {
        console.log("User Connected: ", socket.userId);
        socket.join(socket.userId!);

        registerConversationEvents(io, socket);
        socket.on("disconnect", () => {
            console.log("user disconnected: ", socket.userId);
        })
    })
}