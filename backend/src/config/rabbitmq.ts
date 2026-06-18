import amqp from "amqplib";
import { QUEUES } from "../constants/queue.constants";

let connection: any;
let channel: any;

export const connectRabbitMQ = async () => {
    const url = process.env.RABBITMQ_URL;

    if (!url) {
        throw new Error("RABBITMQ_URL is missing");
    }

    connection = await amqp.connect(url);
    channel = await connection.createChannel();

    await channel.assertQueue(
        QUEUES.GENERATE_ASSESSMENT,
        { durable: true }
    );

    console.log("[RabbitMQ] Connected");
};

export const getChannel = () => {
    if (!channel) {
        throw new Error("RabbitMQ channel is not initialised");
    }

    return channel;
};