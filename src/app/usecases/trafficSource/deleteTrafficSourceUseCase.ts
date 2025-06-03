import { HttpAdapter } from "../../../infra/adapters/httpAdapter";
import { TrafficSourceRepository } from "../../repositories/trafficSource/repository";

class DeleteTrafficSourceUseCase {
  constructor(private trafficSourceRepository: TrafficSourceRepository) {}

  async execute(id: string) {
    const trafficSource = await this.trafficSourceRepository.findById(id);

    if (!trafficSource) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.notFound("Log channel not found");
    }

    await this.trafficSourceRepository.deleteTrafficSource(trafficSource.id);
  }
}

export { DeleteTrafficSourceUseCase };
