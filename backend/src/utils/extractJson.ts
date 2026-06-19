export const extractJson = (text: string): string => {
    return text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
};