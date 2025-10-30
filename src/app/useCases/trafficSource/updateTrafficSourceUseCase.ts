import { TrafficSourceRepository } from "../../../domain/repositories/trafficSource";
import { HttpAdapter } from "../../../infra/adapters/httpAdapter";

type InputProps = {
  trafficSourceId: string;
  name?: string;
  trafficDomain?: string;
};

class UpdateTrafficSourceUseCase {
  constructor(private trafficSourceRepository: TrafficSourceRepository) {}

  async execute(input: InputProps, userId: string) {
    const { trafficSourceId, name, trafficDomain } = input;

    const trafficSource = await this.trafficSourceRepository.findById(
      trafficSourceId
    );

    if (!trafficSource) {
      throw HttpAdapter.notFound("Traffic source not found");
    }

    if (trafficSource.userId !== userId) {
      throw HttpAdapter.forbidden("You do not own this traffic source.");
    }

    trafficSource.update({ name, trafficDomain });

    await this.trafficSourceRepository.updateTrafficSource(trafficSource);

    return trafficSource.toJson();
  }
}

export { UpdateTrafficSourceUseCase };
