import z from "zod";

const createPathnameSchema = z.object({
  value: z
    .string()
    .min(1, "Value is required")
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
  domainId: z
    .string()
    .min(1, "Pathname id is required")
    .uuid("Invalid domain id format"),
});

const deletePathnameSchema = z.object({
  pathnameId: z.string().uuid("Invalid id format"),
});

export { createPathnameSchema, deletePathnameSchema };
