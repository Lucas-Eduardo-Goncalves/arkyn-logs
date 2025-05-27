import { LogError } from "../../entities/logError";

type LogErrorRepositoryDTO = {
  findAll: () => Promise<LogError[]>;
  findById: (logErrorId: string) => Promise<LogError | null>;
  createLogError: (LogError: LogError) => Promise<LogError>;
  updateLogError: (LogError: LogError) => Promise<LogError>;
  deleteLogError: (logErrorId: string) => Promise<void>;
};

export type { LogErrorRepositoryDTO };
