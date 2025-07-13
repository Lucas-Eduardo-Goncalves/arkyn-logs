import { HttpAdapter } from "../../../infra/adapters/httpAdapter";
import { UserRepository } from "../../../domain/repositories/user";

type InputProps = {
  name?: string;
  utc?: number;
  userId: string;
};

class UpdateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(input: InputProps) {
    const { name, utc, userId } = input;

    const user = await this.userRepository.findById(userId);

    if (!user) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.notFound("User not found");
    }

    if (user.id !== userId) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.unauthorized("You do not own this user");
    }

    user.update({ name, utc });

    await this.userRepository.updateUser(user);

    return user.toJson();
  }
}

export { UpdateUserUseCase };
