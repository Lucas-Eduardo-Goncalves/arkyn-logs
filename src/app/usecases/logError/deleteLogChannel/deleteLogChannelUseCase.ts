import { HttpAdapter } from "../../../../infra/adapters/httpAdapter";
import { SchemaValidatorAdapter } from "../../../../infra/adapters/schemaValidatorAdapter";
import { deleteLogErrorSchema } from "../../../../infra/schemas/internal/logError";
import { LogErrorRepository } from "../../../repositories/logError";

class DeleteLogErrorUseCase {
  constructor(private logErrorRepository: LogErrorRepository) {}

  async execute(body: any) {
    const schemaValidator = new SchemaValidatorAdapter(deleteLogErrorSchema);
    const validatedBody = schemaValidator.validate(body);

    const logError = await this.logErrorRepository.findById(validatedBody.id);

    if (!logError) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.notFound("Log channel not found");
    }

    await this.logErrorRepository.deleteLogError(logError.id);
  }
}

export { DeleteLogErrorUseCase };
