import { CoreLogSearchParams } from "../../app/search/coreLogSearchParams";
import { SearchResult } from "../../app/shared/searchResult";
import { CoreLog } from "../entities/coreLog";

type CoreLogRepository = {
  findAll: (
    searchParams: CoreLogSearchParams
  ) => Promise<SearchResult<CoreLog>>;
  findById: (coreLogId: string) => Promise<CoreLog | null>;
  createCoreLog: (coreLog: CoreLog) => Promise<CoreLog>;
};

export type { CoreLogRepository };
