import { TrafficSourceRepository } from "../../../domain/repositories/trafficSource";
import { WebhookRepository } from "../../../domain/repositories/webhook";
import { HttpAdapter } from "../../../infra/adapters/httpAdapter";

type InputProps = {
  trafficSourceId: string;
};

class ListWebhooksUseCase {
  constructor(
    private webhookRepository: WebhookRepository,
    private trafficSourceRepository: TrafficSourceRepository
  ) {}

  async execute(input: InputProps, userId: string) {
    const { trafficSourceId } = input;

    const trafficSource = await this.trafficSourceRepository.findById(
      trafficSourceId
    );

    if (!trafficSource) {
      throw HttpAdapter.notFound("Traffic source not found");
    }

    if (trafficSource.userId !== userId) {
      throw HttpAdapter.forbidden("You do not own this traffic source.");
    }

    const webhook = await this.webhookRepository.findAll(trafficSourceId);

    if (!webhook) {
      throw HttpAdapter.notFound("Webhook not found for this traffic source");
    }

    return webhook.map((w) => w.toJson());
  }
}

export { ListWebhooksUseCase };
