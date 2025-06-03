import { ErrorHandlerAdapter } from "../../../../infra/adapters/errorHandlerAdapter";
import { AuthMiddleware } from "../../../../infra/middlewares/authMiddleware";
import { RouteDTO } from "../../../../main/types/RouteDTO";
import { ListSummaryHttpTrafficsUseCase } from "./listSummaryHttpTrafficsUseCase";

class ListSummaryHttpTrafficsController {
  constructor(
    private listSummaryHttpTrafficsUseCase: ListSummaryHttpTrafficsUseCase
  ) {}

  async handle(route: RouteDTO) {
    try {
      await AuthMiddleware.authenticate(route);
      const trafficSourceId = route.request.params?.trafficSourceId;
      const trafficsources = await this.listSummaryHttpTrafficsUseCase.execute(
        trafficSourceId
      );
      return route.response.json(trafficsources);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { ListSummaryHttpTrafficsController };
