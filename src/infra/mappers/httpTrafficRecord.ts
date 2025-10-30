import { HttpTrafficRecord } from "../../domain/views/httpTrafficRecord";
import { HttpMethod } from "../../main/types/HttpMethod";
import { DomainMapper } from "./domain";
import { HttpTrafficMapper } from "./httpTraffic";
import { PathnameMapper } from "./pathname";
import { RequestMapper } from "./request";
import { ResponseMapper } from "./response";

type HttpTrafficRecordMapperDTO = {
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

  domain: {
    id: string;
    value: string;
    protocol: "http" | "https";
    trafficSourceId: string;
    createdAt: Date;
  };

  request: {
    id: string;
    headers: string;
    bodyPreview: string | null;
    bodyUrl: string | null;
    queryParams: string | null;
    createdAt: Date;
  } | null;

  response: {
    id: string;
    headers: string;
    bodyPreview: string | null;
    bodyUrl: string | null;
    createdAt: Date;
  } | null;

  pathname: {
    id: string;
    value: string;
    trafficSourceId: string;
    domainId: string;
    createdAt: Date;
  };
};

class HttpTrafficRecordMapper {
  static toView(data: HttpTrafficRecordMapperDTO): HttpTrafficRecord {
    const httpTraffic = HttpTrafficMapper.toEntity(data);
    const request = RequestMapper.toSafeEntity(data.request);
    const response = ResponseMapper.toSafeEntity(data.response);
    const domain = DomainMapper.toEntity(data.domain);
    const pathname = PathnameMapper.toEntity(data.pathname);

    return HttpTrafficRecord.restore({
      _domain: domain,
      _httpTraffic: httpTraffic,
      _pathname: pathname,
      _request: request,
      _response: response,
    });
  }
}
export { HttpTrafficRecordMapper };
