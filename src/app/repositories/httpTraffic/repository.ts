import { HttpTraffic } from "../../entities/httpTraffic";

type HttpTrafficRepository = {
  findAll: (trafficSourceId: string) => Promise<HttpTraffic[]>;
  findById: (httpTrafficId: string) => Promise<HttpTraffic | null>;
  createHttpTraffic: (httpTraffic: HttpTraffic) => Promise<HttpTraffic>;
  deleteHttpTraffic: (httpTrafficId: string) => Promise<void>;
};

export type { HttpTrafficRepository };
