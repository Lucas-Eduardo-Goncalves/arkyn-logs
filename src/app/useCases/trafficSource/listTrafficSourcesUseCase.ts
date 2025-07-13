import { TrafficSourceRepository } from "../../../domain/repositories/trafficSource";

class ListTrafficSourcesUseCase {
  constructor(private trafficSourceRepository: TrafficSourceRepository) {}

  async execute(userId: string) {
    const trafficSources = await this.trafficSourceRepository.findAll(userId);
    return trafficSources.map((user) => user.toJson());
  }
}

export { ListTrafficSourcesUseCase };
