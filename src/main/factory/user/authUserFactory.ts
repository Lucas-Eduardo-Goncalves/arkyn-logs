import { PrismaUserRepository } from "../../../infra/data/repositories/user";
import { AuthUserUseCase } from "../../../app/useCases/user/authUserUseCase";
import { AuthUserController } from "../../../infra/controllers/user/authUserController";

const prismaUserRepository = new PrismaUserRepository();

const authUserUseCase = new AuthUserUseCase(prismaUserRepository);

const authUserController = new AuthUserController(authUserUseCase);

const authUser = {
  handle: authUserController.handle.bind(authUserController),
};

export { authUser };
