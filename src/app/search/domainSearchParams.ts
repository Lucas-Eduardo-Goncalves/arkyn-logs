import { SearchParams } from "../shared/searchParams";

type Filter = {
  trafficSourceId: string;
};

class DomainSearchParams extends SearchParams<Filter> {}

export { DomainSearchParams };
