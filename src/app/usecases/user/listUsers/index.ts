import { UserRepository } from "../../../repositories/user";
import { ListUsersController } from "./listUsersController";
import { ListUsersUseCase } from "./listUsersUseCase";

const userRepository = new UserRepository();
const listUsersUseCase = new ListUsersUseCase(userRepository);
const listUsersControler = new ListUsersController(listUsersUseCase);

const listUsers = listUsersControler;
export { listUsers };
