import { TrafficSource } from "../entities/trafficSource";

type TrafficSourceRepository = {
  findAll: (userId: string) => Promise<TrafficSource[]>;
  findById: (trafficSourceId: string) => Promise<TrafficSource | null>;
  findByDomain: (trafficSourceDomain: string) => Promise<TrafficSource | null>;
  createTrafficSource: (trafficSource: TrafficSource) => Promise<TrafficSource>;
  updateTrafficSource: (trafficSource: TrafficSource) => Promise<TrafficSource>;
  deleteTrafficSource: (trafficSourceId: string) => Promise<void>;
};

export type { TrafficSourceRepository };
