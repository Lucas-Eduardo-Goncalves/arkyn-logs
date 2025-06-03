import z from "zod";

const createDomainSchema = z.object({
  value: z.string().min(1, "Value is required").url("Invalid URL format"),
  trafficSourceId: z
    .string()
    .min(1, "Traffic source id is required")
    .uuid("Invalid traffic source id format"),
});

const deleteDomainSchema = z.object({
  domainId: z.string().uuid("Invalid id format"),
});

export { createDomainSchema, deleteDomainSchema };
