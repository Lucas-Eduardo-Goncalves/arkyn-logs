import { HttpAdapter } from "../../../infra/adapters/httpAdapter";
import { PathnameRepository } from "../../repositories/pathname/repository";

class DeletePathnameUseCase {
  constructor(private pathnameRepository: PathnameRepository) {}

  async execute(id: string) {
    const pathname = await this.pathnameRepository.findById(id);

    if (!pathname) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.notFound("Log channel not found");
    }

    await this.pathnameRepository.deletePathname(pathname.id);
  }
}

export { DeletePathnameUseCase };
