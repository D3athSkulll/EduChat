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

export const getAssignments = async () => {
    return Assignment.find()
        .sort({createdAt: -1})
        .lean();
};

export const getAssignmentById = async(id: string) => {
    const assignment = await Assignment.findById(id).lean();

    if(!assignment){
        throw new Error("Assignment not found");
    }

    return assignment;
};