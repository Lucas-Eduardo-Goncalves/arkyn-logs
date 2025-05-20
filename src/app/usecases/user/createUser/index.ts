import { UserRepository } from "../../../repositories/user";
import { CreateUserController } from "./createUserController";
import { CreateUserUseCase } from "./createUserUseCase";

const userRepository = new UserRepository();
const createUserUseCase = new CreateUserUseCase(userRepository);
const createUserControler = new CreateUserController(createUserUseCase);

const createUser = createUserControler;
export { createUser };
