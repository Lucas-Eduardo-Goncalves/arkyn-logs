import { TrafficSource } from "../../entities/trafficSource";

type TrafficSourceRepositoryDTO = {
  findAll: (userId: string) => Promise<TrafficSource[]>;
  findById: (trafficSourceId: string) => Promise<TrafficSource | null>;
  findByDomain: (trafficSourceDomain: string) => Promise<TrafficSource | null>;
  createTrafficSource: (TrafficSource: TrafficSource) => Promise<TrafficSource>;
  updateTrafficSource: (TrafficSource: TrafficSource) => Promise<TrafficSource>;
  deleteTrafficSource: (trafficSourceId: string) => Promise<void>;
};

export type { TrafficSourceRepositoryDTO };
