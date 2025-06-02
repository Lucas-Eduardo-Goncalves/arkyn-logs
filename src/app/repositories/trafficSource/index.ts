import { HttpAdapter } from "../../../infra/adapters/httpAdapter";
import { TrafficSourceMapper } from "../../../infra/mappers/trafficSource";
import { TrafficSource } from "../../entities/trafficSource";
import { TrafficSourceRepositoryDTO } from "./repositoryDTO";

class TrafficSourceRepository implements TrafficSourceRepositoryDTO {
  static trafficSources: TrafficSource[] = [];

  async findAll(userId: string): Promise<TrafficSource[]> {
    return TrafficSourceRepository.trafficSources
      .filter((trafficSource) => trafficSource.userId === userId)
      .map((trafficSource) => TrafficSourceMapper.toEntity(trafficSource));
  }

  async findById(trafficSourceId: string): Promise<TrafficSource | null> {
    const trafficSource = TrafficSourceRepository.trafficSources.find(
      (trafficSource) => trafficSource.id === trafficSourceId
    );
    if (!trafficSource) return null;
    return TrafficSourceMapper.toEntity(trafficSource);
  }

  async findByDomain(
    trafficSourceDomain: string
  ): Promise<TrafficSource | null> {
    const trafficSource = TrafficSourceRepository.trafficSources.find(
      (trafficSource) => trafficSource.trafficDomain === trafficSourceDomain
    );

    if (!trafficSource) return null;
    return TrafficSourceMapper.toEntity(trafficSource);
  }

  async createTrafficSource(
    trafficSource: TrafficSource
  ): Promise<TrafficSource> {
    TrafficSourceRepository.trafficSources.push(trafficSource);
    return trafficSource;
  }

  async updateTrafficSource(
    trafficSource: TrafficSource
  ): Promise<TrafficSource> {
    const index = TrafficSourceRepository.trafficSources.findIndex(
      (u) => u.id === trafficSource.id
    );
    const httpAdpter = new HttpAdapter();
    if (index === -1) httpAdpter.serverError("TrafficSource not found");
    TrafficSourceRepository.trafficSources[index] = trafficSource;
    return trafficSource;
  }

  async deleteTrafficSource(trafficSourceId: string): Promise<void> {
    const index = TrafficSourceRepository.trafficSources.findIndex(
      (trafficSource) => trafficSource.id === trafficSourceId
    );
    const httpAdpter = new HttpAdapter();
    if (index === -1) httpAdpter.serverError("TrafficSource not found");
    TrafficSourceRepository.trafficSources.splice(index, 1);
  }
}

export { TrafficSourceRepository };
