import { databaseConnection } from "../../../infra/adapters/dbAdapter";
import { JsonAdapter } from "../../../infra/adapters/jsonAdapter";
import { ResponseMapper } from "../../../infra/mappers/response";
import { Response } from "../../entities/response";
import { ResponseRepositoryDTO } from "./repositoryDTO";

class ResponseRepository implements ResponseRepositoryDTO {
  toJson = new JsonAdapter();

  async findAll(httpTrafficId: string): Promise<Response[]> {
    const responses = await databaseConnection.response.findMany({
      where: { httpTrafficId },
    });

    return responses.map(ResponseMapper.toEntity);
  }

  async findById(responseId: string): Promise<Response | null> {
    const response = await databaseConnection.response.findUnique({
      where: { id: responseId },
    });

    if (!response) return null;
    return ResponseMapper.toEntity(response);
  }

  async createResponse(response: Response): Promise<Response> {
    await databaseConnection.response.create({ data: response });
    return response;
  }

  async deleteResponse(responseId: string): Promise<void> {
    await databaseConnection.response.delete({
      where: { id: responseId },
    });
  }
}

export { ResponseRepository };
