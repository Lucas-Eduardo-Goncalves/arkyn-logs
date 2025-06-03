import { HttpTrafficRecord } from "../../entities/httpTrafficRecord";

type HttpTrafficRecordRepositoryDTO = {
  findAll: (trafficSourceId: string) => Promise<HttpTrafficRecord[]>;
};

export type { HttpTrafficRecordRepositoryDTO };
