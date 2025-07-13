import { HttpTrafficRepository } from "../../../domain/repositories/httpTraffic";
import { TrafficSourceRepository } from "../../../domain/repositories/trafficSource";
import { HttpAdapter } from "../../../infra/adapters/httpAdapter";

class ListHttpTrafficsUseCase {
  constructor(
    private httpTrafficRepository: HttpTrafficRepository,
    private trafficSourceRepository: TrafficSourceRepository
  ) {}

  async execute(trafficSourceId: string, userId: string) {
    const trafficSource = await this.trafficSourceRepository.findById(
      trafficSourceId
    );

    if (!trafficSource) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.notFound("Traffic source not found");
    }

    if (trafficSource.userId !== userId) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.forbidden("You do not own this traffic source.");
    }

    const httpTraffics = await this.httpTrafficRepository.findAll(
      trafficSourceId
    );

    return httpTraffics.map((user) => user.toJson());
  }
}

export { ListHttpTrafficsUseCase };
