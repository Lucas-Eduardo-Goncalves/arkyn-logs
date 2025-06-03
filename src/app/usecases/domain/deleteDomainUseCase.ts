import { HttpAdapter } from "../../../infra/adapters/httpAdapter";
import { DomainRepository } from "../../repositories/domain/repository";

class DeleteDomainUseCase {
  constructor(private domainRepository: DomainRepository) {}

  async execute(domainId: string) {
    const domain = await this.domainRepository.findById(domainId);

    if (!domain) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.notFound("Log channel not found");
    }

    await this.domainRepository.deleteDomain(domain.id);
  }
}

export { DeleteDomainUseCase };
