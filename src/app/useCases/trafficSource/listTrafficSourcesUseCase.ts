import { TrafficSourceRepository } from "../../../domain/repositories/trafficSource";
import { TrafficSourceSearchParams } from "../../search/trafficSourceSearchParams";

type InputProps = {
  page?: number;
  pageLimit?: number;
  sort?: string | null;
  sortDirection?: "asc" | "desc";

  filter: {
    userId: string;
  };
};

class ListTrafficSourcesUseCase {
  constructor(private trafficSourceRepository: TrafficSourceRepository) {}

  async execute(input: InputProps) {
    const searchParams = new TrafficSourceSearchParams(input);
    const trafficSources = await this.trafficSourceRepository.findAll(
      searchParams
    );
    return trafficSources.toJson();
  }
}

export { ListTrafficSourcesUseCase };
