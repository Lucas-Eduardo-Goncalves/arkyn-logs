import { CoreLogRepository } from "../../../domain/repositories/coreLog";

class ListCoreLogsUseCase {
  constructor(private coreLogRepository: CoreLogRepository) {}

  async execute(trafficSourceId: string) {
    const coreLogs = await this.coreLogRepository.findAll(trafficSourceId);
    return coreLogs.map((user) => user.toJson());
  }
}

export { ListCoreLogsUseCase };
