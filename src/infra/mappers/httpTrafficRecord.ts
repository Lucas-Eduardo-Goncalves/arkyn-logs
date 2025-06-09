import { HttpTrafficRecord } from "../../app/views/httpTrafficRecord";
import { DomainMapper } from "./domain";
import { HttpTrafficMapper } from "./httpTraffic";
import { PathnameMapper } from "./pathname";
import { RequestMapper } from "./request";
import { ResponseMapper } from "./response";

type HttpTrafficRecordMapperDTO = {
  id: string;
  domainId: string;
  level: "INFO" | "FATAL" | "WARNING";
  method: "POST" | "PUT" | "PATCH" | "DELETE" | "GET";
  pathnameId: string;
  status: number;
  elapsedTime: number;
  trafficUserId: string | null;
  trafficSourceId: string;
  createdAt: Date;

  domain: {
    id: string;
    value: string;
    protocol: "HTTP" | "HTTPS";
    trafficSourceId: string;
    createdAt: Date;
  };

  request: {
    id: string;
    headers: any;
    body: any;
    queryParams: any;
    httpTrafficId: string;
    createdAt: Date;
  } | null;

  response: {
    id: string;
    headers: any;
    body: any;
    httpTrafficId: string;
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
  static toEntity(data: HttpTrafficRecordMapperDTO): HttpTrafficRecord {
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
