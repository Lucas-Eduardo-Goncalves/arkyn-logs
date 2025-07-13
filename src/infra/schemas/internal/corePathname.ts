import z from "zod";
import { paginationSchema } from "../template/pagination";

const createCorePathnameSchema = z.object({
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
});

const deleteCorePathnameSchema = z.object({
  corePathnameId: z.string().uuid("Invalid id format"),
});

const listCorePathnamesSchema = paginationSchema.extend({
  trafficSourceId: z
    .string()
    .min(1, "Traffic source id is required")
    .uuid("Invalid traffic source id format"),
});

export {
  createCorePathnameSchema,
  deleteCorePathnameSchema,
  listCorePathnamesSchema,
};
