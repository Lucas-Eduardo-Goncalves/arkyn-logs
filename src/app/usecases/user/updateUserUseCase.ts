import { HttpAdapter } from "../../../../infra/adapters/httpAdapter";
import { SchemaValidatorAdapter } from "../../../../infra/adapters/schemaValidatorAdapter";
import { updateUserSchema } from "../../../../infra/schemas/internal/user";
import { UserRepository } from "../../../repositories/user";

class UpdateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(body: any) {
    const schemaValidator = new SchemaValidatorAdapter(updateUserSchema);
    const validatedBody = schemaValidator.validate(body);

    const user = await this.userRepository.findById(validatedBody.id);

    if (!user) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.notFound("User not found");
    }

    user.update(validatedBody);
    await this.userRepository.updateUser(user);

    return user.toJson();
  }
}

export { UpdateUserUseCase };
