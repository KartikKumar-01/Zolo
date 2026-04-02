import { Server } from 'socket.io'
import { socketAuth } from './auth'
import { registerConversationEvents } from './events/conversation';
import app from '../app';
import { RedisService } from '../modules/redis/redis.service';
export const initSocket = (server: any) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true,
        }
    })
    app.set("io", io);

    io.use(socketAuth);

    io.on("connection", async (socket: any) => {
        console.log("User Connected: ", socket.userId);
        await RedisService.setUserOnline(socket.userId);
        await RedisService.addSocket(socket.userId, socket.id);
        socket.join(socket.userId!);

        io.emit('user:online', {
            userId: socket.data.userId,
        })

        registerConversationEvents(io, socket);
        socket.on("disconnect", async () => {
            console.log("user disconnected: ", socket.userId);
            await RedisService.removeSocket(socket.userId, socket.id);

            const remSockets = await RedisService.getUserSockets(socket.data.userId);
            if(remSockets.length == 0){
                await RedisService.setUserOffline(socket.data.userId);
                io.emit('user:offline', {
                    userId: socket.data.userId,
                    lastSeen: new Date(Date.now()).toISOString()
                })
            }
        })
    })
}