import { ErrorHandlerAdapter } from "../../../../infra/adapters/errorHandlerAdapter";
import { AuthMiddleware } from "../../../../infra/middlewares/authMiddleware";
import { RouteDTO } from "../../../../main/types/RouteDTO";
import { DeleteTrafficSourceUseCase } from "./deleteTrafficSourceUseCase";

class DeleteTrafficSourceController {
  constructor(private deleteTrafficSourceUseCase: DeleteTrafficSourceUseCase) {}

  async handle(route: RouteDTO) {
    try {
      await AuthMiddleware.authenticate(route);
      const body = route.request.body;
      const trafficsource = await this.deleteTrafficSourceUseCase.execute(body);
      return route.response.json(trafficsource);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { DeleteTrafficSourceController };
