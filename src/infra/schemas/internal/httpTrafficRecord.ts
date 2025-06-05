import { z } from "zod";

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
  method: z.enum(["GET", "POST", "PUT", "DELETE", "PATCH"]),
  trafficUserId: z.string().uuid("Invalid traffic user id format").nullable(),
  requestHeaders: z.record(z.string()),
  requestBody: z.record(z.string()),
  queryParams: z.record(z.string()),
  responseHeaders: z.record(z.string()),
  responseBody: z.record(z.string()),
});

export { composeHttpTrafficRecordSchema };
