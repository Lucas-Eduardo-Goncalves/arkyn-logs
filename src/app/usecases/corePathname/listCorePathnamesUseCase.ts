import { CorePathnameRepository } from "../../repositories/corePathname/repository";

class ListCorePathnamesUseCase {
  constructor(private corePathnameRepository: CorePathnameRepository) {}

  async execute(trafficSourceId: string) {
    const corePathnames = await this.corePathnameRepository.findAll(
      trafficSourceId
    );

    return corePathnames.map((user) => user.toJson());
  }
}

export { ListCorePathnamesUseCase };
