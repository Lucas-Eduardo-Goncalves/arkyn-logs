import { ListCoreLogsUseCase } from "../../../app/usecases/coreLog/listCoreLogsUseCase";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { HttpAdapter } from "../../adapters/httpAdapter";

class ListCoreLogsController {
  constructor(private listCoreLogsUseCase: ListCoreLogsUseCase) {}

  async handle(route: RouteDTO) {
    try {
      await AuthMiddleware.authenticate(route);

      const trafficSourceId = route.request.params?.trafficSourceId;

      if (!trafficSourceId) {
        const httpAdapter = new HttpAdapter();
        const message = "Traffic source ID is required to list coreLogs.";
        throw httpAdapter.notFound(message);
      }

      const trafficsources = await this.listCoreLogsUseCase.execute(
        trafficSourceId
      );

      return route.response.json(trafficsources);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { ListCoreLogsController };
