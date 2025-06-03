import { HttpAdapter } from "../../../infra/adapters/httpAdapter";
import { PathnameRepository } from "../../repositories/pathname/repository";

class DeletePathnameUseCase {
  constructor(private pathnameRepository: PathnameRepository) {}

  async execute(pathnameId: string) {
    const pathname = await this.pathnameRepository.findById(pathnameId);

    if (!pathname) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.notFound("Pathname not found");
    }

    await this.pathnameRepository.deletePathname(pathname.id);
  }
}

export { DeletePathnameUseCase };
