import { PathnameRepository } from "../../../domain/repositories/pathname";

class ListPathnamesUseCase {
  constructor(private pathnameRepository: PathnameRepository) {}

  async execute(trafficSourceId: string, domainId: string) {
    const pathnames = await this.pathnameRepository.findAll(
      trafficSourceId,
      domainId
    );

    return pathnames.map((user) => user.toJson());
  }
}

export { ListPathnamesUseCase };
