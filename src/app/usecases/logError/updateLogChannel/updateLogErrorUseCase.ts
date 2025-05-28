import { HttpAdapter } from "../../../../infra/adapters/httpAdapter";
import { SchemaValidatorAdapter } from "../../../../infra/adapters/schemaValidatorAdapter";
import { updateLogErrorSchema } from "../../../../infra/schemas/internal/logError";
import { LogErrorRepository } from "../../../repositories/logError";

class UpdateLogErrorUseCase {
  constructor(private logErrorRepository: LogErrorRepository) {}

  async execute(logErrorId: string) {
    const schemaValidator = new SchemaValidatorAdapter(updateLogErrorSchema);

    const logError = await this.logErrorRepository.findById(logErrorId);

    if (!logError) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.notFound("Log channel not found");
    }

    logError.update();
    await this.logErrorRepository.updateLogError(logError);

    return logError.toJson();
  }
}

export { UpdateLogErrorUseCase };
