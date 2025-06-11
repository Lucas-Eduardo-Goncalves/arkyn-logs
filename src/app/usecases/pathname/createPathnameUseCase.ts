import { HttpAdapter } from "../../../infra/adapters/httpAdapter";
import { Pathname } from "../../../domain/entities/pathname";
import { DomainRepository } from "../../../domain/repositories/domain";
import { PathnameRepository } from "../../../domain/repositories/pathname";
import { TrafficSourceRepository } from "../../../domain/repositories/trafficSource";

type InputProps = {
  trafficSourceId: string;
  domainId: string;
  value: string;
};

class CreatePathnameUseCase {
  constructor(
    private pathnameRepository: PathnameRepository,
    private domainRepository: DomainRepository,
    private trafficSourceRepository: TrafficSourceRepository
  ) {}

  async execute(input: InputProps) {
    const { trafficSourceId, domainId, value } = input;

    const [existsTrafficSource, existsDomain, existsPathname] =
      await Promise.all([
        await this.trafficSourceRepository.findById(trafficSourceId),
        await this.domainRepository.findById(domainId),
        await this.pathnameRepository.findByValue(value),
      ]);

    if (!existsTrafficSource) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.notFound("Traffic source not found");
    }

    if (!existsDomain) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.notFound("Domain not found");
    }

    if (existsPathname) return existsPathname.toJson();

    const pathname = Pathname.create({ trafficSourceId, domainId, value });
    await this.pathnameRepository.createPathname(pathname);

    return pathname.toJson();
  }
}

export { CreatePathnameUseCase };
