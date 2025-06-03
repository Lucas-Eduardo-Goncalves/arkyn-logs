import { databaseConnection } from "../../../infra/adapters/dbAdapter";
import { DomainMapper } from "../../../infra/mappers/domain";
import { Domain } from "../../entities/domain";
import { DomainRepository } from "./repository";

class PrismaDomainRepository implements DomainRepository {
  async findAll(trafficSourceId: string): Promise<Domain[]> {
    const domains = await databaseConnection.domain.findMany({
      where: { trafficSourceId },
    });

    return domains.map(DomainMapper.toEntity);
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

  async deleteDomain(domainId: string): Promise<void> {
    await databaseConnection.domain.delete({
      where: { id: domainId },
    });
  }
}

export { PrismaDomainRepository };
