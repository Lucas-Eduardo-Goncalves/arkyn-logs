import { Pathname } from "../../../domain/entities/pathname";

type PathnameMapperDTO = {
  id: string;
  value: string;
  trafficSourceId: string;
  domainId: string;
  createdAt: Date;
};

class PathnameMapper {
  static toEntity(pathname: PathnameMapperDTO): Pathname {
    return Pathname.restore({
      id: pathname.id,
      value: pathname.value,
      trafficSourceId: pathname.trafficSourceId,
      domainId: pathname.domainId,
      createdAt: pathname.createdAt,
    });
  }
}
export { PathnameMapper };
