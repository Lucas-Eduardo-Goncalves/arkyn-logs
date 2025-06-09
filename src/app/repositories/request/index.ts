import { databaseConnection } from "../../../infra/adapters/dbAdapter";
import { JsonAdapter } from "../../../infra/adapters/jsonAdapter";
import { RequestMapper } from "../../../infra/mappers/request";
import { Request } from "../../entities/request";
import { RequestRepository } from "./repository";

class PrismaRequestRepository implements RequestRepository {
  toJson = new JsonAdapter();

  async findAll(): Promise<Request[]> {
    const requests = await databaseConnection.request.findMany();

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

export { PrismaRequestRepository };
