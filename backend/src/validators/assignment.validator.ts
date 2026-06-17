import { z } from "zod";

export const createAssignmentSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),

  dueDate: z.string(),

  instructions: z.string().optional(),

  questionTypes: z.array(z.string()).min(1, "Select atleast one question type"),

  totalQuestions: z.number().int().positive(),

  totalMarks: z.number().positive(),
});

export const updateAssignmentSchema = createAssignmentSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Atleast one field is required",
  });