import { HttpAdapter } from "../../../infra/adapters/httpAdapter";
import { DomainMapper } from "../../../infra/mappers/domain";
import { Domain } from "../../entities/domain";
import { DomainRepositoryDTO } from "./repositoryDTO";

class DomainRepository implements DomainRepositoryDTO {
  static domains: Domain[] = [];

  async findAll(trafficSourceId: string): Promise<Domain[]> {
    return DomainRepository.domains
      .filter((domain) => domain.trafficSourceId === trafficSourceId)
      .map((domain) => DomainMapper.toEntity(domain));
  }

  async findById(domainId: string): Promise<Domain | null> {
    const domain = DomainRepository.domains.find(
      (domain) => domain.id === domainId
    );
    if (!domain) return null;
    return DomainMapper.toEntity(domain);
  }

  async findByValue(value: string): Promise<Domain | null> {
    const domain = DomainRepository.domains.find(
      (domain) => domain.value === value
    );

    if (!domain) return null;
    return DomainMapper.toEntity(domain);
  }

  async createDomain(domain: Domain): Promise<Domain> {
    DomainRepository.domains.push(domain);
    return domain;
  }

  async updateDomain(domain: Domain): Promise<Domain> {
    const index = DomainRepository.domains.findIndex((u) => u.id === domain.id);
    const httpAdpter = new HttpAdapter();
    if (index === -1) httpAdpter.serverError("Domain not found");
    DomainRepository.domains[index] = domain;
    return domain;
  }

  async deleteDomain(domainId: string): Promise<void> {
    const index = DomainRepository.domains.findIndex(
      (domain) => domain.id === domainId
    );
    const httpAdpter = new HttpAdapter();
    if (index === -1) httpAdpter.serverError("Domain not found");
    DomainRepository.domains.splice(index, 1);
  }
}

export { DomainRepository };
