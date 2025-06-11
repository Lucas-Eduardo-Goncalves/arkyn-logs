import { TrafficSource } from "../../../domain/entities/trafficSource";

type TrafficSourceMapperDTO = {
  id: string;
  name: string;
  trafficDomain: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

class TrafficSourceMapper {
  static toEntity(trafficSource: TrafficSourceMapperDTO): TrafficSource {
    return TrafficSource.restore({
      id: trafficSource.id,
      name: trafficSource.name,
      trafficDomain: trafficSource.trafficDomain,
      userId: trafficSource.userId,
      createdAt: trafficSource.createdAt,
      updatedAt: trafficSource.updatedAt,
    });
  }
}
export { TrafficSourceMapper };
