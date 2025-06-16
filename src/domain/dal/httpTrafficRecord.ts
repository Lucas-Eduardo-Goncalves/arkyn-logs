import { HttpTrafficRecordSearchParams } from "../../app/search/httpTrafficRecordSearchParams";
import { SearchResult } from "../../app/shared/searchResult";
import { HttpTrafficRecord } from "../views/httpTrafficRecord";

type HttpTrafficRecordDAL = {
  findAll: (
    searchParams: HttpTrafficRecordSearchParams
  ) => Promise<SearchResult<HttpTrafficRecord>>;
};

export type { HttpTrafficRecordDAL };
