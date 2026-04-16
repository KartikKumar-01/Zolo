import Redis from "ioredis";

const publisher = new Redis({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD || undefined,
    retryStrategy(times) {
        return Math.min(times * 50, 2000);
    },
})

publisher.on("connect", () => {
    console.log("Redis publisher connected.");
})

publisher.on("error", (err) => {
    console.log("Redis publisher error.", err);
})

async function publishMessage(channel: string, message: object): Promise<void> {
    try {
        await publisher.publish(channel, JSON.stringify(message));
    } catch (error) {
        console.error(`[Redis] Failed to publish to ${channel}:`, error);
        throw error;
    }
}

export { publishMessage };