import { ListHttpTrafficsUseCase } from "../../../app/usecases/httpTraffic/listHttpTrafficsUseCase";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { HttpAdapter } from "../../adapters/httpAdapter";
import { AuthMiddleware } from "../../middlewares/authMiddleware";

class ListHttpTrafficsController {
  constructor(private listHttpTrafficsUseCase: ListHttpTrafficsUseCase) {}

  async handle(route: RouteDTO) {
    try {
      await AuthMiddleware.authenticate(route);
      const trafficSourceId = route.request.params?.trafficSourceId;

      if (!trafficSourceId) {
        const httpAdapter = new HttpAdapter();
        const message = "Traffic source ID is required to list httpTraffics.";
        throw httpAdapter.notFound(message);
      }

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
