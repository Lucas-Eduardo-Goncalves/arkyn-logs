import { HttpTraffic } from "../../domain/entities/httpTraffic";
import { HttpTrafficRepository } from "../../domain/repositories/httpTraffic";
import { databaseConnection } from "../adapters/dbAdapter";
import { HttpTrafficMapper } from "../mappers/httpTraffic";

class PrismaHttpTrafficRepository implements HttpTrafficRepository {
  async findAll(trafficSourceId: string): Promise<HttpTraffic[]> {
    const httpTraffics = await databaseConnection.httpTraffic.findMany({
      where: { trafficSourceId },
    });

    return httpTraffics.map(HttpTrafficMapper.toEntity);
  }

  async findById(httpTrafficId: string): Promise<HttpTraffic | null> {
    const httpTraffic = await databaseConnection.httpTraffic.findUnique({
      where: { id: httpTrafficId },
    });
    if (!httpTraffic) return null;
    return HttpTrafficMapper.toEntity(httpTraffic);
  }

  async createHttpTraffic(httpTraffic: HttpTraffic): Promise<HttpTraffic> {
    await databaseConnection.httpTraffic.create({ data: httpTraffic });
    return httpTraffic;
  }

  async deleteHttpTraffic(httpTrafficId: string): Promise<void> {
    await databaseConnection.httpTraffic.delete({
      where: { id: httpTrafficId },
    });
  }
}

export { PrismaHttpTrafficRepository };
