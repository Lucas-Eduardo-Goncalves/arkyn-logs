import { HttpAdapter } from "../../../infra/adapters/httpAdapter";
import { Domain } from "../../../domain/entities/domain";
import { DomainRepository } from "../../../domain/repositories/domain";
import { TrafficSourceRepository } from "../../../domain/repositories/trafficSource";

type InputProps = {
  trafficSourceId: string;
  value: string;
  protocol: "http" | "https";
};

class CreateDomainUseCase {
  constructor(
    private domainRepository: DomainRepository,
    private trafficSourceRepository: TrafficSourceRepository
  ) {}

  normalizeValue(value: string): string {
    return value.endsWith("/") ? value.slice(0, -1) : value;
  }

  async execute(input: InputProps, userId: string) {
    const { trafficSourceId, value, protocol } = input;

    const [trafficSource, domain] = await Promise.all([
      await this.trafficSourceRepository.findById(trafficSourceId),
      await this.domainRepository.findByValue(value),
    ]);

    if (!trafficSource) {
      throw HttpAdapter.notFound("Traffic source not found");
    }

    if (trafficSource.userId !== userId) {
      throw HttpAdapter.forbidden("You do not own this traffic source.");
    }

    if (domain) return domain.toJson();

    const newDomain = Domain.create({
      trafficSourceId,
      value: this.normalizeValue(value),
      protocol,
    });

    await this.domainRepository.createDomain(newDomain);

    return newDomain.toJson();
  }
}

export { CreateDomainUseCase };
