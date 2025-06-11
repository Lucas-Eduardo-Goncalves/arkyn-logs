import { HttpTrafficRecordDAL } from "../../../domain/dal/httpTrafficRecord";

class ListHttpTrafficRecordsUseCase {
  constructor(private httpTrafficRecordDAL: HttpTrafficRecordDAL) {}

  async execute(trafficSourceId: string) {
    const httpTraffics = await this.httpTrafficRecordDAL.findAll(
      trafficSourceId
    );

    return httpTraffics.map((httpTrafficRecord) => httpTrafficRecord.toJson());
  }
}

export { ListHttpTrafficRecordsUseCase };
