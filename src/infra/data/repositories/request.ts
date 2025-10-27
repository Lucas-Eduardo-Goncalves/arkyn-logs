import { RequestSearchParams } from "../../../app/search/requestSearchParams";
import { SearchResult } from "../../../app/shared/searchResult";
import { Request } from "../../../domain/entities/request";
import { RequestRepository } from "../../../domain/repositories/request";
import { cacheDb } from "../../adapters/cacheDbAdapter";
import { databaseConnection } from "../../adapters/dbAdapter";
import { RequestMapper } from "../mappers/request";

class PrismaRequestRepository implements RequestRepository {
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
    const cached = await cacheDb.getJson<any>(requestId);
    if (cached) return RequestMapper.toEntity(cached);

    const request = await databaseConnection.request.findUnique({
      where: { id: requestId },
    });

    if (!request) return null;

    await cacheDb.setJson(requestId, request);
    return RequestMapper.toEntity(request);
  }

  async createRequest(request: Request): Promise<Request> {
    await databaseConnection.request.create({
      data: RequestMapper.toDatabase(request),
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
