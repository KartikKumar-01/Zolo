import { Kafka } from "kafkajs";

const kafka: Kafka = new Kafka({
    clientId: "zolo-kafka",
    brokers: [process.env.KAFKA_BROKERS || "localhost:9092"],
});

export default kafka;
export * from "./producer";
export * from "./consumer";