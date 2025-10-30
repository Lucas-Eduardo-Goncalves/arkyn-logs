import { Webhook } from "../../domain/entities/webhook";
import { WebhookRepository } from "../../domain/repositories/webhook";
import { databaseConnection } from "../adapters/dbAdapter";
import { WebhookMapper } from "../mappers/webhook";

class PrismaWebhookRepository implements WebhookRepository {
  async findAll(trafficSourceId: string): Promise<Webhook[]> {
    const data = await databaseConnection.webhook.findMany({
      where: { trafficSourceId },
    });

    return data.map(WebhookMapper.toEntity);
  }

  async findById(webhookId: string): Promise<Webhook | null> {
    const webhook = await databaseConnection.webhook.findUnique({
      where: { id: webhookId },
    });

    if (!webhook) return null;

    return WebhookMapper.toEntity(webhook);
  }

  async findUnique(
    trafficSourceId: string,
    level: "fatal" | "warning" | "info"
  ): Promise<Webhook | null> {
    const webhook = await databaseConnection.webhook.findFirst({
      where: { trafficSourceId, level },
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

  async deleteWebhook(webhook: Webhook): Promise<void> {
    await databaseConnection.webhook.delete({
      where: { id: webhook.id },
    });
  }
}

export { PrismaWebhookRepository };
