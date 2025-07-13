import { HttpAdapter } from "../../../infra/adapters/httpAdapter";
import { HttpTrafficRepository } from "../../../domain/repositories/httpTraffic";
import { TrafficSourceRepository } from "../../../domain/repositories/trafficSource";

class DeleteHttpTrafficUseCase {
  constructor(
    private httpTrafficRepository: HttpTrafficRepository,
    private trafficSourceRepository: TrafficSourceRepository
  ) {}

  async execute(httpTrafficId: string, userId: string) {
    const httpTraffic = await this.httpTrafficRepository.findById(
      httpTrafficId
    );

    if (!httpTraffic) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.notFound("Http traffic not found");
    }

    const trafficSource = await this.trafficSourceRepository.findById(
      httpTraffic.trafficSourceId
    );

    if (!trafficSource) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.notFound("Traffic source not found");
    }

    if (trafficSource.userId !== userId) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.forbidden("You do not own this traffic source.");
    }

    await this.httpTrafficRepository.deleteHttpTraffic(httpTraffic.id);
  }
}

export { DeleteHttpTrafficUseCase };
