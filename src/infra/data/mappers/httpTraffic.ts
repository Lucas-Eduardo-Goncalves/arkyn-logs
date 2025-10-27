import { HttpTraffic } from "../../../domain/entities/httpTraffic";
import { HttpMethod } from "../../../main/types/HttpMethod";

type HttpTrafficMapperDTO = {
  id: string;
  domainId: string;
  level: "info" | "fatal" | "warning";
  method: HttpMethod;
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
      createdAt: new Date(httpTraffic.createdAt),
    });
  }
}
export { HttpTrafficMapper };
