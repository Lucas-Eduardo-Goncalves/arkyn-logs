import { UserRepository } from "../../../repositories/user";
import { CreateUserController } from "./createUserController";
import { CreateUserUseCase } from "./createUserUseCase";

const userRepository = new UserRepository();
const createUserUseCase = new CreateUserUseCase(userRepository);
const createUserController = new CreateUserController(createUserUseCase);

const createUser = {
  handle: createUserController.handle.bind(createUserController),
};

export { createUser };
