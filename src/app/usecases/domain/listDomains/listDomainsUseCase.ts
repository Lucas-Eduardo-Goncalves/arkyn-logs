import { HttpAdapter } from "../../../../infra/adapters/httpAdapter";
import { DomainRepository } from "../../../repositories/domain";

class ListDomainsUseCase {
  constructor(private domainRepository: DomainRepository) {}

  async execute(trafficSourceId?: string) {
    if (!trafficSourceId) {
      const httpAdapter = new HttpAdapter();
      const message = "Traffic source ID is required to list domains.";
      throw httpAdapter.notFound(message);
    }

    const domains = await this.domainRepository.findAll(trafficSourceId);
    return domains.map((user) => user.toJson());
  }
}

export { ListDomainsUseCase };
