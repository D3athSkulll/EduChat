import {Document, Schema, model} from "mongoose";
import { GENERATION_STATUS, GenerationStatus } from "../constants/assessment.constants";

export interface IAssignment extends Document {
    title: string;
    dueDate: Date;
    instructions?: string;
    questionTypes: string[];
    totalQuestions: number;
    totalMarks: number;

    status: GenerationStatus;

    createdAt: Date;
    updatedAt: Date;
}

const assignmentSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        dueDate: {
            type: Date,
            required: true,
        },

        instructions: {
            type: String,
            default: "",
        },

        questionTypes: {
            type: [String],
            required: true,
            default: [],
        },

        totalQuestions: {
            type: Number,
            required: true,
            min: 1,
        },

        totalMarks: {
            type: Number,
            required: true,
            min: 1,
        },

        status: {
            type: String,
            enum: Object.values(GENERATION_STATUS),
            default: GENERATION_STATUS.PENDING,
        },
    },
    {
        timestamps: true,
    }
);

export const Assignment = model(
    "Assignment",
    assignmentSchema
);