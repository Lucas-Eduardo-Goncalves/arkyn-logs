import { HttpAdapter } from "../../../../infra/adapters/httpAdapter";
import { SchemaValidatorAdapter } from "../../../../infra/adapters/schemaValidatorAdapter";
import { createUserSchema } from "../../../../infra/schemas/internal/user";
import { User } from "../../../entities/user";
import { UserRepository } from "../../../repositories/user";

class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(body: any) {
    const schemaValidator = new SchemaValidatorAdapter(createUserSchema);
    const { email, name, password, utc } = schemaValidator.validate(body);

    const existsUser = await this.userRepository.findByEmail(email);

    if (existsUser) {
      const httpAdapter = new HttpAdapter();
      return httpAdapter.conflict("User already exists");
    }

    const user = User.create({ email, name, password, utc });
    await this.userRepository.createUser(user);

    return user.toJson();
  }
}

export { CreateUserUseCase };
