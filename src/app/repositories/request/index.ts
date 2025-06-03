import { databaseConnection } from "../../../infra/adapters/dbAdapter";
import { JsonAdapter } from "../../../infra/adapters/jsonAdapter";
import { RequestMapper } from "../../../infra/mappers/request";
import { Request } from "../../entities/request";
import { RequestRepositoryDTO } from "./repositoryDTO";

class RequestRepository implements RequestRepositoryDTO {
  toJson = new JsonAdapter();

  async findAll(httpTrafficId: string): Promise<Request[]> {
    const requests = await databaseConnection.request.findMany({
      where: { httpTrafficId },
    });

    return requests.map(RequestMapper.toEntity);
  }

  async findById(requestId: string): Promise<Request | null> {
    const request = await databaseConnection.request.findUnique({
      where: { id: requestId },
    });

    if (!request) return null;
    return RequestMapper.toEntity(request);
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
