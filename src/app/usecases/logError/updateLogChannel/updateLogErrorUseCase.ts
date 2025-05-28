import { HttpAdapter } from "../../../../infra/adapters/httpAdapter";
import { SchemaValidatorAdapter } from "../../../../infra/adapters/schemaValidatorAdapter";
import { updateLogErrorSchema } from "../../../../infra/schemas/internal/logError";
import { LogErrorRepository } from "../../../repositories/logError";

class UpdateLogErrorUseCase {
  constructor(private logErrorRepository: LogErrorRepository) {}

  async execute(body: any) {
    const schemaValidator = new SchemaValidatorAdapter(updateLogErrorSchema);
    const { id } = schemaValidator.validate(body);

    const logError = await this.logErrorRepository.findById(id);

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
