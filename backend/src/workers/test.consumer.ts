import { ConsumeMessage } from "amqplib";
import { getChannel } from "../config/rabbitmq";
import { QUEUES } from "../constants/queue.constants";

export const startTestConsumer = async()=>{
    const channel = getChannel();
    channel.consume(
        QUEUES.GENERATE_ASSESSMENT,
        (message: ConsumeMessage | null)=>{
            if(!message){
                return;
            }
            try {
                const payload = JSON.parse(message.content.toString());
                console.log("[Consumer]",payload);
                channel.ack(message);
            } catch (error) {
                console.error("[RabbitMQ consumer error]", error);
                channel.nack(message, false, false);
            }
        }

    );
    console.log("[RabbitMQ] Test Consumer Started");
};