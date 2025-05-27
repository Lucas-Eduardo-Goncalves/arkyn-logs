import { ErrorHandlerAdapter } from "../../../../infra/adapters/errorHandlerAdapter";
import { AuthMiddleware } from "../../../../infra/middlewares/authMiddleware";
import { RouteDTO } from "../../../../main/types/RouteDTO";
import { AuthUserUseCase } from "./authUserUseCase";

class AuthUserController {
  constructor(private authUserUseCase: AuthUserUseCase) {}

  async handle(route: RouteDTO) {
    try {
      const body = route.request.body;
      const user = await this.authUserUseCase.execute(body);
      return route.response.json(user, 201);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { AuthUserController };
