import z from "zod";

const createTrafficSourceSchema = z.object({
  name: z.string().min(1, "Name is required"),
  trafficDomain: z
    .string()
    .min(1, "Traffic domain is required")
    .url("Invalid URL format"),
  userId: z.string().uuid("Invalid user id format"),
});

const updateTrafficSourceSchema = z.object({
  id: z.string().uuid("Invalid id format"),
  trafficDomain: z
    .string()
    .min(1, "Traffic domain is required")
    .url("Invalid URL format")
    .optional(),
  name: z.string().min(1, "Name is required").optional(),
});

const deleteTrafficSourceSchema = z.object({
  id: z.string().uuid("Invalid id format"),
});

export {
  createTrafficSourceSchema,
  deleteTrafficSourceSchema,
  updateTrafficSourceSchema,
};
