import { HttpAdapter } from "../../../../infra/adapters/httpAdapter";
import { HttpTrafficRepository } from "../../../repositories/httpTraffic";

class ListSummaryHttpTrafficsUseCase {
  constructor(private httpTrafficRepository: HttpTrafficRepository) {}

  async execute(trafficSourceId?: string) {
    if (!trafficSourceId) {
      const httpAdapter = new HttpAdapter();
      const message = "Traffic source ID is required to list httpTraffics.";
      throw httpAdapter.notFound(message);
    }

    const httpTraffics = await this.httpTrafficRepository.findAllAsAggregate(
      trafficSourceId
    );

    return httpTraffics.map((httpTrafficAggregate) =>
      httpTrafficAggregate.toJson()
    );
  }
}

export { ListSummaryHttpTrafficsUseCase };
