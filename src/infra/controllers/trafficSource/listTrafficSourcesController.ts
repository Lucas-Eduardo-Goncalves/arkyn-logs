import { ListTrafficSourcesUseCase } from "../../../app/useCases/trafficSource/listTrafficSourcesUseCase";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";

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
