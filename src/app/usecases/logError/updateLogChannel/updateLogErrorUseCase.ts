import { HttpAdapter } from "../../../../infra/adapters/httpAdapter";
import { LogErrorRepository } from "../../../repositories/logError";

class UpdateLogErrorUseCase {
  constructor(private logErrorRepository: LogErrorRepository) {}

  async execute(logErrorId: string) {
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
