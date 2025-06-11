import { PrismaUserRepository } from "../../../infra/data/repositories/user";
import { UpdateUserUseCase } from "../../../app/usecases/user/updateUserUseCase";
import { UpdateUserController } from "../../../infra/controllers/user/updateUserController";

const prismaUserRepository = new PrismaUserRepository();

const updateUserUseCase = new UpdateUserUseCase(prismaUserRepository);

const updateUserController = new UpdateUserController(updateUserUseCase);

const updateUser = {
  handle: updateUserController.handle.bind(updateUserController),
};

export { updateUser };
