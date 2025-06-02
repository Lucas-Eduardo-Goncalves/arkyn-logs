import { HttpAdapter } from "../../../../infra/adapters/httpAdapter";
import { SchemaValidatorAdapter } from "../../../../infra/adapters/schemaValidatorAdapter";
import { createTrafficSourceSchema } from "../../../../infra/schemas/internal/trafficSource";
import { TrafficSource } from "../../../entities/trafficSource";
import { TrafficSourceRepository } from "../../../repositories/trafficSource";
import { UserRepository } from "../../../repositories/user";

class CreateTrafficSourceUseCase {
  constructor(
    private trafficSourceRepository: TrafficSourceRepository,
    private userRepository: UserRepository
  ) {}

  async execute(body: any) {
    const schemaValidator = new SchemaValidatorAdapter(
      createTrafficSourceSchema
    );
    const { name, userId, trafficDomain } = schemaValidator.validate(body);

    const existsUser = await this.userRepository.findById(userId);

    if (!existsUser) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.notFound("User not found");
    }

    const trafficSource = TrafficSource.create({ name, userId, trafficDomain });
    await this.trafficSourceRepository.createTrafficSource(trafficSource);

    return trafficSource.toJson();
  }
}

export { CreateTrafficSourceUseCase };
