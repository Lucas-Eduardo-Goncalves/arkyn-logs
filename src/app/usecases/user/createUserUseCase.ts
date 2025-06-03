import { HttpAdapter } from "../../../infra/adapters/httpAdapter";
import { PasswordAdapter } from "../../../infra/adapters/passwordAdapter";
import { User } from "../../entities/user";
import { UserRepository } from "../../repositories/user/repository";

type InputProps = {
  email: string;
  name: string;
  password: string;
  utc: number;
};

class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(input: InputProps) {
    const { email, name, password, utc } = input;

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
