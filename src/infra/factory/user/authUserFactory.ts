import { UserRepository } from "../../../repositories/user";
import { AuthUserController } from "./authUserController";
import { AuthUserUseCase } from "./authUserUseCase";

const userRepository = new UserRepository();
const authUserUseCase = new AuthUserUseCase(userRepository);
const authUserController = new AuthUserController(authUserUseCase);

const authUser = {
  handle: authUserController.handle.bind(authUserController),
};

export { authUser };
