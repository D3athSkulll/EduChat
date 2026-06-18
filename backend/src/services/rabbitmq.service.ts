import { getChannel } from "../config/rabbitmq";

export const publishMessage = async(
    queue:string,
    payload:Object,
)=>{
    const channel = getChannel();

    channel.sendToQueue(queue, Buffer.from(
        JSON.stringify(payload)
    ),
    {
        persistent:true
    }
    );
};