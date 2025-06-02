import z from "zod";

const createDomainSchema = z.object({
  value: z.string().min(1, "Value is required").url("Invalid URL format"),
  trafficSourceId: z
    .string()
    .min(1, "Traffic source id is required")
    .uuid("Invalid Traffic Source ID format"),
});

const deleteDomainSchema = z.object({
  id: z.string().uuid("Invalid ID format"),
});

export { createDomainSchema, deleteDomainSchema };
