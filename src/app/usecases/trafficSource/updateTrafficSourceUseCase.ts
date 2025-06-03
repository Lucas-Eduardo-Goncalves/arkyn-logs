import { HttpAdapter } from "../../../../infra/adapters/httpAdapter";
import { SchemaValidatorAdapter } from "../../../../infra/adapters/schemaValidatorAdapter";
import { updateTrafficSourceSchema } from "../../../../infra/schemas/internal/trafficSource";
import { TrafficSourceRepository } from "../../../repositories/trafficSource";

class UpdateTrafficSourceUseCase {
  constructor(private trafficSourceRepository: TrafficSourceRepository) {}

  async execute(body: any) {
    const schemaValidator = new SchemaValidatorAdapter(
      updateTrafficSourceSchema
    );
    const { name, id } = schemaValidator.validate(body);

    const trafficSource = await this.trafficSourceRepository.findById(id);

    if (!trafficSource) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.notFound("Log channel not found");
    }

    trafficSource.update({ name });
    await this.trafficSourceRepository.updateTrafficSource(trafficSource);

    return trafficSource.toJson();
  }
}

export { UpdateTrafficSourceUseCase };
