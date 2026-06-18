import {
  Schema,
  model,
  Types,
} from "mongoose";
import { Assignment } from "./assignment.model";
import { GENERATION_STATUS } from "../constants/assessment.constants";

const questionSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },

    difficulty: {
      type: String,
      enum: [
        "easy",
        "medium",
        "hard",
      ],
      required: true,
    },

    marks: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
  }
);

const sectionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    instruction: {
      type: String,
      required: true,
    },

    questions: {
      type: [questionSchema],
      default: [],
    },
  },
  {
    _id: false,
  }
);

const assessmentResultSchema = new Schema(
    {
        assignmentId: {
            type: Types.ObjectId,
            ref: "Assignment",
            required: true,
        },

        status: {
            type: String,
            enum: Object.values(GENERATION_STATUS),
            default: GENERATION_STATUS.PENDING,
        },

        sections: {
            type: [sectionSchema],
            default: [],
        },

        errorMessage: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

export const AssessmentResult =
  model(
    "AssessmentResult",
    assessmentResultSchema
  );