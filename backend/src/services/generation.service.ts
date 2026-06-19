import { GENERATION_STATUS } from "../constants/assessment.constants";
import { QUEUES } from "../constants/queue.constants";
import { AssessmentResult } from "../models/assessment-result.model";
import { Assignment } from "../models/assignment.model";

import { AppError } from "../utils/AppError";
import { isValidObjectId } from "../utils/isValidObjectId";
import { publishMessage } from "./rabbitmq.service";

export const createGenerationRequest = async(assignmentId: string)=>{
    if(!isValidObjectId(assignmentId)){
        throw new AppError("Invalid Assignment Id", 400);
    }

    const assignment = await Assignment.findById(assignmentId);

    if(!assignment){
        throw new AppError("Assignment not found",404);
    }

    const result = await AssessmentResult.create({
        assignmentId,
        status: GENERATION_STATUS.PENDING
    });

    await publishMessage(
        QUEUES.GENERATE_ASSESSMENT,
        {
            assignmentId,
            assessmentResultId: result._id.toString()
        }
    );

    return result;
};
