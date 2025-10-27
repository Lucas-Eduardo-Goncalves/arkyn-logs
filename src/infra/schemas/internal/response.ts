import z from "zod";

const createResponseSchema = z.object({
  headers: z.string().min(1, "Headers cannot be empty"),
  body: z.string().nullable(),
});

const deleteResponseSchema = z.object({
  responseId: z.string().uuid("Invalid id format"),
});

export { createResponseSchema, deleteResponseSchema };
