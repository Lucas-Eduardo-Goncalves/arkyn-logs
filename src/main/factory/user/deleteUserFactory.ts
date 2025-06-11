import { PrismaUserRepository } from "../../../infra/data/repositories/user";
import { DeleteUserUseCase } from "../../../app/usecases/user/deleteUserUseCase";
import { DeleteUserController } from "../../../infra/controllers/user/deleteUserController";

const prismaUserRepository = new PrismaUserRepository();

const deleteUserUseCase = new DeleteUserUseCase(prismaUserRepository);

const deleteUserController = new DeleteUserController(deleteUserUseCase);

const deleteUser = {
  handle: deleteUserController.handle.bind(deleteUserController),
};

export { deleteUser };
