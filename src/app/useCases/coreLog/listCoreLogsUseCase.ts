import { CoreLogRepository } from "../../../domain/repositories/coreLog";
import { TrafficSourceRepository } from "../../../domain/repositories/trafficSource";
import { HttpAdapter } from "../../../infra/adapters/httpAdapter";
import { CoreLogSearchParams } from "../../search/coreLogSearchParams";

type InputProps = {
  page?: number;
  pageLimit?: number;
  sort?: string | null;
  sortDirection?: "asc" | "desc";

  filter: {
    trafficSourceId: string;
  };
};

class ListCoreLogsUseCase {
  constructor(
    private coreLogRepository: CoreLogRepository,
    private trafficSourceRepository: TrafficSourceRepository
  ) {}

  async execute(input: InputProps, userId: string) {
    const searchParams = new CoreLogSearchParams(input);

    const trafficSource = await this.trafficSourceRepository.findById(
      input.filter.trafficSourceId
    );

    if (!trafficSource) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.notFound("Traffic source not found");
    }

    if (trafficSource.userId !== userId) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.forbidden("You do not own this traffic source.");
    }

    const coreLogs = await this.coreLogRepository.findAll(searchParams);
    return coreLogs.toJson();
  }
}

export { ListCoreLogsUseCase };
