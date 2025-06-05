import { HttpAdapter } from "../../../infra/adapters/httpAdapter";
import { Domain } from "../../entities/domain";
import { DomainRepository } from "../../repositories/domain/repository";
import { TrafficSourceRepository } from "../../repositories/trafficSource/repository";

type InputProps = {
  trafficSourceId: string;
  value: string;
  protocol: "HTTP" | "HTTPS";
};

class CreateDomainUseCase {
  constructor(
    private domainRepository: DomainRepository,
    private trafficSourceRepository: TrafficSourceRepository
  ) {}

  async execute(input: InputProps) {
    const { trafficSourceId, value, protocol } = input;

    const [existsTrafficSource, existsDomain] = await Promise.all([
      await this.trafficSourceRepository.findById(trafficSourceId),
      await this.domainRepository.findByValue(value),
    ]);

    if (!existsTrafficSource) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.notFound("Traffic source not found");
    }

    if (existsDomain) return existsDomain.toJson();

    const normalizedValue = value.endsWith("/") ? value.slice(0, -1) : value;

    const domain = Domain.create({
      trafficSourceId,
      value: normalizedValue,
      protocol,
    });

    await this.domainRepository.createDomain(domain);

    return domain.toJson();
  }
}

export { CreateDomainUseCase };
