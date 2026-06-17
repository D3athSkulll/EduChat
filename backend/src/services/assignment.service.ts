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

    if(!title.trim()){
        throw new Error("Title is required");
    }

    if(totalQuestions <= 0){
        throw new Error("Total Questions should be greater than 0");
    }

    if(totalMarks <= 0){
        throw new Error("Total Marks should be greater than 0");
    }

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