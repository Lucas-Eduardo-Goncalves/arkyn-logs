import { TrafficSourceSearchParams } from "../../app/search/trafficSourceSearchParams";
import { SearchResult } from "../../app/shared/searchResult";
import { TrafficSource } from "../entities/trafficSource";

type TrafficSourceRepository = {
  findAll: (
    searchParams: TrafficSourceSearchParams
  ) => Promise<SearchResult<TrafficSource>>;
  findById: (trafficSourceId: string) => Promise<TrafficSource | null>;
  findByDomain: (trafficSourceDomain: string) => Promise<TrafficSource | null>;
  createTrafficSource: (trafficSource: TrafficSource) => Promise<TrafficSource>;
  updateTrafficSource: (trafficSource: TrafficSource) => Promise<TrafficSource>;
  deleteTrafficSource: (trafficSourceId: string) => Promise<void>;
};

export type { TrafficSourceRepository };
