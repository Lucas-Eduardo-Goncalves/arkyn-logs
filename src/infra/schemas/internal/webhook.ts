import z from "zod";

const listWebhookSchema = z.object({
  trafficSourceId: z.string().uuid("Invalid traffic source ID format"),
});

const createWebhookSchema = z.object({
  trafficSourceId: z.string().uuid("Invalid traffic source ID format"),
  value: z.string().min(1, "Webhook value must not be empty"),
  type: z.enum(["discord"], {
    message: "Invalid webhook type",
  }),
  level: z.enum(["fatal", "warning", "info"], {
    message: "Invalid webhook level",
  }),
});

const updateWebhookSchema = z.object({
  webhookId: z.string().uuid("Invalid traffic source ID format"),
  value: z.string().min(1, "Webhook value must not be empty"),
  level: z.enum(["fatal", "warning", "info"], {
    message: "Invalid webhook level",
  }),
});

const deleteWebhookSchema = z.object({
  webhookId: z.string().uuid("Invalid traffic source ID format"),
});

export {
  createWebhookSchema,
  listWebhookSchema,
  updateWebhookSchema,
  deleteWebhookSchema,
};
