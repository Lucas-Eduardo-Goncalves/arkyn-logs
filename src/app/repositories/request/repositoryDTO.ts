import { Request } from "../../entities/request";

type RequestRepositoryDTO = {
  findAll: (httpTrafficId: string) => Promise<Request[]>;
  findById: (requestId: string) => Promise<Request | null>;
  createRequest: (request: Request) => Promise<Request>;
  deleteRequest: (requestId: string) => Promise<void>;
};

export type { RequestRepositoryDTO };
