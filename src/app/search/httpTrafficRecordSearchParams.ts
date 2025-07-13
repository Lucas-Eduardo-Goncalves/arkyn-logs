import { HttpMethod } from "../../main/types/HttpMethod";
import { SearchParams } from "../shared/searchParams";

type Filter = {
  method?: HttpMethod;
  level?: "INFO" | "WARNING" | "DEBUG";
  trafficSourceId: string;
  status?: number;
  protocol?: "HTTP" | "HTTPS";
};

class HttpTrafficRecordSearchParams extends SearchParams<Filter> {}

export { HttpTrafficRecordSearchParams };
