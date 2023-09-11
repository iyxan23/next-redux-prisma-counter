import { z } from "zod";

export const messageSchema = z.object({
  amount: z.number(),
});

export const errorMessageSchema = z.object({
  error: z.string(),
});

export type CountMessageType = z.infer<typeof messageSchema>;
export type CountErrorMessageType = z.infer<typeof errorMessageSchema>;
