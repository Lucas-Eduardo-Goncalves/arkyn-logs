import { TrafficSourceRepository } from "../../../domain/repositories/trafficSource";
import { WebhookRepository } from "../../../domain/repositories/webhook";
import { HttpAdapter } from "../../../infra/adapters/httpAdapter";

type InputProps = {
  trafficSourceId: string;
  discordChannelId?: string;
};

class UpdateWebhookUseCase {
  constructor(
    private webhookRepository: WebhookRepository,
    private trafficSourceRepository: TrafficSourceRepository
  ) {}

  async execute(input: InputProps, userId: string) {
    const { trafficSourceId, discordChannelId } = input;

    const trafficSource = await this.trafficSourceRepository.findById(
      trafficSourceId
    );

    if (!trafficSource) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.notFound("Traffic source not found");
    }

    if (trafficSource.userId !== userId) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.forbidden("You do not own this traffic source.");
    }

    const webhook = await this.webhookRepository.findByTrafficSourceId(
      trafficSourceId
    );

    if (!webhook) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.notFound("Webhook not found for this traffic source");
    }

    webhook.updateWebhook({ discordChannelId });

    await this.webhookRepository.updateWebhook(webhook);
    return webhook.toJson();
  }
}

export { UpdateWebhookUseCase };
