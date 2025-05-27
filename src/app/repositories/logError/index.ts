import { HttpAdapter } from "../../../infra/adapters/httpAdapter";
import { LogErrorMapper } from "../../../infra/mappers/logError";
import { LogError } from "../../entities/logError";
import { LogErrorRepositoryDTO } from "./repositoryDTO";

class LogErrorRepository implements LogErrorRepositoryDTO {
  static logErrors: LogError[] = [];

  async findAll(logChannelId: string): Promise<LogError[]> {
    return LogErrorRepository.logErrors
      .filter((logError) => logError.logChannelId === logChannelId)
      .map((logError) => LogErrorMapper.toEntity(logError));
  }

  async findById(logErrorId: string): Promise<LogError | null> {
    const logError = LogErrorRepository.logErrors.find(
      (logError) => logError.id === logErrorId
    );
    if (!logError) return null;
    return LogErrorMapper.toEntity(logError);
  }

  async createLogError(logError: LogError): Promise<LogError> {
    LogErrorRepository.logErrors.push(logError);
    return logError;
  }

  async updateLogError(logError: LogError): Promise<LogError> {
    const index = LogErrorRepository.logErrors.findIndex(
      (u) => u.id === logError.id
    );
    const httpAdpter = new HttpAdapter();
    if (index === -1) httpAdpter.serverError("LogError not found");
    LogErrorRepository.logErrors[index] = logError;
    return logError;
  }

  async deleteLogError(logErrorId: string): Promise<void> {
    const index = LogErrorRepository.logErrors.findIndex(
      (logError) => logError.id === logErrorId
    );
    const httpAdpter = new HttpAdapter();
    if (index === -1) httpAdpter.serverError("LogError not found");
    LogErrorRepository.logErrors.splice(index, 1);
  }
}

export { LogErrorRepository };
