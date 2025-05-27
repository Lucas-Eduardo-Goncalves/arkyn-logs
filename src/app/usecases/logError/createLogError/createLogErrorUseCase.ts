import { HttpAdapter } from "../../../../infra/adapters/httpAdapter";
import { SchemaValidatorAdapter } from "../../../../infra/adapters/schemaValidatorAdapter";
import { createLogErrorSchema } from "../../../../infra/schemas/internal/logError";
import { LogError } from "../../../entities/logError";
import { LogChannelRepository } from "../../../repositories/logChannel";
import { LogErrorRepository } from "../../../repositories/logError";
import { HashService } from "../../../services/hashService";

class CreateLogErrorUseCase {
  constructor(
    private logErrorRepository: LogErrorRepository,
    private logChannelRepository: LogChannelRepository
  ) {}

  async execute(body: any) {
    const schemaValidator = new SchemaValidatorAdapter(createLogErrorSchema);
    const { logChannelId, message, metadata } = schemaValidator.validate(body);

    const logChannel = await this.logChannelRepository.findById(logChannelId);

    if (!logChannel) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.notFound("Log channel not found");
    }

    const jsonMetadata = JSON.stringify(metadata || {});
    const contentToHash = `${logChannelId}:${message}:${jsonMetadata}`;
    const hash = HashService.hashString(contentToHash);

    const existingLogError = await this.logErrorRepository.findByHash(hash);

    if (existingLogError) {
      existingLogError.update();
      this.logErrorRepository.updateLogError(existingLogError);
      return existingLogError.toJson();
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
