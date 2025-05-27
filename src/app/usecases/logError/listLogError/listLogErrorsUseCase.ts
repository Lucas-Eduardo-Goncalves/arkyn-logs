import { HttpAdapter } from "../../../../infra/adapters/httpAdapter";
import { LogChannelRepository } from "../../../repositories/logChannel";
import { LogErrorRepository } from "../../../repositories/logError";

class ListLogErrorsUseCase {
  constructor(
    private logErrorRepository: LogErrorRepository,
    private logChannelRepository: LogChannelRepository
  ) {}

  async execute(logChannelId: string) {
    const existsLogChannel = await this.logChannelRepository.findById(
      logChannelId
    );

    if (!existsLogChannel) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.notFound("Log channel not found");
    }

    const logErrors = await this.logErrorRepository.findAll(logChannelId);
    return logErrors.map((user) => user.toJson());
  }
}

export { ListLogErrorsUseCase };
