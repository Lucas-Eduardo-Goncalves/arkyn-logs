import { CorePathname } from "../../domain/entities/corePathname";

type CorePathnameMapperDTO = {
  id: string;
  value: string;
  trafficSourceId: string;
  createdAt: Date;
};

class CorePathnameMapper {
  static toEntity(corePathname: CorePathnameMapperDTO): CorePathname {
    return CorePathname.restore({
      id: corePathname.id,
      value: corePathname.value,
      trafficSourceId: corePathname.trafficSourceId,
      createdAt: corePathname.createdAt,
    });
  }
}
export { CorePathnameMapper };
