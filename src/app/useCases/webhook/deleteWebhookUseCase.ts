import { TrafficSourceRepository } from "../../../domain/repositories/trafficSource";
import { WebhookRepository } from "../../../domain/repositories/webhook";
import { HttpAdapter } from "../../../infra/adapters/httpAdapter";

type InputProps = {
  webhookId: string;
};

class DeleteWebhookUseCase {
  constructor(
    private webhookRepository: WebhookRepository,
    private trafficSourceRepository: TrafficSourceRepository
  ) {}

  async execute(input: InputProps, userId: string) {
    const { webhookId } = input;

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

    await this.webhookRepository.deleteWebhook(webhook);
    return;
  }
}

export { DeleteWebhookUseCase };
