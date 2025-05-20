import { HttpAdapter } from "../../../../infra/adapters/httpAdapter";
import { SchemaValidatorAdapter } from "../../../../infra/adapters/schemaValidatorAdapter";
import { deleteUserSchema } from "../../../../infra/schemas/internal/user";
import { UserRepository } from "../../../repositories/user";

class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(body: any) {
    const schemaValidator = new SchemaValidatorAdapter(deleteUserSchema);
    const validatedBody = schemaValidator.validate(body);

    const user = await this.userRepository.findById(validatedBody.id);

    if (!user) {
      const httpAdapter = new HttpAdapter();
      return httpAdapter.notFound("User not found");
    }

    await this.userRepository.deleteUser(user.id);
  }
}

export { DeleteUserUseCase };
