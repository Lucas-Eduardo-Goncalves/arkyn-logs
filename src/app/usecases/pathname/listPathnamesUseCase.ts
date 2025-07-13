import { DomainRepository } from "../../../domain/repositories/domain";
import { PathnameRepository } from "../../../domain/repositories/pathname";
import { TrafficSourceRepository } from "../../../domain/repositories/trafficSource";
import { HttpAdapter } from "../../../infra/adapters/httpAdapter";

class ListPathnamesUseCase {
  constructor(
    private pathnameRepository: PathnameRepository,
    private trafficSourceRepository: TrafficSourceRepository,
    private domainRepository: DomainRepository
  ) {}

  async execute(trafficSourceId: string, domainId: string, userId: string) {
    const [trafficSource, domain] = await Promise.all([
      this.trafficSourceRepository.findById(trafficSourceId),
      this.domainRepository.findById(domainId),
    ]);

    if (!trafficSource) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.notFound("Traffic source not found");
    }

    if (trafficSource.userId !== userId) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.forbidden("You do not own this traffic source.");
    }

    if (!domain) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.notFound("Domain not found");
    }

    const pathnames = await this.pathnameRepository.findAll(
      trafficSourceId,
      domainId
    );

    return pathnames.map((user) => user.toJson());
  }
}

export { ListPathnamesUseCase };
