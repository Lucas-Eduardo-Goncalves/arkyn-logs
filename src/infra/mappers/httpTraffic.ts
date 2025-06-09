import { HttpTraffic } from "../../app/entities/httpTraffic";

type HttpTrafficMapperDTO = {
  id: string;
  domainId: string;
  level: "INFO" | "FATAL" | "WARNING";
  method: "POST" | "PUT" | "PATCH" | "DELETE" | "GET";
  pathnameId: string;
  status: number;
  elapsedTime: number;
  trafficUserId: string | null;
  trafficSourceId: string;
  requestId: string;
  responseId: string;
  createdAt: Date;
};

class HttpTrafficMapper {
  static toEntity(httpTraffic: HttpTrafficMapperDTO): HttpTraffic {
    return HttpTraffic.restore({
      id: httpTraffic.id,
      status: httpTraffic.status,
      method: httpTraffic.method,
      level: httpTraffic.level,
      elapsedTime: httpTraffic.elapsedTime,
      domainId: httpTraffic.domainId,
      pathnameId: httpTraffic.pathnameId,
      trafficUserId: httpTraffic.trafficUserId ?? null,
      trafficSourceId: httpTraffic.trafficSourceId,
      requestId: httpTraffic.requestId,
      responseId: httpTraffic.responseId,
      createdAt: httpTraffic.createdAt,
    });
  }
}
export { HttpTrafficMapper };
