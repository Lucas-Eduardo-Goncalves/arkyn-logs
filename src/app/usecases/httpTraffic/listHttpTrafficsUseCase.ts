import { HttpTrafficRepository } from "../../repositories/httpTraffic/repository";

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
