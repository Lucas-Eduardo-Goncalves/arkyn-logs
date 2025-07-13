import { HttpTrafficSearchParams } from "../../app/search/httpTrafficSearchParams";
import { SearchResult } from "../../app/shared/searchResult";
import { HttpTraffic } from "../entities/httpTraffic";

type HttpTrafficRepository = {
  findAll: (
    searchParams: HttpTrafficSearchParams
  ) => Promise<SearchResult<HttpTraffic>>;
  findById: (httpTrafficId: string) => Promise<HttpTraffic | null>;
  createHttpTraffic: (httpTraffic: HttpTraffic) => Promise<HttpTraffic>;
  deleteHttpTraffic: (httpTrafficId: string) => Promise<void>;
};

export type { HttpTrafficRepository };
