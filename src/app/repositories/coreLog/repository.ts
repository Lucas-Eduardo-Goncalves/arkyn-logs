import { CoreLog } from "../../entities/coreLog";

type CoreLogRepository = {
  findAll: (trafficSourceId: string) => Promise<CoreLog[]>;
  findById: (coreLogId: string) => Promise<CoreLog | null>;
  createCoreLog: (coreLog: CoreLog) => Promise<CoreLog>;
};

export type { CoreLogRepository };
