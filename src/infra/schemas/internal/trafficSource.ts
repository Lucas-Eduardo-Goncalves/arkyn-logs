import z from "zod";
import { paginationSchema } from "../template/pagination";

const createTrafficSourceSchema = z.object({
  name: z.string().min(1, "Name is required"),
  trafficDomain: z
    .string()
    .min(1, "Traffic domain is required")
    .url("Invalid URL format"),
  token: z.string().min(1, "Authentication token is required"),
});

const updateTrafficSourceSchema = z.object({
  trafficSourceId: z.string().uuid("Invalid id format"),
  trafficDomain: z
    .string()
    .min(1, "Traffic domain is required")
    .url("Invalid URL format")
    .optional(),
  name: z.string().min(1, "Name is required").optional(),
});

const deleteTrafficSourceSchema = z.object({
  trafficSourceId: z.string().uuid("Invalid id format"),
});

const listTrafficSourcesSchema = paginationSchema.extend({
  userId: z.string().uuid("Invalid user id format"),
});

export {
  createTrafficSourceSchema,
  deleteTrafficSourceSchema,
  updateTrafficSourceSchema,
  listTrafficSourcesSchema,
};
