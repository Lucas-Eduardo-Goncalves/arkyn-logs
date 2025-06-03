import { HttpAdapter } from "../../../../infra/adapters/httpAdapter";
import { SchemaValidatorAdapter } from "../../../../infra/adapters/schemaValidatorAdapter";
import { deletePathnameSchema } from "../../../../infra/schemas/internal/pathname";
import { PathnameRepository } from "../../../repositories/pathname";

class DeletePathnameUseCase {
  constructor(private pathnameRepository: PathnameRepository) {}

  async execute(body: any) {
    const schemaValidator = new SchemaValidatorAdapter(deletePathnameSchema);
    const validatedBody = schemaValidator.validate(body);

    const pathname = await this.pathnameRepository.findById(validatedBody.id);

    if (!pathname) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.notFound("Log channel not found");
    }

    await this.pathnameRepository.deletePathname(pathname.id);
  }
}

export { DeletePathnameUseCase };
