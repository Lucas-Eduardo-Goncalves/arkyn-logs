import { databaseConnection } from "../../../infra/adapters/dbAdapter";
import { HttpAdapter } from "../../../infra/adapters/httpAdapter";
import { TrafficSourceMapper } from "../../../infra/mappers/trafficSource";
import { TrafficSource } from "../../entities/trafficSource";
import { TrafficSourceRepositoryDTO } from "./repositoryDTO";

class TrafficSourceRepository implements TrafficSourceRepositoryDTO {
  async findAll(userId: string): Promise<TrafficSource[]> {
    const trafficSources = await databaseConnection.trafficSource.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return trafficSources.map((trafficSource) =>
      TrafficSourceMapper.toEntity(trafficSource)
    );
  }

  async findById(trafficSourceId: string): Promise<TrafficSource | null> {
    const trafficSource = await databaseConnection.trafficSource.findUnique({
      where: { id: trafficSourceId },
    });
    if (!trafficSource) return null;
    return TrafficSourceMapper.toEntity(trafficSource);
  }

  async findByDomain(
    trafficSourceDomain: string
  ): Promise<TrafficSource | null> {
    const trafficSource = await databaseConnection.trafficSource.findFirst({
      where: { trafficDomain: trafficSourceDomain },
    });

    if (!trafficSource) return null;
    return TrafficSourceMapper.toEntity(trafficSource);
  }

  async createTrafficSource(
    trafficSource: TrafficSource
  ): Promise<TrafficSource> {
    await databaseConnection.trafficSource.create({ data: trafficSource });
    return trafficSource;
  }

  async updateTrafficSource(
    trafficSource: TrafficSource
  ): Promise<TrafficSource> {
    await databaseConnection.trafficSource.update({
      data: trafficSource,
      where: { id: trafficSource.id },
    });

    return trafficSource;
  }

  async deleteTrafficSource(trafficSourceId: string): Promise<void> {
    await databaseConnection.trafficSource.delete({
      where: { id: trafficSourceId },
    });
  }
}

export { TrafficSourceRepository };
