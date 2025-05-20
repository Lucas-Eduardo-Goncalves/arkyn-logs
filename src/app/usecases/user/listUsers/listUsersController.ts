import { Context } from "hono";
import { ListUsersUseCase } from "./listUsersUseCase";

class ListUsersController {
  constructor(private listUsersUseCase: ListUsersUseCase) {}

  async handle(context: Context) {
    const users = await this.listUsersUseCase.execute();
    return context.json(users);
  }
}

export { ListUsersController };
