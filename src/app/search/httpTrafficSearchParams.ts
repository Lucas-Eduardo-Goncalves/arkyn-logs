import { SearchParams } from "../shared/searchParams";

type Filter = {
  trafficSourceId: string;
};

class HttpTrafficSearchParams extends SearchParams<Filter> {}

export { HttpTrafficSearchParams };
