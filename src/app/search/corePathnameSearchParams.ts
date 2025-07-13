import { SearchParams } from "../shared/searchParams";

type Filter = {
  trafficSourceId: string;
};

class CorePathnameSearchParams extends SearchParams<Filter> {}

export { CorePathnameSearchParams };
