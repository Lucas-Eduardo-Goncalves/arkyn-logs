import { LogError } from "../../app/entities/logError";

type LogErrorMapperDTO = {
  id: string;
  hash: string;
  message: string;
  metadata: string;
  firstSeenAt: Date;
  lastSeenAt: Date;
  logChannelId: string;
  createdAt: Date;
  updatedAt: Date;
};

class LogErrorMapper {
  static toEntity(logError: LogErrorMapperDTO): LogError {
    return LogError.restore({
      id: logError.id,
      hash: logError.hash,
      message: logError.message,
      metadata: logError.metadata,
      firstSeenAt: logError.firstSeenAt,
      lastSeenAt: logError.lastSeenAt,
      logChannelId: logError.logChannelId,
      createdAt: logError.createdAt,
      updatedAt: logError.updatedAt,
    });
  }
}
export { LogErrorMapper };
