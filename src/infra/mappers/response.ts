import { Response } from "../../app/entities/response";

type ResponseMapperDTO = {
  id: string;
  headers: Record<string, string>;
  body: Record<string, string>;
  httpTrafficId: string;
  createdAt: Date;
};

class ResponseMapper {
  static toEntity(response: ResponseMapperDTO): Response {
    return Response.restore({
      id: response.id,
      headers: response.headers,
      body: response.body,
      httpTrafficId: response.httpTrafficId,
      createdAt: response.createdAt,
    });
  }
}
export { ResponseMapper };
