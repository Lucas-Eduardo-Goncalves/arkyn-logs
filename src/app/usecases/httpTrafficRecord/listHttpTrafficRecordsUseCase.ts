import { HttpAdapter } from "../../../../infra/adapters/httpAdapter";
import { HttpTrafficRecordRepository } from "../../../repositories/httpTrafficRecord";

class ListHttpTrafficRecordsUseCase {
  constructor(
    private httpTrafficRecordRepository: HttpTrafficRecordRepository
  ) {}

  async execute(trafficSourceId?: string) {
    if (!trafficSourceId) {
      const httpAdapter = new HttpAdapter();
      const message = "Traffic source ID is required to list httpTraffics.";
      throw httpAdapter.notFound(message);
    }

    const httpTraffics = await this.httpTrafficRecordRepository.findAll(
      trafficSourceId
    );

    return httpTraffics.map((httpTrafficRecord) => httpTrafficRecord.toJson());
  }
}

export { ListHttpTrafficRecordsUseCase };
