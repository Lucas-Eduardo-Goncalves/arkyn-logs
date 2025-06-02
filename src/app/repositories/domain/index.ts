import { databaseConnection } from "../../../infra/adapters/dbAdapter";
import { DomainMapper } from "../../../infra/mappers/domain";
import { Domain } from "../../entities/domain";
import { DomainRepositoryDTO } from "./repositoryDTO";

class DomainRepository implements DomainRepositoryDTO {
  async findAll(trafficSourceId: string): Promise<Domain[]> {
    const domains = await databaseConnection.domain.findMany({
      where: { trafficSourceId },
    });
    return domains.map((domain) => DomainMapper.toEntity(domain));
  }

  async findById(domainId: string): Promise<Domain | null> {
    const domain = await databaseConnection.domain.findUnique({
      where: { id: domainId },
    });
    if (!domain) return null;
    return DomainMapper.toEntity(domain);
  }

  async findByValue(value: string): Promise<Domain | null> {
    const domain = await databaseConnection.domain.findFirst({
      where: { value },
    });

    if (!domain) return null;
    return DomainMapper.toEntity(domain);
  }

  async createDomain(domain: Domain): Promise<Domain> {
    await databaseConnection.domain.create({ data: domain });
    return domain;
  }

  async updateDomain(domain: Domain): Promise<Domain> {
    await databaseConnection.domain.update({
      where: { id: domain.id },
      data: domain,
    });

    return domain;
  }

  async deleteDomain(domainId: string): Promise<void> {
    await databaseConnection.domain.delete({
      where: { id: domainId },
    });
  }
}

export { DomainRepository };
