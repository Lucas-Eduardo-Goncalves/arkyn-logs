import z from "zod";
import { paginationSchema } from "../template/pagination";

const createDomainSchema = z.object({
  value: z.string().min(1, "Value is required").url("Invalid URL format"),
  protocol: z.enum(["HTTP", "HTTPS"]),
  trafficSourceId: z
    .string()
    .min(1, "Traffic source id is required")
    .uuid("Invalid traffic source id format"),
});

const deleteDomainSchema = z.object({
  domainId: z.string().uuid("Invalid id format"),
});

const listDomainsSchema = paginationSchema.extend({
  trafficSourceId: z
    .string()
    .min(1, "Traffic source id is required")
    .uuid("Invalid traffic source id format"),
});

export { createDomainSchema, deleteDomainSchema, listDomainsSchema };
