import { HttpAdapter } from "../../../../infra/adapters/httpAdapter";
import { SchemaValidatorAdapter } from "../../../../infra/adapters/schemaValidatorAdapter";
import { createHttpTrafficSchema } from "../../../../infra/schemas/internal/httpTraffic";
import { HttpTraffic } from "../../../entities/httpTraffic";
import { DomainRepository } from "../../../repositories/domain";
import { HttpTrafficRepository } from "../../../repositories/httpTraffic";
import { PathnameRepository } from "../../../repositories/pathname";
import { TrafficSourceRepository } from "../../../repositories/trafficSource";

class CreateHttpTrafficUseCase {
  constructor(
    private httpTrafficRepository: HttpTrafficRepository,
    private trafficSourceRepository: TrafficSourceRepository,
    private domainRepository: DomainRepository,
    private pathnameRepository: PathnameRepository
  ) {}

  async execute(body: any) {
    const schemaValidator = new SchemaValidatorAdapter(createHttpTrafficSchema);
    const {
      domainId,
      method,
      pathnameId,
      status,
      trafficSourceId,
      trafficUserId,
    } = schemaValidator.validate(body);

    const [existsTrafficSource, existsDomain, existsPathname] =
      await Promise.all([
        this.trafficSourceRepository.findById(trafficSourceId),
        this.domainRepository.findById(domainId),
        this.pathnameRepository.findById(pathnameId),
      ]);

    if (!existsTrafficSource) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.notFound("Traffic source not found");
    }

    if (!existsDomain) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.notFound("Domain not found");
    }

    if (!existsPathname) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.notFound("Pathname not found");
    }

    const httpTraffic = HttpTraffic.create({
      trafficSourceId,
      domainId,
      method,
      pathnameId,
      status,
      trafficUserId,
    });

    await this.httpTrafficRepository.createHttpTraffic(httpTraffic);

    return httpTraffic.toJson();
  }
}

export { CreateHttpTrafficUseCase };
