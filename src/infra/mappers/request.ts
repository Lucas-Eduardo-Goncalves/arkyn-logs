import { Request } from "../../domain/entities/request";

type RequestMapperDTO = {
  id: string;
  headers: any;
  bodyPreview: any;
  bodyUrl: string | null;
  queryParams: any;
  createdAt: Date;
};

class RequestMapper {
  static toEntity(request: RequestMapperDTO): Request {
    return Request.restore({
      id: request.id,
      headers: request.headers,
      bodyPreview: request.bodyPreview || null,
      bodyUrl: request.bodyUrl || null,
      queryParams: request.queryParams || null,
      createdAt: new Date(request.createdAt),
    });
  }

  static toSafeEntity(request: RequestMapperDTO | null): Request | null {
    if (!request) return null;
    return Request.restore({
      id: request.id,
      headers: request.headers,
      bodyPreview: request.bodyPreview || null,
      bodyUrl: request.bodyUrl || null,
      queryParams: request.queryParams || null,
      createdAt: new Date(request.createdAt),
    });
  }

  static toDatabase(request: Request) {
    return {
      id: request.id,
      headers: request.headers,
      bodyPreview: request.bodyPreview || undefined,
      bodyUrl: request.bodyUrl || undefined,
      queryParams: request.queryParams,
      createdAt: new Date(request.createdAt),
    };
  }
}
export { RequestMapper };
