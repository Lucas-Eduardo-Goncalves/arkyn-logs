import z from "zod";

const createLogChannelSchema = z.object({
  name: z.string().min(1, "Name is required"),
  userId: z.string().uuid("Invalid user ID format"),
});

const updateLogChannelSchema = z.object({
  id: z.string().uuid("Invalid ID format"),
  name: z.string().min(1, "Name is required").optional(),
});

const deleteLogChannelSchema = z.object({
  id: z.string().uuid("Invalid ID format"),
});

export {
  createLogChannelSchema,
  deleteLogChannelSchema,
  updateLogChannelSchema,
};
