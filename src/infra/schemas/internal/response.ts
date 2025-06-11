import z from "zod";

const createResponseSchema = z.object({
  headers: z.record(z.string(), z.string()),
  body: z.record(z.string(), z.string()).nullable(),
});

const deleteResponseSchema = z.object({
  responseId: z.string().uuid("Invalid id format"),
});

export { createResponseSchema, deleteResponseSchema };
