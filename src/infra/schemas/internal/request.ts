import z from "zod";

const createRequestSchema = z.object({
  headers: z.record(z.string(), z.string()),
  body: z.record(z.string(), z.string()),
  queryParams: z.record(z.string(), z.string()),
  httpTrafficId: z.string().uuid("Invalid httpTrafficId format"),
});

const deleteRequestSchema = z.object({
  requestId: z.string().uuid("Invalid id format"),
});

export { createRequestSchema, deleteRequestSchema };
