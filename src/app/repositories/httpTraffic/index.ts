import { databaseConnection } from "../../../infra/adapters/dbAdapter";
import { HttpTrafficMapper } from "../../../infra/mappers/httpTraffic";
import { HttpTraffic } from "../../entities/httpTraffic";
import { HttpTrafficRepositoryDTO } from "./repositoryDTO";

class HttpTrafficRepository implements HttpTrafficRepositoryDTO {
  async findAll(trafficSourceId: string): Promise<HttpTraffic[]> {
    const httpTraffics = await databaseConnection.httpTraffic.findMany({
      where: { trafficSourceId },
    });
    return httpTraffics.map((httpTraffic) =>
      HttpTrafficMapper.toEntity(httpTraffic)
    );
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

export { HttpTrafficRepository };
