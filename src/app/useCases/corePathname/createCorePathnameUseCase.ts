import { HttpAdapter } from "../../../infra/adapters/httpAdapter";
import { CorePathname } from "../../../domain/entities/corePathname";
import { CorePathnameRepository } from "../../../domain/repositories/corePathname";
import { TrafficSourceRepository } from "../../../domain/repositories/trafficSource";

type InputProps = {
  trafficSourceId: string;
  value: string;
};

class CreateCorePathnameUseCase {
  constructor(
    private corePathnameRepository: CorePathnameRepository,
    private trafficSourceRepository: TrafficSourceRepository
  ) {}

  async execute(input: InputProps) {
    const { trafficSourceId, value } = input;

    const [existsTrafficSource, existsCorePathname] = await Promise.all([
      await this.trafficSourceRepository.findById(trafficSourceId),
      await this.corePathnameRepository.findByValue(value),
    ]);

    if (!existsTrafficSource) {
      throw HttpAdapter.notFound("Traffic source not found");
    }

    if (existsCorePathname) return existsCorePathname.toJson();

    const corePathname = CorePathname.create({
      trafficSourceId,
      value,
    });

    await this.corePathnameRepository.createCorePathname(corePathname);

    return corePathname.toJson();
  }
}

export { CreateCorePathnameUseCase };
