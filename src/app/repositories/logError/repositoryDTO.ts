import { LogError } from "../../entities/logError";

type LogErrorRepositoryDTO = {
  findAll: (logChannelId: string) => Promise<LogError[]>;
  findById: (logErrorId: string) => Promise<LogError | null>;
  findByHash: (hash: string) => Promise<LogError | null>;
  createLogError: (logError: LogError) => Promise<LogError>;
  updateLogError: (logError: LogError) => Promise<LogError>;
  deleteLogError: (logErrorId: string) => Promise<void>;
};

export type { LogErrorRepositoryDTO };
