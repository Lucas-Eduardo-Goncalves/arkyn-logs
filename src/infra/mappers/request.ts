import { Request } from "../../app/entities/request";

type RequestMapperDTO = {
  id: string;
  headers: Record<string, string>;
  body: Record<string, string>;
  queryParams: Record<string, string>;
  httpTrafficId: string;
  createdAt: Date;
};

class RequestMapper {
  static toEntity(request: RequestMapperDTO): Request {
    return Request.restore({
      id: request.id,
      headers: request.headers,
      body: request.body,
      queryParams: request.queryParams,
      httpTrafficId: request.httpTrafficId,
      createdAt: request.createdAt,
    });
  }
}
export { RequestMapper };
