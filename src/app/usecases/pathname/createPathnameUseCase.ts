import { HttpAdapter } from "../../../infra/adapters/httpAdapter";
import { Pathname } from "../../entities/pathname";
import { DomainRepository } from "../../repositories/domain/repository";
import { PathnameRepository } from "../../repositories/pathname/repository";
import { TrafficSourceRepository } from "../../repositories/trafficSource/repository";

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
