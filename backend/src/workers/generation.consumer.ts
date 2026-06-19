import { ConsumeMessage } from "amqplib";
import { getChannel } from "../config/rabbitmq";
import { QUEUES } from "../constants/queue.constants";

export const startGenerationConsumer = async()=>{
    const channel = getChannel();
    channel.consume(
        QUEUES.GENERATE_ASSESSMENT,
        async (message: ConsumeMessage | null)=>{
            if(!message){
                return;
            }
            try {
                const payload = JSON.parse(message.content.toString());
                console.log("[Generation Job]",payload);
                channel.ack(message);
            } catch (error) {
                console.error("[RabbitMQ consumer error]", error);
                channel.nack(message, false, false);
            }
        }

    );
    console.log("[RabbitMQ] Generation Consumer Started");
};