import { databaseConnection } from "../../../infra/adapters/dbAdapter";
import { HttpTrafficRecordMapper } from "../../../infra/mappers/httpTrafficRecord";
import { HttpTrafficRecord } from "../../views/httpTrafficRecord";
import { HttpTrafficRecordDAL } from "./dal";

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
