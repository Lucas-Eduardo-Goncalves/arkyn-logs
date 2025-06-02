import { HttpAdapter } from "../../../../infra/adapters/httpAdapter";
import { SchemaValidatorAdapter } from "../../../../infra/adapters/schemaValidatorAdapter";
import { deleteDomainSchema } from "../../../../infra/schemas/internal/domain";
import { DomainRepository } from "../../../repositories/domain";

class DeleteDomainUseCase {
  constructor(private domainRepository: DomainRepository) {}

  async execute(body: any) {
    const schemaValidator = new SchemaValidatorAdapter(deleteDomainSchema);
    const validatedBody = schemaValidator.validate(body);

    const domain = await this.domainRepository.findById(validatedBody.id);

    if (!domain) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.notFound("Log channel not found");
    }

    await this.domainRepository.deleteDomain(domain.id);
  }
}

export { DeleteDomainUseCase };
