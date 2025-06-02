import { Domain } from "../../app/entities/domain";

type DomainMapperDTO = {
  id: string;
  value: string;
  trafficSourceId: string;
  createdAt: Date;
};

class DomainMapper {
  static toEntity(domain: DomainMapperDTO): Domain {
    return Domain.restore({
      id: domain.id,
      value: domain.value,
      trafficSourceId: domain.trafficSourceId,
      createdAt: domain.createdAt,
    });
  }
}
export { DomainMapper };
