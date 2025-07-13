import z from "zod";

const listWebhookSchema = z.object({
  trafficSourceId: z.string().uuid("Invalid traffic source ID format"),
});

const updateWebhookSchema = z.object({
  trafficSourceId: z.string().uuid("Invalid traffic source ID format"),
  discordChannelId: z.string().optional(),
});

export { updateWebhookSchema, listWebhookSchema };
