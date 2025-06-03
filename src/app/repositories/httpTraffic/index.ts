import { databaseConnection } from "../../../infra/adapters/dbAdapter";
import { DomainMapper } from "../../../infra/mappers/domain";
import { HttpTrafficMapper } from "../../../infra/mappers/httpTraffic";
import { PathnameMapper } from "../../../infra/mappers/pathname";
import { RequestMapper } from "../../../infra/mappers/request";
import { ResponseMapper } from "../../../infra/mappers/response";
import { HttpTraffic } from "../../entities/httpTraffic";
import { HttpTrafficRepositoryDTO, Summary } from "./repositoryDTO";

class HttpTrafficRepository implements HttpTrafficRepositoryDTO {
  async findAll(trafficSourceId: string): Promise<HttpTraffic[]> {
    const httpTraffics = await databaseConnection.httpTraffic.findMany({
      where: { trafficSourceId },
    });

    return httpTraffics.map(HttpTrafficMapper.toEntity);
  }

  async findAllSummary(trafficSourceId: string): Promise<Summary[]> {
    const httpTraffics = await databaseConnection.httpTraffic.findMany({
      where: { trafficSourceId },
      include: { domain: true, request: true, response: true, pathname: true },
    });

    return httpTraffics.map((httpTraffic) => ({
      domain: DomainMapper.toEntity(httpTraffic.domain),
      httpTraffic: HttpTrafficMapper.toEntity(httpTraffic),
      request: RequestMapper.toSafeEntity(httpTraffic.request),
      response: ResponseMapper.toSafeEntity(httpTraffic.response),
      pathname: PathnameMapper.toEntity(httpTraffic.pathname),
    }));
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
