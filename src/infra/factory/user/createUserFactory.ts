import { PrismaUserRepository } from "../../../app/repositories/user";
import { CreateUserUseCase } from "../../../app/usecases/user/createUserUseCase";
import { CreateUserController } from "../../controllers/user/createUserController";

const prismaUserRepository = new PrismaUserRepository();

const createUserUseCase = new CreateUserUseCase(prismaUserRepository);

const createUserController = new CreateUserController(createUserUseCase);

const createUser = {
  handle: createUserController.handle.bind(createUserController),
};

export { createUser };
