import { CorePathnameSearchParams } from "../../../app/search/corePathnameSearchParams";
import { SearchResult } from "../../../app/shared/searchResult";
import { CorePathname } from "../../../domain/entities/corePathname";
import { CorePathnameRepository } from "../../../domain/repositories/corePathname";
import { databaseConnection } from "../../adapters/dbAdapter";
import { CorePathnameMapper } from "../mappers/corePathname";

class PrismaCorePathnameRepository implements CorePathnameRepository {
  async findAll(
    searchParams: CorePathnameSearchParams
  ): Promise<SearchResult<CorePathname>> {
    const [corePathnames, count] = await Promise.all([
      databaseConnection.corePathname.findMany(searchParams.toPrisma()),
      databaseConnection.corePathname.count({
        where: searchParams.toPrisma().where,
      }),
    ]);

    return new SearchResult({
      data: corePathnames.map(CorePathnameMapper.toEntity),
      meta: {
        page: searchParams.page,
        pageLimit: searchParams.pageLimit,
        totalItems: count,
      },
    });
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
