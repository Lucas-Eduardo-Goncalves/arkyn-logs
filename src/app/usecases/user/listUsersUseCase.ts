import { UserRepository } from "../../../repositories/user";

class ListUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute() {
    const users = await this.userRepository.findAll();
    return users.map((user) => user.toJson());
  }
}

export { ListUsersUseCase };
