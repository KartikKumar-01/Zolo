import redis from "../../config/redis";

export const RedisService = {
    async setUserOnline(userId: string){
        await redis.sadd("online:users", userId);
        await redis.set(`online:user:${userId}`, "1", "EX", 120);
    },

    async setUserOffline(userId: string) {
        await redis.srem("online:users", userId);
        await redis.del(`online:user:${userId}`)
        await redis.set(`user:lastSeen:${userId}`, Date.now());
    },

    async isUserOnline(userId: string){
        return redis.sismember("online:users", userId);
    },

    async addSocket(userId: string, socketId: string){
        await  redis.sadd(`socket:user:${userId}`, socketId);
        await redis.set(`socket:id:${socketId}`, userId, "EX", 500);
    },

    async removeSocket(userId: string, socketId: string){
        await redis.srem(`socket:user:${userId}`, socketId);
        await redis.del(`socket:id:${socketId}`, userId);
    },

    async getUserSockets(userId: string){
        return redis.smembers(`socket:user:${userId}`);
    },

    async incUnreadCount(userId: string, conversationId: string){
        await redis.incr(`unread:${userId}:${conversationId}`);
        await redis.incr(`unread:total:${userId}`);
    }
}