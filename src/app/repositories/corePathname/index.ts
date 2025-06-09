import { databaseConnection } from "../../../infra/adapters/dbAdapter";
import { CorePathnameMapper } from "../../../infra/mappers/corePathname";
import { CorePathname } from "../../entities/corePathname";
import { CorePathnameRepository } from "./repository";

class PrismaCorePathnameRepository implements CorePathnameRepository {
  async findAll(trafficSourceId: string): Promise<CorePathname[]> {
    const corePathnames = await databaseConnection.corePathname.findMany({
      where: { trafficSourceId },
    });

    return corePathnames.map(CorePathnameMapper.toEntity);
  }

  async findById(corePathnameId: string): Promise<CorePathname | null> {
    const corePathname = await databaseConnection.corePathname.findUnique({
      where: { id: corePathnameId },
    });

    if (!corePathname) return null;
    return CorePathnameMapper.toEntity(corePathname);
  }

  async findByValue(value: string): Promise<CorePathname | null> {
    const corePathname = await databaseConnection.corePathname.findFirst({
      where: { value },
    });

    if (!corePathname) return null;
    return CorePathnameMapper.toEntity(corePathname);
  }

  async createCorePathname(corePathname: CorePathname): Promise<CorePathname> {
    await databaseConnection.corePathname.create({ data: corePathname });
    return corePathname;
  }

  async deleteCorePathname(corePathnameId: string): Promise<void> {
    await databaseConnection.corePathname.delete({
      where: { id: corePathnameId },
    });
  }
}

export { PrismaCorePathnameRepository };
