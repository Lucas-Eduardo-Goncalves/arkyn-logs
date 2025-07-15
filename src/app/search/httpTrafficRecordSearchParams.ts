import { HttpMethod } from "../../main/types/HttpMethod";
import { SearchParams } from "../shared/searchParams";

type Filter = {
  method?: HttpMethod;
  level?: "info" | "warning" | "DEBUG";
  trafficSourceId: string;
  status?: number;
  protocol?: "http" | "https";
};

class HttpTrafficRecordSearchParams extends SearchParams<Filter> {}

export { HttpTrafficRecordSearchParams };
