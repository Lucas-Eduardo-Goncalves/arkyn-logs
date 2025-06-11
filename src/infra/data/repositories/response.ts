import { Response } from "../../../domain/entities/response";
import { ResponseRepository } from "../../../domain/repositories/response";
import { databaseConnection } from "../../adapters/dbAdapter";
import { JsonAdapter } from "../../adapters/jsonAdapter";
import { ResponseMapper } from "../mappers/response";

class PrismaResponseRepository implements ResponseRepository {
  toJson = new JsonAdapter();

  async findAll(): Promise<Response[]> {
    const responses = await databaseConnection.response.findMany();

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
