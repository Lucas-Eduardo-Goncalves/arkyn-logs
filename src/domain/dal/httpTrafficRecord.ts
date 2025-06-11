import { HttpTrafficRecord } from "../views/httpTrafficRecord";

type HttpTrafficRecordDAL = {
  findAll: (trafficSourceId: string) => Promise<HttpTrafficRecord[]>;
};

export type { HttpTrafficRecordDAL };
