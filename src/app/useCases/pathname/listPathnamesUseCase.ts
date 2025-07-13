import { DomainRepository } from "../../../domain/repositories/domain";
import { PathnameRepository } from "../../../domain/repositories/pathname";
import { TrafficSourceRepository } from "../../../domain/repositories/trafficSource";
import { HttpAdapter } from "../../../infra/adapters/httpAdapter";
import { PathnameSearchParams } from "../../search/pathnameSearchParams";

type InputProps = {
  page?: number;
  pageLimit?: number;
  sort?: string | null;
  sortDirection?: "asc" | "desc";

  filter: {
    trafficSourceId: string;
    domainId: string;
  };
};

class ListPathnamesUseCase {
  constructor(
    private pathnameRepository: PathnameRepository,
    private trafficSourceRepository: TrafficSourceRepository,
    private domainRepository: DomainRepository
  ) {}

  async execute(input: InputProps, userId: string) {
    const searchParams = new PathnameSearchParams(input);

    const [trafficSource, domain] = await Promise.all([
      this.trafficSourceRepository.findById(input.filter.trafficSourceId),
      this.domainRepository.findById(input.filter.domainId),
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

    const pathnames = await this.pathnameRepository.findAll(searchParams);
    return pathnames.toJson();
  }
}

export { ListPathnamesUseCase };
