import { TrafficSource } from "../../../domain/entities/trafficSource";
import { UserGatewayDTO } from "../../../domain/gateways/user";
import { TrafficSourceRepository } from "../../../domain/repositories/trafficSource";
import { HttpAdapter } from "../../../infra/adapters/httpAdapter";

type InputProps = {
  name: string;
  userId: string;
  trafficDomain: string;
};

class CreateTrafficSourceUseCase {
  constructor(
    private trafficSourceRepository: TrafficSourceRepository,
    private userGateway: UserGatewayDTO
  ) {}

  async execute(input: InputProps) {
    const { name, trafficDomain, userId } = input;

    const [isValidUser, existsDomain] = await Promise.all([
      await this.userGateway.validateUserId(userId),
      await this.trafficSourceRepository.findByDomain(trafficDomain),
    ]);

    if (!isValidUser) {
      throw HttpAdapter.notFound("Invalid user ID");
    }

    if (existsDomain) {
      throw HttpAdapter.conflict("Traffic domain already exists");
    }

    const trafficSource = TrafficSource.create({ name, userId, trafficDomain });
    await this.trafficSourceRepository.createTrafficSource(trafficSource);

    return trafficSource.toJson();
  }
}

export { CreateTrafficSourceUseCase };
