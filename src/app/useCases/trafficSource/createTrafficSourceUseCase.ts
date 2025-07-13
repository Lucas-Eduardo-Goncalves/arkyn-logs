import { HttpAdapter } from "../../../infra/adapters/httpAdapter";
import { TrafficSource } from "../../../domain/entities/trafficSource";
import { TrafficSourceRepository } from "../../../domain/repositories/trafficSource";
import { UserRepository } from "../../../domain/repositories/user";

type InputProps = {
  name: string;
  userId: string;
  trafficDomain: string;
};

class CreateTrafficSourceUseCase {
  constructor(
    private trafficSourceRepository: TrafficSourceRepository,
    private userRepository: UserRepository
  ) {}

  async execute(input: InputProps) {
    const { name, trafficDomain, userId } = input;

    const [existsUser, existsDomain] = await Promise.all([
      await this.userRepository.findById(userId),
      await this.trafficSourceRepository.findByDomain(trafficDomain),
    ]);

    if (!existsUser) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.notFound("User not found");
    }

    if (existsDomain) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.conflict("Traffic domain already exists");
    }

    const trafficSource = TrafficSource.create({ name, userId, trafficDomain });
    await this.trafficSourceRepository.createTrafficSource(trafficSource);

    return trafficSource.toJson();
  }
}

export { CreateTrafficSourceUseCase };
