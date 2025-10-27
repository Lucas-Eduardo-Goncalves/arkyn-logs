import { TrafficSourceRepository } from "../../../domain/repositories/trafficSource";
import { WebhookRepository } from "../../../domain/repositories/webhook";
import { HttpAdapter } from "../../../infra/adapters/httpAdapter";

type InputProps = {
  webhookId: string;
  value: string;
  level: "fatal" | "warning" | "info";
};

class UpdateWebhookUseCase {
  constructor(
    private webhookRepository: WebhookRepository,
    private trafficSourceRepository: TrafficSourceRepository
  ) {}

  async execute(input: InputProps, userId: string) {
    const { webhookId, value, level } = input;

    const webhook = await this.webhookRepository.findById(webhookId);

    if (!webhook) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.notFound("Webhook not found");
    }

    const trafficSource = await this.trafficSourceRepository.findById(
      webhook.trafficSourceId
    );

    if (!trafficSource) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.notFound("Traffic source not found");
    }

    if (trafficSource.userId !== userId) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.forbidden("You do not own this traffic source.");
    }

    webhook.updateWebhook({ value, level });

    await this.webhookRepository.updateWebhook(webhook);
    return webhook.toJson();
  }
}

export { UpdateWebhookUseCase };
