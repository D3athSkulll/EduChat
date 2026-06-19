import {z} from "zod";

const questionSchema = z.object({
    text: z.string(),
    difficulty: z.enum(["Easy","Medium","Hard",]),
    marks: z.number(),
});

const sectionSchema = z.object({
    title: z.string(),
    instruction: z.string(),
    questions: z.array(questionSchema),
});

export const assessmentResponseSchema = z.object({
    sections: z.array(sectionSchema),
});