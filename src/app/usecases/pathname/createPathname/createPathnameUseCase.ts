import { HttpAdapter } from "../../../../infra/adapters/httpAdapter";
import { SchemaValidatorAdapter } from "../../../../infra/adapters/schemaValidatorAdapter";
import { createPathnameSchema } from "../../../../infra/schemas/internal/pathname";
import { Pathname } from "../../../entities/pathname";
import { DomainRepository } from "../../../repositories/domain";
import { PathnameRepository } from "../../../repositories/pathname";
import { TrafficSourceRepository } from "../../../repositories/trafficSource";

class CreatePathnameUseCase {
  constructor(
    private pathnameRepository: PathnameRepository,
    private domainRepository: DomainRepository,
    private trafficSourceRepository: TrafficSourceRepository
  ) {}

  async execute(body: any) {
    const schemaValidator = new SchemaValidatorAdapter(createPathnameSchema);
    const { trafficSourceId, value, domainId } = schemaValidator.validate(body);

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
