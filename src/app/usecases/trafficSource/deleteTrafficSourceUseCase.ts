import { HttpAdapter } from "../../../infra/adapters/httpAdapter";
import { TrafficSourceRepository } from "../../../domain/repositories/trafficSource";

class DeleteTrafficSourceUseCase {
  constructor(private trafficSourceRepository: TrafficSourceRepository) {}

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

    await this.trafficSourceRepository.deleteTrafficSource(trafficSource.id);
  }
}

export { DeleteTrafficSourceUseCase };
