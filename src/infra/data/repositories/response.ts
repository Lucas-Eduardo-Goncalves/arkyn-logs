import { ResponseSearchParams } from "../../../app/search/responseSearchParams";
import { SearchResult } from "../../../app/shared/searchResult";
import { Response } from "../../../domain/entities/response";
import { ResponseRepository } from "../../../domain/repositories/response";
import { cacheDb } from "../../adapters/cacheDbAdapter";
import { databaseConnection } from "../../adapters/dbAdapter";
import { JsonAdapter } from "../../adapters/jsonAdapter";
import { ResponseMapper } from "../mappers/response";

class PrismaResponseRepository implements ResponseRepository {
  toJson = new JsonAdapter();

  async findAll(
    searchParams: ResponseSearchParams
  ): Promise<SearchResult<Response>> {
    const [responses, count] = await Promise.all([
      databaseConnection.response.findMany(searchParams.toPrisma()),
      databaseConnection.response.count({
        where: searchParams.toPrisma().where,
      }),
    ]);

    return new SearchResult({
      data: responses.map(ResponseMapper.toEntity),
      meta: {
        page: searchParams.page,
        pageLimit: searchParams.pageLimit,
        totalItems: count,
      },
    });
  }

  async findById(responseId: string): Promise<Response | null> {
    const cached = await cacheDb.getJson<any>(responseId);
    if (cached) return ResponseMapper.toEntity(cached);

    const response = await databaseConnection.response.findUnique({
      where: { id: responseId },
    });

    if (!response) return null;

    await cacheDb.setJson(responseId, response);
    return ResponseMapper.toEntity(response);
  }

  async createResponse(response: Response): Promise<Response> {
    await databaseConnection.response.create({
      data: { ...response, body: response?.body || undefined },
    });

    return response;
  }

  async deleteResponse(responseId: string): Promise<void> {
    await databaseConnection.response.delete({
      where: { id: responseId },
    });
  }
}

export { PrismaResponseRepository };
