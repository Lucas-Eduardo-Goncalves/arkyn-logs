import { ErrorHandlerAdapter } from "../../../../infra/adapters/errorHandlerAdapter";
import { RouteDTO } from "../../../../shared/types/RouteDTO";
import { DeleteUserUseCase } from "./deleteUserUseCase";

class DeleteUserController {
  constructor(private deleteUserUseCase: DeleteUserUseCase) {}

  async handle(route: RouteDTO) {
    try {
      const user = await this.deleteUserUseCase.execute(route.request.body);
      return route.response.json(user);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { DeleteUserController };
