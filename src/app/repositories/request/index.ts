import { databaseConnection } from "../../../infra/adapters/dbAdapter";
import { JsonAdapter } from "../../../infra/adapters/jsonAdapter";
import { RequestMapper } from "../../../infra/mappers/request";
import { Request } from "../../entities/request";
import { RequestRepositoryDTO } from "./repositoryDTO";

class RequestRepository implements RequestRepositoryDTO {
  async findAll(httpTrafficId: string): Promise<Request[]> {
    const requests = await databaseConnection.request.findMany({
      where: { httpTrafficId },
    });

    const jsonAdapter = new JsonAdapter();
    return requests.map((request) =>
      RequestMapper.toEntity({
        id: request.id,
        body: jsonAdapter.jsonValueToStringRecord(request.body),
        headers: jsonAdapter.jsonValueToStringRecord(request.headers),
        httpTrafficId: request.httpTrafficId,
        queryParams: jsonAdapter.jsonValueToStringRecord(request.queryParams),
        createdAt: request.createdAt,
      })
    );
  }

  async findById(requestId: string): Promise<Request | null> {
    const request = await databaseConnection.request.findUnique({
      where: { id: requestId },
    });

    if (!request) return null;

    const jsonAdapter = new JsonAdapter();
    return RequestMapper.toEntity(
      RequestMapper.toEntity({
        id: request.id,
        body: jsonAdapter.jsonValueToStringRecord(request.body),
        headers: jsonAdapter.jsonValueToStringRecord(request.headers),
        httpTrafficId: request.httpTrafficId,
        queryParams: jsonAdapter.jsonValueToStringRecord(request.queryParams),
        createdAt: request.createdAt,
      })
    );
  }

  async createRequest(request: Request): Promise<Request> {
    await databaseConnection.request.create({ data: request });
    return request;
  }

  async deleteRequest(requestId: string): Promise<void> {
    await databaseConnection.request.delete({
      where: { id: requestId },
    });
  }
}

export { RequestRepository };
