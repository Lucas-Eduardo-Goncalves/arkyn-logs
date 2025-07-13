import { SearchParams } from "../shared/searchParams";

type Filter = {
  userId: string;
};

class TrafficSourceSearchParams extends SearchParams<Filter> {}

export { TrafficSourceSearchParams };
