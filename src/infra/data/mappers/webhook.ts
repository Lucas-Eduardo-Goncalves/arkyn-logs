import { Webhook } from "../../../domain/entities/webhook";

type WebhookMapperDTO = {
  id: string;
  discordChannelId: string | null;
  trafficSourceId: string;
  createdAt: Date;
  updatedAt: Date;
};

class WebhookMapper {
  static toEntity(webhook: WebhookMapperDTO): Webhook {
    return Webhook.restore({
      id: webhook.id,
      discordChannelId: webhook.discordChannelId,
      trafficSourceId: webhook.trafficSourceId,
      createdAt: webhook.createdAt,
      updatedAt: webhook.updatedAt,
    });
  }
}
export { WebhookMapper };
