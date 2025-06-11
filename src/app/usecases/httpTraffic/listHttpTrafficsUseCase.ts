import { HttpTrafficRepository } from "../../../domain/repositories/httpTraffic";

class ListHttpTrafficsUseCase {
  constructor(private httpTrafficRepository: HttpTrafficRepository) {}

  async execute(trafficSourceId: string) {
    const httpTraffics = await this.httpTrafficRepository.findAll(
      trafficSourceId
    );

    return httpTraffics.map((user) => user.toJson());
  }
}

export { ListHttpTrafficsUseCase };
