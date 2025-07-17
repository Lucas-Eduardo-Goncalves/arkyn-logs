import { Webhook } from "../../../domain/entities/webhook";
import { TrafficSourceRepository } from "../../../domain/repositories/trafficSource";
import { WebhookRepository } from "../../../domain/repositories/webhook";
import { HttpAdapter } from "../../../infra/adapters/httpAdapter";

type InputProps = {
  trafficSourceId: string;
  value: string;
  type: "discord";
  level: "fatal" | "warning" | "info";
};

class CreateWebhookUseCase {
  constructor(
    private webhookRepository: WebhookRepository,
    private trafficSourceRepository: TrafficSourceRepository
  ) {}

  async execute(input: InputProps, userId: string) {
    const { level, trafficSourceId, type, value } = input;

    const [webhooks, trafficSource] = await Promise.all([
      await this.webhookRepository.findAll(trafficSourceId),
      await this.trafficSourceRepository.findById(trafficSourceId),
    ]);

    if (!trafficSource) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.notFound("Traffic source not found");
    }

    if (trafficSource.userId !== userId) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.forbidden("You do not own this traffic source.");
    }

    const webhookAlreadyExistsForLevel = webhooks.some(
      (webhook) => webhook.level === level
    );

    if (webhookAlreadyExistsForLevel) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.conflict("Webhook for this level already exists");
    }

    const webhook = Webhook.create({ level, type, trafficSourceId, value });
    await this.webhookRepository.createWebhook(webhook);
    return webhook.toJson();
  }
}

export { CreateWebhookUseCase };
