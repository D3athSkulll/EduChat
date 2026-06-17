import { Assignment, IAssignment } from "../models/assignment.model";

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