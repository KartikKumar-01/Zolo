import { Producer, Message, Partitioners } from "kafkajs";
import kafka from ".";

const producer: Producer = kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner,
});

async function startProducer() {
    try {
        await producer.connect();
        console.log("Kafka started.");
    } catch (error) {
        console.error('[Kafka] Producer failed to connect:', error);
        process.exit(1);
    }
}

async function sendMessage(topic: string, messages) {
  try {
    await producer.send({ topic, messages });
  } catch (err) {
    console.error(`[Kafka] Failed to send to topic ${topic}:`, err);
    throw err; 
  }
}


export { startProducer, sendMessage };