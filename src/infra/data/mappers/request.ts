import { Request } from "../../../domain/entities/request";
import { JsonAdapter } from "../../adapters/jsonAdapter";

type RequestMapperDTO = {
  id: string;
  headers: any;
  body: any;
  queryParams: any;
  createdAt: Date;
};

class RequestMapper {
  static toEntity(request: RequestMapperDTO): Request {
    const jsonAdapter = new JsonAdapter();
    return Request.restore({
      id: request.id,
      headers: jsonAdapter.jsonValueToStringRecord(request.headers),
      body: jsonAdapter.jsonValueToStringRecord(request.body),
      queryParams: jsonAdapter.jsonValueToStringRecord(request.queryParams),
      createdAt: request.createdAt,
    });
  }

  static toSafeEntity(request: RequestMapperDTO | null): Request | null {
    const jsonAdapter = new JsonAdapter();
    if (!request) return null;
    return Request.restore({
      id: request.id,
      headers: jsonAdapter.jsonValueToStringRecord(request.headers),
      body: jsonAdapter.jsonValueToStringRecord(request.body),
      queryParams: jsonAdapter.jsonValueToStringRecord(request.queryParams),
      createdAt: request.createdAt,
    });
  }
}
export { RequestMapper };
