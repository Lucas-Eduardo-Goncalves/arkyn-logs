import { databaseConnection } from "../../../infra/adapters/dbAdapter";
import { PathnameMapper } from "../../../infra/mappers/pathname";
import { Pathname } from "../../entities/pathname";
import { PathnameRepository } from "./repository";

class PrismaPathnameRepository implements PathnameRepository {
  async findAll(
    trafficSourceId: string,
    domainId: string
  ): Promise<Pathname[]> {
    const pathnames = await databaseConnection.pathname.findMany({
      where: { domainId, trafficSourceId },
    });

    return pathnames.map(PathnameMapper.toEntity);
  }

  async findById(pathnameId: string): Promise<Pathname | null> {
    const pathname = await databaseConnection.pathname.findUnique({
      where: { id: pathnameId },
    });

    if (!pathname) return null;
    return PathnameMapper.toEntity(pathname);
  }

  async findByValue(value: string): Promise<Pathname | null> {
    const pathname = await databaseConnection.pathname.findFirst({
      where: { value },
    });

    if (!pathname) return null;
    return PathnameMapper.toEntity(pathname);
  }

  async createPathname(pathname: Pathname): Promise<Pathname> {
    await databaseConnection.pathname.create({ data: pathname });
    return pathname;
  }

  async deletePathname(pathnameId: string): Promise<void> {
    await databaseConnection.pathname.delete({
      where: { id: pathnameId },
    });
  }
}

export { PrismaPathnameRepository };
