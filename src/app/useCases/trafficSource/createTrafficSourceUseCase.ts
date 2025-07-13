import { TrafficSource } from "../../../domain/entities/trafficSource";
import { Webhook } from "../../../domain/entities/webhook";
import { TrafficSourceRepository } from "../../../domain/repositories/trafficSource";
import { UserRepository } from "../../../domain/repositories/user";
import { WebhookRepository } from "../../../domain/repositories/webhook";
import { HttpAdapter } from "../../../infra/adapters/httpAdapter";

type InputProps = {
  name: string;
  userId: string;
  trafficDomain: string;
};

class CreateTrafficSourceUseCase {
  constructor(
    private trafficSourceRepository: TrafficSourceRepository,
    private userRepository: UserRepository,
    private webhookRepository: WebhookRepository
  ) {}

  async execute(input: InputProps) {
    const { name, trafficDomain, userId } = input;

    const [existsUser, existsDomain] = await Promise.all([
      await this.userRepository.findById(userId),
      await this.trafficSourceRepository.findByDomain(trafficDomain),
    ]);

    if (!existsUser) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.notFound("User not found");
    }

    if (existsDomain) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.conflict("Traffic domain already exists");
    }

    const trafficSource = TrafficSource.create({ name, userId, trafficDomain });
    const webhook = Webhook.create({ trafficSourceId: trafficSource.id });

    await Promise.all([
      this.trafficSourceRepository.createTrafficSource(trafficSource),
      this.webhookRepository.createWebhook(webhook),
    ]);

    return trafficSource.toJson();
  }
}

export { CreateTrafficSourceUseCase };
