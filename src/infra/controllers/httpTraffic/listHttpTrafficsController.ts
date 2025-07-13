import { ListHttpTrafficsUseCase } from "../../../app/useCases/httpTraffic/listHttpTrafficsUseCase";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { HttpAdapter } from "../../adapters/httpAdapter";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";

class ListHttpTrafficsController {
  constructor(private listHttpTrafficsUseCase: ListHttpTrafficsUseCase) {}

  async handle(route: RouteDTO) {
    try {
      const { userId } = await AuthMiddleware.authenticate(route);
      const trafficSourceId = route.request.params?.trafficSourceId;

      if (!trafficSourceId) {
        const httpAdapter = new HttpAdapter();
        const message = "Traffic source ID is required to list httpTraffics.";
        throw httpAdapter.notFound(message);
      }

      const httpTraffics = await this.listHttpTrafficsUseCase.execute(
        trafficSourceId,
        userId
      );

      return route.response.json(httpTraffics);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { ListHttpTrafficsController };
