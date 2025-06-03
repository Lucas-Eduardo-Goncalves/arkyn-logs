import { HttpAdapter } from "../../../../infra/adapters/httpAdapter";
import { PathnameRepository } from "../../../repositories/pathname";

class ListPathnamesUseCase {
  constructor(private pathnameRepository: PathnameRepository) {}

  async execute(trafficSourceId?: string, domainId?: string) {
    if (!trafficSourceId) {
      const httpAdapter = new HttpAdapter();
      const message = "Traffic source ID is required to list pathnames.";
      throw httpAdapter.notFound(message);
    }

    if (!domainId) {
      const httpAdapter = new HttpAdapter();
      const message = "Domain ID is required to list pathnames.";
      throw httpAdapter.notFound(message);
    }

    const pathnames = await this.pathnameRepository.findAll(
      trafficSourceId,
      domainId
    );

    return pathnames.map((user) => user.toJson());
  }
}

export { ListPathnamesUseCase };
