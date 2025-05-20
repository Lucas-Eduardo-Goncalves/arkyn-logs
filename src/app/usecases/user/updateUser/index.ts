import { UserRepository } from "../../../repositories/user";
import { UpdateUserController } from "./updateUserController";
import { UpdateUserUseCase } from "./updateUserUseCase";

const userRepository = new UserRepository();
const updateUserUseCase = new UpdateUserUseCase(userRepository);
const updateUserController = new UpdateUserController(updateUserUseCase);

const updateUser = {
  handle: updateUserController.handle.bind(updateUserController),
};

export { updateUser };
