import { HttpTrafficRepository } from "../../../domain/repositories/httpTraffic";
import { TrafficSourceRepository } from "../../../domain/repositories/trafficSource";
import { HttpAdapter } from "../../../infra/adapters/httpAdapter";
import { HttpTrafficSearchParams } from "../../search/httpTrafficSearchParams";

type InputProps = {
  page?: number;
  pageLimit?: number;
  sort?: string | null;
  sortDirection?: "asc" | "desc";

  filter: {
    trafficSourceId: string;
  };
};

class ListHttpTrafficsUseCase {
  constructor(
    private httpTrafficRepository: HttpTrafficRepository,
    private trafficSourceRepository: TrafficSourceRepository
  ) {}

  async execute(input: InputProps, userId: string) {
    const searchParams = new HttpTrafficSearchParams(input);

    const trafficSource = await this.trafficSourceRepository.findById(
      input.filter.trafficSourceId
    );

    if (!trafficSource) {
      throw HttpAdapter.notFound("Traffic source not found");
    }

    if (trafficSource.userId !== userId) {
      throw HttpAdapter.forbidden("You do not own this traffic source.");
    }

    const httpTraffics = await this.httpTrafficRepository.findAll(searchParams);
    return httpTraffics.toJson();
  }
}

export { ListHttpTrafficsUseCase };
