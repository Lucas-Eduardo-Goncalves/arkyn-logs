import { Webhook } from "../entities/webhook";

type WebhookRepository = {
  findByTrafficSourceId: (trafficSourceId: string) => Promise<Webhook | null>;
  createWebhook: (webhook: Webhook) => Promise<Webhook>;
  updateWebhook: (webhook: Webhook) => Promise<Webhook>;
};

export type { WebhookRepository };
