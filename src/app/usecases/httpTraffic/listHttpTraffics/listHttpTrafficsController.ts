import { ErrorHandlerAdapter } from "../../../../infra/adapters/errorHandlerAdapter";
import { AuthMiddleware } from "../../../../infra/middlewares/authMiddleware";
import { RouteDTO } from "../../../../main/types/RouteDTO";
import { ListHttpTrafficsUseCase } from "./listHttpTrafficsUseCase";

class ListHttpTrafficsController {
  constructor(private listHttpTrafficsUseCase: ListHttpTrafficsUseCase) {}

  async handle(route: RouteDTO) {
    try {
      await AuthMiddleware.authenticate(route);
      const trafficSourceId = route.request.params?.trafficSourceId;
      const trafficsources = await this.listHttpTrafficsUseCase.execute(
        trafficSourceId
      );
      return route.response.json(trafficsources);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { ListHttpTrafficsController };
