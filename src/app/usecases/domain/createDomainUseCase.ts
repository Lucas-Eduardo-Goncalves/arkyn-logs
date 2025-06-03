import { HttpAdapter } from "../../../infra/adapters/httpAdapter";
import { Domain } from "../../entities/domain";
import { DomainRepository } from "../../repositories/domain/repository";
import { TrafficSourceRepository } from "../../repositories/trafficSource";

type InputProps = {
  trafficSourceId: string;
  value: string;
};

class CreateDomainUseCase {
  constructor(
    private domainRepository: DomainRepository,
    private trafficSourceRepository: TrafficSourceRepository
  ) {}

  async execute(input: InputProps) {
    const { trafficSourceId, value } = input;

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
