import { Context } from "hono";
import { ErrorHandlerAdapter } from "../../../../infra/adapters/errorHandlerAdapter";
import { ListUsersUseCase } from "./listUsersUseCase";

class ListUsersController {
  constructor(private listUsersUseCase: ListUsersUseCase) {}

  async handle(context: Context) {
    try {
      const users = await this.listUsersUseCase.execute();
      return context.json(users);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { ListUsersController };
