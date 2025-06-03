import { HttpAdapter } from "../../../../infra/adapters/httpAdapter";
import { SchemaValidatorAdapter } from "../../../../infra/adapters/schemaValidatorAdapter";
import { deleteTrafficSourceSchema } from "../../../../infra/schemas/internal/trafficSource";
import { TrafficSourceRepository } from "../../../repositories/trafficSource";

class DeleteTrafficSourceUseCase {
  constructor(private trafficSourceRepository: TrafficSourceRepository) {}

  async execute(body: any) {
    const schemaValidator = new SchemaValidatorAdapter(
      deleteTrafficSourceSchema
    );
    const validatedBody = schemaValidator.validate(body);

    const trafficSource = await this.trafficSourceRepository.findById(
      validatedBody.id
    );

    if (!trafficSource) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.notFound("Log channel not found");
    }

    await this.trafficSourceRepository.deleteTrafficSource(trafficSource.id);
  }
}

export { DeleteTrafficSourceUseCase };
