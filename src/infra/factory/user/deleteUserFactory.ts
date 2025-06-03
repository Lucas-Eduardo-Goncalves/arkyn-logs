import { PrismaUserRepository } from "../../../app/repositories/user";
import { DeleteUserUseCase } from "../../../app/usecases/user/deleteUserUseCase";
import { DeleteUserController } from "../../controllers/user/deleteUserController";

const prismaUserRepository = new PrismaUserRepository();

const deleteUserUseCase = new DeleteUserUseCase(prismaUserRepository);

const deleteUserController = new DeleteUserController(deleteUserUseCase);

const deleteUser = {
  handle: deleteUserController.handle.bind(deleteUserController),
};

export { deleteUser };
