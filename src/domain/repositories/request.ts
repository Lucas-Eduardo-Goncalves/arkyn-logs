import { RequestSearchParams } from "../../app/search/requestSearchParams";
import { SearchResult } from "../../app/shared/searchResult";
import { Request } from "../entities/request";

type RequestRepository = {
  findAll: (
    searchParams: RequestSearchParams
  ) => Promise<SearchResult<Request>>;
  findById: (requestId: string) => Promise<Request | null>;
  createRequest: (request: Request) => Promise<Request>;
  deleteRequest: (requestId: string) => Promise<void>;
};

export type { RequestRepository };
