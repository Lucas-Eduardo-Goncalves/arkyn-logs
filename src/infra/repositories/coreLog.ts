import { CoreLogSearchParams } from "../../app/search/coreLogSearchParams";
import { SearchResult } from "../../app/shared/searchResult";
import { CoreLog } from "../../domain/entities/coreLog";
import { CoreLogRepository } from "../../domain/repositories/coreLog";
import { databaseConnection } from "../adapters/dbAdapter";
import { CoreLogMapper } from "../mappers/coreLog";

class PrismaCoreLogRepository implements CoreLogRepository {
  async findAll(
    searchParams: CoreLogSearchParams
  ): Promise<SearchResult<CoreLog>> {
    const [coreLogs, count] = await Promise.all([
      databaseConnection.coreLog.findMany(searchParams.toPrisma()),
      databaseConnection.coreLog.count({
        where: searchParams.toPrisma().where,
      }),
    ]);

    return new SearchResult({
      data: coreLogs.map(CoreLogMapper.toEntity),
      meta: {
        page: searchParams.page,
        pageLimit: searchParams.pageLimit,
        totalItems: count,
      },
    });
  }

  async findById(coreLogId: string): Promise<CoreLog | null> {
    const coreLog = await databaseConnection.coreLog.findUnique({
      where: { id: coreLogId },
    });

    if (!coreLog) return null;
    return CoreLogMapper.toEntity(coreLog);
  }

  async createCoreLog(coreLog: CoreLog): Promise<CoreLog> {
    await databaseConnection.coreLog.create({ data: coreLog });
    return coreLog;
  }
}

export { PrismaCoreLogRepository };
