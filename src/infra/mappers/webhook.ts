import { Webhook } from "../../domain/entities/webhook";

type WebhookMapperDTO = {
  id: string;
  value: string;
  level: "fatal" | "warning" | "info";
  type: "discord";
  trafficSourceId: string;
  createdAt: Date;
  updatedAt: Date;
};

class WebhookMapper {
  static toEntity(webhook: WebhookMapperDTO): Webhook {
    return Webhook.restore({
      id: webhook.id,
      value: webhook.value,
      level: webhook.level,
      type: webhook.type,
      trafficSourceId: webhook.trafficSourceId,
      createdAt: new Date(webhook.createdAt),
      updatedAt: new Date(webhook.updatedAt),
    });
  }
}
export { WebhookMapper };
