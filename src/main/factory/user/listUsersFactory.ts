import { PrismaUserRepository } from "../../../infra/data/repositories/user";
import { ListUsersUseCase } from "../../../app/usecases/user/listUsersUseCase";
import { ListUsersController } from "../../../infra/controllers/user/listUsersController";

const prismaUserRepository = new PrismaUserRepository();

const listUsersUseCase = new ListUsersUseCase(prismaUserRepository);

const listUsersController = new ListUsersController(listUsersUseCase);

const listUsers = {
  handle: listUsersController.handle.bind(listUsersController),
};

export { listUsers };
