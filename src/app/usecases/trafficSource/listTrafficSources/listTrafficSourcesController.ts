import { ErrorHandlerAdapter } from "../../../../infra/adapters/errorHandlerAdapter";
import { AuthMiddleware } from "../../../../infra/middlewares/authMiddleware";
import { RouteDTO } from "../../../../main/types/RouteDTO";
import { ListTrafficSourcesUseCase } from "./listTrafficSourcesUseCase";

class ListTrafficSourcesController {
  constructor(private listTrafficSourcesUseCase: ListTrafficSourcesUseCase) {}

  async handle(route: RouteDTO) {
    try {
      const { userId } = await AuthMiddleware.authenticate(route);
      const trafficsources = await this.listTrafficSourcesUseCase.execute(
        userId
      );
      return route.response.json(trafficsources);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { ListTrafficSourcesController };
