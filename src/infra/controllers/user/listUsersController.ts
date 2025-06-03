import { ListUsersUseCase } from "../../../app/usecases/user/listUsersUseCase";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { AuthMiddleware } from "../../middlewares/authMiddleware";

class ListUsersController {
  constructor(private listUsersUseCase: ListUsersUseCase) {}

  async handle(route: RouteDTO) {
    try {
      await AuthMiddleware.authenticate(route);
      const users = await this.listUsersUseCase.execute();
      return route.response.json(users);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { ListUsersController };
