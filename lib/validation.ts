import z from "zod";

export const passwordSchema = z
  .string()
  .min(1, { message: "Password is required" })
  .min(8, { message: "Password must be at least 8 characters" });

// 24-character hexadecimal ObjectId regex (safe for both browser and server)
const OBJECT_ID_REGEX = /^[0-9a-fA-F]{24}$/;

export const createMessageSchema = z.object({
  recipientId: z
    .string()
    .trim()
    .min(1, { message: "Recipient ID is required" })
    .regex(OBJECT_ID_REGEX, {
      message: "Invalid recipient ID format",
    }),
  text: z
    .string()
    .trim()
    .min(1, { message: "Message cannot be empty" })
    .max(500, { message: "Message cannot exceed 500 characters" }),
});

export type CreateMessageInput = z.infer<typeof createMessageSchema>;

