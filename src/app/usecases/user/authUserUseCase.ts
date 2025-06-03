import { HttpAdapter } from "../../../infra/adapters/httpAdapter";
import { JwtAdapter } from "../../../infra/adapters/jwtAdapter";
import { PasswordAdapter } from "../../../infra/adapters/passwordAdapter";
import { UserRepository } from "../../repositories/user/repository";

type InputProps = {
  email: string;
  password: string;
};

class AuthUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(input: InputProps) {
    const { email, password } = input;

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
