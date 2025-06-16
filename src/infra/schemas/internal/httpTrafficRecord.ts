import { z } from "zod";
import { paginationSchema } from "../tamplate/pagination";

const composeHttpTrafficRecordSchema = z.object({
  domainUrl: z
    .string()
    .min(1, "Domain url is required")
    .url("Invalid URL format"),
  pathnameUrl: z
    .string()
    .min(1, "Pathname url is required")
    .regex(/^\//, "Pathname must start with /")
    .refine(
      (val) => {
        try {
          new URL(`http://example.com${val}`);
          return true;
        } catch (error) {
          return false;
        }
      },
      { message: "Invalid pathname format" }
    ),
  trafficSourceId: z
    .string()
    .min(1, "Traffic source id is required")
    .uuid("Invalid traffic source id format"),
  status: z.number().int("Status must be an integer"),
  protocol: z.enum(["HTTP", "HTTPS"]),
  method: z.enum(["GET", "POST", "PUT", "DELETE", "PATCH"]),
  trafficUserId: z.string().uuid("Invalid traffic user id format").nullable(),
  elapsedTime: z.number().min(0, "Elapsed time must be a non-negative number"),
  requestHeaders: z.record(z.string()),
  requestBody: z.record(z.string()).nullable(),
  queryParams: z.record(z.string()),
  responseHeaders: z.record(z.string()),
  responseBody: z.record(z.string()).nullable(),
});

const listHttpTrafficRecordsSchema = paginationSchema.extend({
  trafficSourceId: z
    .string()
    .min(1, "Traffic source id is required")
    .uuid("Invalid traffic source id format"),
  requestHeaders: z
    .string()
    .optional()
    .transform((val) => (val ? JSON.parse(val) : undefined))
    .pipe(z.record(z.string()).optional()),
  requestBody: z
    .string()
    .optional()
    .transform((val) => (val ? JSON.parse(val) : undefined))
    .pipe(z.record(z.string()).optional()),
  responseHeaders: z
    .string()
    .optional()
    .transform((val) => (val ? JSON.parse(val) : undefined))
    .pipe(z.record(z.string()).optional()),
  responseBody: z
    .string()
    .optional()
    .transform((val) => (val ? JSON.parse(val) : undefined))
    .pipe(z.record(z.string()).optional()),
  queryParams: z
    .string()
    .optional()
    .transform((val) => (val ? JSON.parse(val) : undefined))
    .pipe(z.record(z.string()).optional()),
  method: z.enum(["GET", "POST", "PUT", "DELETE", "PATCH"]).optional(),
  level: z.enum(["INFO", "WARNING", "DEBUG"]).optional(),
  status: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : undefined))
    .pipe(z.number().int("Status must be an integer").optional()),
  protocol: z.enum(["HTTP", "HTTPS"]).optional(),
});

export { composeHttpTrafficRecordSchema, listHttpTrafficRecordsSchema };
