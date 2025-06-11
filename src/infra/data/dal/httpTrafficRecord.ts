import { HttpTrafficRecordDAL } from "../../../domain/dal/httpTrafficRecord";
import { HttpTrafficRecord } from "../../../domain/views/httpTrafficRecord";
import { databaseConnection } from "../../adapters/dbAdapter";
import { HttpTrafficRecordMapper } from "../mappers/httpTrafficRecord";

class PrismaHttpTrafficRecordDAL implements HttpTrafficRecordDAL {
  async findAll(trafficSourceId: string): Promise<HttpTrafficRecord[]> {
    const httpTraffics = await databaseConnection.httpTraffic.findMany({
      where: { trafficSourceId },
      include: { domain: true, request: true, response: true, pathname: true },
    });

    return httpTraffics.map(HttpTrafficRecordMapper.toEntity);
  }
}

export { PrismaHttpTrafficRecordDAL };
