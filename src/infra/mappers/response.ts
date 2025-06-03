import { Response } from "../../app/entities/response";
import { JsonAdapter } from "../adapters/jsonAdapter";

type ResponseMapperDTO = {
  id: string;
  headers: any;
  body: any;
  httpTrafficId: string;
  createdAt: Date;
};

class ResponseMapper {
  static toEntity(response: ResponseMapperDTO): Response {
    const jsonAdapter = new JsonAdapter();
    return Response.restore({
      id: response.id,
      headers: jsonAdapter.jsonValueToStringRecord(response.headers),
      body: jsonAdapter.jsonValueToStringRecord(response.body),
      httpTrafficId: response.httpTrafficId,
      createdAt: response.createdAt,
    });
  }

  static toSafeEntity(request: ResponseMapperDTO | null): Response | null {
    const jsonAdapter = new JsonAdapter();
    if (!request) return null;
    return Response.restore({
      id: request.id,
      headers: jsonAdapter.jsonValueToStringRecord(request.headers),
      body: jsonAdapter.jsonValueToStringRecord(request.body),
      httpTrafficId: request.httpTrafficId,
      createdAt: request.createdAt,
    });
  }
}
export { ResponseMapper };
