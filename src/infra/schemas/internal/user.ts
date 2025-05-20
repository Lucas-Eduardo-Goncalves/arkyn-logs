import z from "zod";

const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  utc: z.number(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const updateUserSchema = z.object({
  id: z.string().uuid("Invalid ID format"),
  name: z.string().min(1, "Name is required").optional(),
  utc: z.number().optional(),
});

export { createUserSchema, updateUserSchema };
