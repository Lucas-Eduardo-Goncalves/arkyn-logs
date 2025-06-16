import { HttpMethod } from "../../main/types/HttpMethod";
import { SearchParams } from "../shared/searchParams";

type Filter = {
  requestHeaders?: any;
  requestBody?: any;
  responseHeaders?: any;
  responseBody?: any;
  queryParams?: any;
  method?: HttpMethod;
  level?: "INFO" | "WARNING" | "DEBUG";
  trafficSourceId: string;
  status?: number;
  protocol?: "HTTP" | "HTTPS";
};

class HttpTrafficRecordSearchParams extends SearchParams<Filter> {}

export { HttpTrafficRecordSearchParams };
