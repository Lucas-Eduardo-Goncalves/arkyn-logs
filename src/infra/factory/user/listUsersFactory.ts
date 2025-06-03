import { PrismaUserRepository } from "../../../app/repositories/user";
import { ListUsersUseCase } from "../../../app/usecases/user/listUsersUseCase";
import { ListUsersController } from "../../controllers/user/listUsersController";

const prismaUserRepository = new PrismaUserRepository();

const listUsersUseCase = new ListUsersUseCase(prismaUserRepository);

const listUsersController = new ListUsersController(listUsersUseCase);

const listUsers = {
  handle: listUsersController.handle.bind(listUsersController),
};

export { listUsers };
