import { RequestSearchParams } from "../../../app/search/requestSearchParams";
import { SearchResult } from "../../../app/shared/searchResult";
import { Request } from "../../../domain/entities/request";
import { RequestRepository } from "../../../domain/repositories/request";
import { databaseConnection } from "../../adapters/dbAdapter";
import { JsonAdapter } from "../../adapters/jsonAdapter";
import { RequestMapper } from "../mappers/request";

class PrismaRequestRepository implements RequestRepository {
  toJson = new JsonAdapter();

  async findAll(
    searchParams: RequestSearchParams
  ): Promise<SearchResult<Request>> {
    const [requests, count] = await Promise.all([
      databaseConnection.request.findMany(searchParams.toPrisma()),
      databaseConnection.request.count({
        where: searchParams.toPrisma().where,
      }),
    ]);

    return new SearchResult({
      data: requests.map(RequestMapper.toEntity),
      meta: {
        page: searchParams.page,
        pageLimit: searchParams.pageLimit,
        totalItems: count,
      },
    });
  }

  async findById(requestId: string): Promise<Request | null> {
    const request = await databaseConnection.request.findUnique({
      where: { id: requestId },
    });

    if (!request) return null;
    return RequestMapper.toEntity(request);
  }

  async createRequest(request: Request): Promise<Request> {
    await databaseConnection.request.create({
      data: { ...request, body: request?.body || undefined },
    });

    return request;
  }

  async deleteRequest(requestId: string): Promise<void> {
    await databaseConnection.request.delete({
      where: { id: requestId },
    });
  }
}

export { PrismaRequestRepository };
