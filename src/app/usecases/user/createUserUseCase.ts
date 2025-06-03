import { HttpAdapter } from "../../../../infra/adapters/httpAdapter";
import { PasswordAdapter } from "../../../../infra/adapters/passwordAdapter";
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
      throw httpAdapter.conflict("User already exists");
    }

    const passwordAdapter = new PasswordAdapter();
    const hashedPassword = await passwordAdapter.hash(password);

    const user = User.create({ email, name, password: hashedPassword, utc });
    await this.userRepository.createUser(user);

    return user.toJson();
  }
}

export { CreateUserUseCase };
