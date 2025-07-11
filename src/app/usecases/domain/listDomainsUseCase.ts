import { DomainRepository } from "../../../domain/repositories/domain";
import { TrafficSourceRepository } from "../../../domain/repositories/trafficSource";
import { HttpAdapter } from "../../../infra/adapters/httpAdapter";

class ListDomainsUseCase {
  constructor(
    private domainRepository: DomainRepository,
    private trafficSourceRepository: TrafficSourceRepository
  ) {}

  async execute(trafficSourceId: string, userId: string) {
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

    const domains = await this.domainRepository.findAll(trafficSourceId);
    return domains.map((user) => user.toJson());
  }
}

export { ListDomainsUseCase };
