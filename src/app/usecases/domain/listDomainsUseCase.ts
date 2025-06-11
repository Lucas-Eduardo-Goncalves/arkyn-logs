import { DomainRepository } from "../../../domain/repositories/domain";

class ListDomainsUseCase {
  constructor(private domainRepository: DomainRepository) {}

  async execute(trafficSourceId: string) {
    const domains = await this.domainRepository.findAll(trafficSourceId);
    return domains.map((user) => user.toJson());
  }
}

export { ListDomainsUseCase };
