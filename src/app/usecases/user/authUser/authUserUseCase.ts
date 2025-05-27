import { HttpAdapter } from "../../../../infra/adapters/httpAdapter";
import { JwtAdapter } from "../../../../infra/adapters/jwtAdapter";
import { PasswordAdapter } from "../../../../infra/adapters/passwordAdapter";
import { SchemaValidatorAdapter } from "../../../../infra/adapters/schemaValidatorAdapter";
import { authUserSchema } from "../../../../infra/schemas/internal/user";
import { UserRepository } from "../../../repositories/user";

class AuthUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(body: any) {
    const schemaValidator = new SchemaValidatorAdapter(authUserSchema);
    const { email, password } = schemaValidator.validate(body);

    const existsUser = await this.userRepository.findByEmail(email);

    if (!existsUser) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.notFound("User not found");
    }

    const passwordAdapter = new PasswordAdapter();
    await passwordAdapter.verify(existsUser.password, password);

    const tokenAdapter = new JwtAdapter();
    return { ...existsUser, token: await tokenAdapter.sign(existsUser) };
  }
}

export { AuthUserUseCase };
