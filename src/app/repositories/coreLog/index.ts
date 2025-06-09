import { databaseConnection } from "../../../infra/adapters/dbAdapter";
import { CoreLogMapper } from "../../../infra/mappers/coreLog";
import { CoreLog } from "../../entities/coreLog";
import { CoreLogRepository } from "./repository";

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
