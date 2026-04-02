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
export { RedisService } from "./redis.service";