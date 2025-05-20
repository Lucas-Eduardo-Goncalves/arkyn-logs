import { ErrorHandlerAdapter } from "../../../../infra/adapters/errorHandlerAdapter";
import { RouteDTO } from "../../../../shared/types/RouteDTO";
import { ListUsersUseCase } from "./listUsersUseCase";

class ListUsersController {
  constructor(private listUsersUseCase: ListUsersUseCase) {}

  async handle(route: RouteDTO) {
    try {
      const users = await this.listUsersUseCase.execute();
      return route.response.json(users);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { ListUsersController };
