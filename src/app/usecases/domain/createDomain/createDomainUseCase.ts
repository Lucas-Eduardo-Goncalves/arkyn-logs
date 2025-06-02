import { HttpAdapter } from "../../../../infra/adapters/httpAdapter";
import { SchemaValidatorAdapter } from "../../../../infra/adapters/schemaValidatorAdapter";
import { createDomainSchema } from "../../../../infra/schemas/internal/domain";
import { Domain } from "../../../entities/domain";
import { DomainRepository } from "../../../repositories/domain";
import { TrafficSourceRepository } from "../../../repositories/trafficSource";

class CreateDomainUseCase {
  constructor(
    private domainRepository: DomainRepository,
    private trafficSourceRepository: TrafficSourceRepository
  ) {}

  async execute(body: any) {
    const schemaValidator = new SchemaValidatorAdapter(createDomainSchema);
    const { trafficSourceId, value } = schemaValidator.validate(body);

    const [existsTrafficSource, existsDomain] = await Promise.all([
      await this.trafficSourceRepository.findById(trafficSourceId),
      await this.domainRepository.findByValue(value),
    ]);

    if (!existsTrafficSource) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.notFound("Traffic source not found");
    }

    if (existsDomain) return existsDomain.toJson();

    const domain = Domain.create({ trafficSourceId, value });
    await this.domainRepository.createDomain(domain);

    return domain.toJson();
  }
}

export { CreateDomainUseCase };
