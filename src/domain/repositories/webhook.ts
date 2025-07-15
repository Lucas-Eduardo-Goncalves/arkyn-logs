import { Webhook } from "../entities/webhook";

type WebhookRepository = {
  findAll: (trafficSourceId: string) => Promise<Webhook[]>;
  findById: (webhookId: string) => Promise<Webhook | null>;
  createWebhook: (webhook: Webhook) => Promise<Webhook>;
  updateWebhook: (webhook: Webhook) => Promise<Webhook>;
  deleteWebhook: (webhook: Webhook) => Promise<void>;
};

export type { WebhookRepository };
