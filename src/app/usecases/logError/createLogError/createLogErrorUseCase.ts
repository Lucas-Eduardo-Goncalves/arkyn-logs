import { HttpAdapter } from "../../../../infra/adapters/httpAdapter";
import { LogError } from "../../../entities/logError";
import { LogChannelRepository } from "../../../repositories/logChannel";
import { LogErrorRepository } from "../../../repositories/logError";
import { HashService } from "../../../services/hashService";

class CreateLogErrorUseCase {
  constructor(
    private logErrorRepository: LogErrorRepository,
    private logChannelRepository: LogChannelRepository
  ) {}

  async execute(logChannelId: string, message: string, metadata: any) {
    const logChannel = await this.logChannelRepository.findById(logChannelId);

    if (!logChannel) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.notFound("Log channel not found");
    }

    const hash = HashService.hashLog(logChannel.id, message, metadata);
    const existingLogError = await this.logErrorRepository.findByHash(hash);

    if (existingLogError) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.conflict("Log error already exists");
    }

    const logError = LogError.create({
      hash,
      logChannelId,
      message,
      metadata,
    });

    await this.logErrorRepository.createLogError(logError);
    return logError.toJson();
  }
}

export { CreateLogErrorUseCase };
