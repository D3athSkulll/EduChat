import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const client = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY!});

export const generateAssessment = async(
    prompt: string
): Promise<string>=>{
    const response = await client.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
    });

    return (response.text ?? "");
};