import { UserRepository } from "../../../repositories/user";
import { DeleteUserController } from "./deleteUserController";
import { DeleteUserUseCase } from "./deleteUserUseCase";

const userRepository = new UserRepository();
const deleteUserUseCase = new DeleteUserUseCase(userRepository);
const deleteUserController = new DeleteUserController(deleteUserUseCase);

const deleteUser = {
  handle: deleteUserController.handle.bind(deleteUserController),
};

export { deleteUser };
