import { UserRepository } from "../../../repositories/user";
import { ListUsersController } from "./listUsersController";
import { ListUsersUseCase } from "./listUsersUseCase";

const userRepository = new UserRepository();
const listUsersUseCase = new ListUsersUseCase(userRepository);
const listUsersController = new ListUsersController(listUsersUseCase);

const listUsers = {
  handle: listUsersController.handle.bind(listUsersController),
};

export { listUsers };
