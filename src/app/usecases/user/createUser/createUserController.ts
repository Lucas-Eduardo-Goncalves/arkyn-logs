import { ErrorHandlerAdapter } from "../../../../infra/adapters/errorHandlerAdapter";
import { RouteDTO } from "../../../../shared/types/RouteDTO";
import { CreateUserUseCase } from "./createUserUseCase";

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(route: RouteDTO) {
    try {
      const body = route.request.body;
      const user = await this.createUserUseCase.execute(body);
      return route.response.json(user, 201);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { CreateUserController };
