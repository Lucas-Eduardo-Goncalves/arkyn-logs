import z from "zod";

const createRequestSchema = z.object({
  headers: z.record(z.string(), z.string()),
  body: z.record(z.string(), z.string()).nullable(),
  queryParams: z.record(z.string(), z.string()),
});

const deleteRequestSchema = z.object({
  requestId: z.string().uuid("Invalid id format"),
});

export { createRequestSchema, deleteRequestSchema };
