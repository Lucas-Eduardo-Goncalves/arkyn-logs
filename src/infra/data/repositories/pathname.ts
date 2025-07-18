import { PathnameSearchParams } from "../../../app/search/pathnameSearchParams";
import { SearchResult } from "../../../app/shared/searchResult";
import { Pathname } from "../../../domain/entities/pathname";
import { PathnameRepository } from "../../../domain/repositories/pathname";
import { cacheDb } from "../../adapters/cacheDbAdapter";
import { databaseConnection } from "../../adapters/dbAdapter";
import { PathnameMapper } from "../mappers/pathname";

class PrismaPathnameRepository implements PathnameRepository {
  async findAll(
    searchParams: PathnameSearchParams
  ): Promise<SearchResult<Pathname>> {
    const [pathnames, count] = await Promise.all([
      databaseConnection.pathname.findMany(searchParams.toPrisma()),
      databaseConnection.pathname.count({
        where: searchParams.toPrisma().where,
      }),
    ]);

    return new SearchResult({
      data: pathnames.map(PathnameMapper.toEntity),
      meta: {
        page: searchParams.page,
        pageLimit: searchParams.pageLimit,
        totalItems: count,
      },
    });
  }

  async findById(pathnameId: string): Promise<Pathname | null> {
    const cached = await cacheDb.getJson<any>(pathnameId);
    if (cached) return PathnameMapper.toEntity(cached);

    const pathname = await databaseConnection.pathname.findUnique({
      where: { id: pathnameId },
    });

    if (!pathname) return null;

    await cacheDb.setJson(pathnameId, pathname);
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
