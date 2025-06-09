import { HttpAdapter } from "../../../infra/adapters/httpAdapter";
import { CorePathname } from "../../entities/corePathname";
import { CorePathnameRepository } from "../../repositories/corePathname/repository";
import { TrafficSourceRepository } from "../../repositories/trafficSource/repository";

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
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.notFound("Traffic source not found");
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
