import z from "zod";

const createLogErrorSchema = z.object({
  logChannelId: z.string().uuid("Invalid log channel ID format"),
  message: z.string().min(1, "Message is required"),
  metadata: z.any(),
});

const updateLogErrorSchema = z.object({});

const deleteLogErrorSchema = z.object({
  id: z.string().uuid("Invalid ID format"),
});

export { createLogErrorSchema, deleteLogErrorSchema, updateLogErrorSchema };
