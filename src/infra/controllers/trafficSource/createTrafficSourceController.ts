import { ErrorHandlerAdapter } from "../../../../infra/adapters/errorHandlerAdapter";
import { AuthMiddleware } from "../../../../infra/middlewares/authMiddleware";
import { RouteDTO } from "../../../../main/types/RouteDTO";
import { CreateTrafficSourceUseCase } from "./createTrafficSourceUseCase";

class CreateTrafficSourceController {
  constructor(private createTrafficSourceUseCase: CreateTrafficSourceUseCase) {}

  async handle(route: RouteDTO) {
    try {
      const { userId } = await AuthMiddleware.authenticate(route);
      const body = { ...route.request.body, userId };
      const trafficsource = await this.createTrafficSourceUseCase.execute(body);
      return route.response.json(trafficsource, 201);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { CreateTrafficSourceController };
