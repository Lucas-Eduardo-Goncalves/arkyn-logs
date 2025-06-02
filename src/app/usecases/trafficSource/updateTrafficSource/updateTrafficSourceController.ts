import { ErrorHandlerAdapter } from "../../../../infra/adapters/errorHandlerAdapter";
import { AuthMiddleware } from "../../../../infra/middlewares/authMiddleware";
import { RouteDTO } from "../../../../main/types/RouteDTO";
import { UpdateTrafficSourceUseCase } from "./updateTrafficSourceUseCase";

class UpdateTrafficSourceController {
  constructor(private updateTrafficSourceUseCase: UpdateTrafficSourceUseCase) {}

  async handle(route: RouteDTO) {
    try {
      await AuthMiddleware.authenticate(route);
      const body = route.request.body;
      const trafficsource = await this.updateTrafficSourceUseCase.execute(body);
      return route.response.json(trafficsource, 201);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { UpdateTrafficSourceController };
