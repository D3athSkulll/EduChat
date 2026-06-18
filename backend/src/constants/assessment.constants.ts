export const GENERATION_STATUS = {
  PENDING: "PENDING",
  PROCESSING: "PROCESSING",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
} as const;

export type GenerationStatus =
  (typeof GENERATION_STATUS)[keyof typeof GENERATION_STATUS];