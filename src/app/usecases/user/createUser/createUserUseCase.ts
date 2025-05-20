import { SchemaValidatorAdapter } from "../../../../infra/adapters/schemaValidatorAdapter";
import { createUserSchema } from "../../../../infra/schemas/internal/user";
import { User } from "../../../entities/user";
import { UserRepository } from "../../../repositories/user";

class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(body: any) {
    const schemaValidator = new SchemaValidatorAdapter(createUserSchema);
    const validatedBody = schemaValidator.validate(body);

    const user = User.create(validatedBody);
    await this.userRepository.createUser(user);

    return user.toJson();
  }
}

export { CreateUserUseCase };
