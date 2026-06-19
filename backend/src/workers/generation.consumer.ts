import { ConsumeMessage } from "amqplib";
import { getChannel } from "../config/rabbitmq";
import { QUEUES } from "../constants/queue.constants";
import { AssessmentResult } from "../models/assessment-result.model";
import { GENERATION_STATUS } from "../constants/assessment.constants";
import { generateAssessmentFromPrompt } from "../services/assessment-generation.service";

export const startGenerationConsumer = async()=>{
    const channel = getChannel();
    let payload: {assessmentResultId:string, assignmentId:string} | undefined;
    channel.consume(
        QUEUES.GENERATE_ASSESSMENT,
        async (message: ConsumeMessage | null)=>{
            if(!message){
                return;
            }
            try {
                payload = JSON.parse(message.content.toString());
                if (!payload) {
                  throw new Error("Invalid payload");
                }

                const { assessmentResultId, assignmentId } = payload;

                await AssessmentResult.findByIdAndUpdate(
                    assessmentResultId,
                    {
                        status:GENERATION_STATUS.PROCESSING,
                    }
                );

                const sections = await generateAssessmentFromPrompt(assignmentId);

                await AssessmentResult.findByIdAndUpdate(
                    assessmentResultId,
                    {
                        status: GENERATION_STATUS.COMPLETED,
                        sections,
                    }
                );
                console.log("[Generation Job]",payload);
                channel.ack(message);
            } catch (error) {
                console.error("[RabbitMQ consumer error]", error);
                if(payload?.assessmentResultId){
                    await AssessmentResult.findByIdAndUpdate(
                        payload.assessmentResultId,
                        {
                            status: GENERATION_STATUS.FAILED,
                            errorMessage: error instanceof Error ? error.message : "Unknown Error",
                        }
                    );
                }
                channel.ack(message);
            }
        }

    );
    console.log("[RabbitMQ] Generation Consumer Started");
};