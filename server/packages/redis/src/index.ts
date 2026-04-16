import Redis from "ioredis";

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD || undefined,
    retryStrategy(times) {
        return Math.min(times * 50, 2000);
    },
})

redis.on("connect", () => {
    console.log("Redis Connected");
})

redis.on("error", (err) => {
    console.log("Redis Error: ", err);
})

export default redis;
export const pubClient = redis.duplicate();
export const subClient = redis.duplicate();
export { RedisService } from "./redis.service";
export { publishMessage } from "./publisher";
export { subscribe } from "./subscriber";