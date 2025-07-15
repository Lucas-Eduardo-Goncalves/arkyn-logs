import z from "zod";
import { paginationSchema } from "../template/pagination";

const createCoreLogSchema = z.object({
  trafficSourceId: z
    .string()
    .min(1, "Traffic source id is required")
    .uuid("Invalid traffic source id format"),
  status: z.number().int("Status must be an integer"),
  method: z.enum(["get", "post", "put", "delete", "patch"]),
  trafficUserId: z.string().uuid("Invalid traffic user id format").nullable(),
  elapsedTime: z.number().min(0, "Elapsed time must be a non-negative number"),
  corePathnameId: z.string().uuid("Invalid pathname id format"),
  requestId: z.string().uuid("Invalid request id format"),
  responseId: z.string().uuid("Invalid response id format"),
});

const deleteCoreLogSchema = z.object({
  coreLogId: z.string().uuid("Invalid http traffic ID format"),
});

const listCoreLogsSchema = paginationSchema.extend({
  trafficSourceId: z
    .string()
    .min(1, "Traffic source id is required")
    .uuid("Invalid traffic source id format"),
});

export { createCoreLogSchema, deleteCoreLogSchema, listCoreLogsSchema };
