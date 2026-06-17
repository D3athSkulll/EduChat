import { Assignment, IAssignment } from "../models/assignment.model";
import { AppError } from "../utils/AppError";
import { isValidObjectId } from "../utils/isValidObjectId";
interface CreateAssignmentPayload {
    title: string;
    dueDate: string;
    instructions?: string;
    questionTypes: string[];
    totalQuestions: number;
    totalMarks: number;
}

export const createAssignment = async(
    payload: CreateAssignmentPayload
): Promise<IAssignment> =>{
    const{
        title,
        dueDate,
        instructions,
        questionTypes,
        totalQuestions,
        totalMarks,
    } = payload;

    const assignment = await Assignment.create({
        title,
        dueDate,
        instructions,
        questionTypes,
        totalQuestions,
        totalMarks,
    });

    return assignment;
};

export const getAssignments = async () => {
    return Assignment.find()
        .sort({createdAt: -1})
        .lean();
};

export const getAssignmentById = async(id: string) => {
    if(!isValidObjectId(id)){
        throw new AppError("Invalid Assignment Id", 400);
    }

    const assignment = await Assignment.findById(id).lean();

    if(!assignment){
        throw new AppError("Assignment not found", 404);
    }

    return assignment;
};