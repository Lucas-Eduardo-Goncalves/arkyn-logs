import { Domain } from "../../../domain/entities/domain";

type DomainMapperDTO = {
  id: string;
  value: string;
  protocol: "HTTP" | "HTTPS";
  trafficSourceId: string;
  createdAt: Date;
};

class DomainMapper {
  static toEntity(domain: DomainMapperDTO): Domain {
    return Domain.restore({
      id: domain.id,
      value: domain.value,
      protocol: domain.protocol,
      trafficSourceId: domain.trafficSourceId,
      createdAt: domain.createdAt,
    });
  }
}
export { DomainMapper };
