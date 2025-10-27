import { CoreLog } from "../../../domain/entities/coreLog";
import { HttpMethod } from "../../../main/types/HttpMethod";

type CoreLogMapperDTO = {
  id: string;
  status: number;
  method: HttpMethod;
  level: "info" | "warning" | "fatal";
  elapsedTime: number;
  trafficUserId: string | null;
  trafficSourceId: string;
  corePathnameId: string;
  requestId: string;
  responseId: string;
  createdAt: Date;
};

class CoreLogMapper {
  static toEntity(coreLog: CoreLogMapperDTO): CoreLog {
    return CoreLog.restore({
      id: coreLog.id,
      status: coreLog.status,
      method: coreLog.method,
      level: coreLog.level,
      elapsedTime: coreLog.elapsedTime,
      trafficUserId: coreLog.trafficUserId,
      trafficSourceId: coreLog.trafficSourceId,
      corePathnameId: coreLog.corePathnameId,
      requestId: coreLog.requestId,
      responseId: coreLog.responseId,
      createdAt: new Date(coreLog.createdAt),
    });
  }
}
export { CoreLogMapper };
