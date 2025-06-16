import { z } from "zod";

const paginationSchema = z.object({
  page: z.number().int().min(1).optional(),
  pageLimit: z.number().int().min(1).max(100).optional(),
  sort: z.string().optional(),
  sortDirection: z.enum(["asc", "desc"]).optional(),
});

export { paginationSchema };
