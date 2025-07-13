import { Webhook } from "../../../domain/entities/webhook";
import { WebhookRepository } from "../../../domain/repositories/webhook";
import { databaseConnection } from "../../adapters/dbAdapter";
import { WebhookMapper } from "../mappers/webhook";

class PrismaWebhookRepository implements WebhookRepository {
  async findByTrafficSourceId(
    trafficSourceId: string
  ): Promise<Webhook | null> {
    const webhook = await databaseConnection.webhook.findUnique({
      where: { trafficSourceId },
    });
    if (!webhook) return null;
    return WebhookMapper.toEntity(webhook);
  }

  async createWebhook(webhook: Webhook): Promise<Webhook> {
    await databaseConnection.webhook.create({ data: webhook });
    return webhook;
  }

  async updateWebhook(webhook: Webhook): Promise<Webhook> {
    await databaseConnection.webhook.update({
      data: webhook,
      where: { id: webhook.id },
    });

    return webhook;
  }

  async deleteWebhook(webhookId: string): Promise<void> {
    await databaseConnection.webhook.delete({
      where: { id: webhookId },
    });
  }
}

export { PrismaWebhookRepository };
