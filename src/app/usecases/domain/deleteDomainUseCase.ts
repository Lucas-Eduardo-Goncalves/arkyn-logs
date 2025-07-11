import { HttpAdapter } from "../../../infra/adapters/httpAdapter";
import { DomainRepository } from "../../../domain/repositories/domain";
import { TrafficSourceRepository } from "../../../domain/repositories/trafficSource";

class DeleteDomainUseCase {
  constructor(
    private domainRepository: DomainRepository,
    private trafficSourceRepository: TrafficSourceRepository
  ) {}

  async execute(domainId: string, userId: string) {
    const domain = await this.domainRepository.findById(domainId);

    if (!domain) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.notFound("Domain not found");
    }

    const trafficSource = await this.trafficSourceRepository.findById(
      domain.trafficSourceId
    );

    if (!trafficSource) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.notFound("Traffic source not found");
    }

    if (trafficSource.userId !== userId) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.forbidden("You do not own this traffic source.");
    }

    await this.domainRepository.deleteDomain(domain.id);
  }
}

export { DeleteDomainUseCase };
