import z from "zod";
import { paginationSchema } from "../tamplate/pagination";

const authUserSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  utc: z.number(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const updateUserSchema = z.object({
  userId: z.string().uuid("Invalid id format"),
  name: z.string().min(1, "Name is required").optional(),
  utc: z.number().optional(),
});

const deleteUserSchema = z.object({
  userId: z.string().uuid("Invalid id format"),
});

const listUsersSchema = paginationSchema;

export {
  authUserSchema,
  createUserSchema,
  deleteUserSchema,
  updateUserSchema,
  listUsersSchema,
};
