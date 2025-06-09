import z from "zod";

const createHttpTrafficSchema = z.object({
  trafficSourceId: z
    .string()
    .min(1, "Traffic source id is required")
    .uuid("Invalid traffic source id format"),
  status: z.number().int("Status must be an integer"),
  method: z.enum(["GET", "POST", "PUT", "DELETE", "PATCH"]),
  trafficUserId: z.string().uuid("Invalid traffic user id format").nullable(),
  domainId: z.string().uuid("Invalid domain id format"),
  elapsedTime: z.number().min(0, "Elapsed time must be a non-negative number"),
  pathnameId: z.string().uuid("Invalid pathname id format"),
  requestId: z.string().uuid("Invalid request id format"),
  responseId: z.string().uuid("Invalid response id format"),
});

const deleteHttpTrafficSchema = z.object({
  httpTrafficId: z.string().uuid("Invalid HTTP traffic ID format"),
});

export { createHttpTrafficSchema, deleteHttpTrafficSchema };
