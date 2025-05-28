import z from "zod";

const registerLogErrorSchema = z.object({
  logChannelId: z.string().uuid("Invalid log channel ID format"),
  message: z.string().min(1, "Message is required"),
  metadata: z.any(),
});

export { registerLogErrorSchema };
