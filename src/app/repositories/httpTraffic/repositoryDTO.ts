import { Domain } from "../../entities/domain";
import { HttpTraffic } from "../../entities/httpTraffic";
import { Pathname } from "../../entities/pathname";
import { Request } from "../../entities/request";
import { Response } from "../../entities/response";

type Summary = {
  httpTraffic: HttpTraffic;
  request: Request | null;
  response: Response | null;
  domain: Domain;
  pathname: Pathname;
};

type HttpTrafficRepositoryDTO = {
  findAll: (trafficSourceId: string) => Promise<HttpTraffic[]>;
  findAllSummary: (trafficSourceId: string) => Promise<Summary[]>;
  findById: (httpTrafficId: string) => Promise<HttpTraffic | null>;
  createHttpTraffic: (httpTraffic: HttpTraffic) => Promise<HttpTraffic>;
  deleteHttpTraffic: (httpTrafficId: string) => Promise<void>;
};

export type { HttpTrafficRepositoryDTO, Summary };
