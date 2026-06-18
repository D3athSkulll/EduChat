import {Request,Response} from "express";
import { publishMessage } from "../services/rabbitmq.service";
import { QUEUES } from "../constants/queue.constants";
import { asyncHandler } from "../utils/asyncHandler";
import { apiResponse } from "../utils/apiResponse";

export const sendTestMessageController = asyncHandler(async(
    req: Request,
    res: Response
)=>{
    await publishMessage(
        QUEUES.GENERATE_ASSESSMENT,
        {
            message: "RabbitMQ is working",
            timestamp: new Date().toISOString(),
        }
    );

    res.status(200).json(
        apiResponse(null,"Message published successfully")
    );
});