import { Assignment } from "../models/assignment.model";

export const generateMockAssessment = async(assignmentId: string)=>{
    const assignment = await Assignment.findById(assignmentId);

    if(!assignment){
        throw new Error("Assignment not found");
    }

    return [
        {
            title: "Section A",
            instruction: "Attempt all questions",
            questions: [
                {
                    text: "Explain process scheduling",
                    difficulty:"Easy",
                    marks: 5,
                },
                {
                    text:"What is deadlock?",
                    difficulty: "Medium",
                    marks:10,
                },
            ],
        },
    ];
};