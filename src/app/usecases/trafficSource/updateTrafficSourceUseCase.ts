import { HttpAdapter } from "../../../infra/adapters/httpAdapter";
import { TrafficSourceRepository } from "../../repositories/trafficSource/repository";

type InputProps = {
  trafficSourceId: string;
  name?: string;
  trafficDomain?: string;
};

class UpdateTrafficSourceUseCase {
  constructor(private trafficSourceRepository: TrafficSourceRepository) {}

  async execute(input: InputProps) {
    const { trafficSourceId, name, trafficDomain } = input;

    const trafficSource = await this.trafficSourceRepository.findById(
      trafficSourceId
    );

    if (!trafficSource) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.notFound("Traffic source not found");
    }

    trafficSource.update({ name, trafficDomain });
    await this.trafficSourceRepository.updateTrafficSource(trafficSource);

    return trafficSource.toJson();
  }
}

export { UpdateTrafficSourceUseCase };
