import { HttpAdapter } from "../../../../infra/adapters/httpAdapter";
import { HttpTrafficRepository } from "../../../repositories/httpTraffic";

class ListHttpTrafficsUseCase {
  constructor(private httpTrafficRepository: HttpTrafficRepository) {}

  async execute(trafficSourceId?: string) {
    if (!trafficSourceId) {
      const httpAdapter = new HttpAdapter();
      const message = "Traffic source ID is required to list httpTraffics.";
      throw httpAdapter.notFound(message);
    }

    const httpTraffics = await this.httpTrafficRepository.findAll(
      trafficSourceId
    );

    return httpTraffics.map((user) => user.toJson());
  }
}

export { ListHttpTrafficsUseCase };
