import { IAssignment } from "../models/assignment.model";

export const buildAssessmentPrompt= (assignment: IAssignment)=>{
    return `
Generate an assessment.

Requirements: 

Title: ${assignment.title}

Question Types: ${assignment.questionTypes.join(", ")}

Total Questions: ${assignment.totalQuestions}

Total Marks: ${assignment.totalMarks}

Instructions: ${assignment.instructions}

Return ONLY valid JSON

{
  "sections": [
    {
      "title": "",
      "instruction": "",
      "questions": [
        {
          "text": "",
          "difficulty": "Easy|Medium|Hard",
          "marks": 5
        }
      ]
    }
  ]
}
`;
};