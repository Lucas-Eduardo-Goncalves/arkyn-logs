import { Response } from "../../domain/entities/response";

type ResponseMapperDTO = {
  id: string;
  headers: any;
  bodyPreview: any;
  bodyUrl: string | null;
  createdAt: Date;
};

class ResponseMapper {
  static toEntity(response: ResponseMapperDTO): Response {
    return Response.restore({
      id: response.id,
      headers: response.headers,
      bodyPreview: response.bodyPreview || null,
      bodyUrl: response.bodyUrl || null,
      createdAt: new Date(response.createdAt),
    });
  }

  static toSafeEntity(response: ResponseMapperDTO | null): Response | null {
    if (!response) return null;
    return Response.restore({
      id: response.id,
      headers: response.headers,
      bodyPreview: response.bodyPreview || null,
      bodyUrl: response.bodyUrl || null,
      createdAt: new Date(response.createdAt),
    });
  }

  static toDatabase(response: Response) {
    return {
      id: response.id,
      headers: response.headers,
      bodyPreview: response.bodyPreview || undefined,
      bodyUrl: response.bodyUrl || undefined,
      createdAt: new Date(response.createdAt),
    };
  }
}
export { ResponseMapper };
