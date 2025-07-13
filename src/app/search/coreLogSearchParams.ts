import { SearchParams } from "../shared/searchParams";

type Filter = {
  trafficSourceId: string;
};

class CoreLogSearchParams extends SearchParams<Filter> {}

export { CoreLogSearchParams };
