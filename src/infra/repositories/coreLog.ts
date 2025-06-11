import { CoreLog } from "../../domain/entities/coreLog";
import { CoreLogRepository } from "../../domain/repositories/coreLog";
import { databaseConnection } from "../adapters/dbAdapter";
import { CoreLogMapper } from "../mappers/coreLog";

class PrismaCoreLogRepository implements CoreLogRepository {
  async findAll(trafficSourceId: string): Promise<CoreLog[]> {
    const coreLogs = await databaseConnection.coreLog.findMany({
      where: { trafficSourceId },
    });

    return coreLogs.map(CoreLogMapper.toEntity);
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
