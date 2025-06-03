import { ErrorHandlerAdapter } from "../../../../infra/adapters/errorHandlerAdapter";
import { AuthMiddleware } from "../../../../infra/middlewares/authMiddleware";
import { RouteDTO } from "../../../../main/types/RouteDTO";
import { ListHttpTrafficRecordsUseCase } from "./listHttpTrafficRecordsUseCase";

class ListHttpTrafficRecordsController {
  constructor(
    private listHttpTrafficRecordsUseCase: ListHttpTrafficRecordsUseCase
  ) {}

  async handle(route: RouteDTO) {
    try {
      await AuthMiddleware.authenticate(route);
      const trafficSourceId = route.request.params?.trafficSourceId;
      const trafficsources = await this.listHttpTrafficRecordsUseCase.execute(
        trafficSourceId
      );
      return route.response.json(trafficsources);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { ListHttpTrafficRecordsController };
