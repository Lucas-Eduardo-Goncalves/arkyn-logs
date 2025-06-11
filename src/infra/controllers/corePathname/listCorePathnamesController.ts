import { ListCorePathnamesUseCase } from "../../../app/usecases/corePathname/listCorePathnamesUseCase";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { HttpAdapter } from "../../adapters/httpAdapter";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";

class ListCorePathnamesController {
  constructor(private listCorePathnamesUseCase: ListCorePathnamesUseCase) {}

  async handle(route: RouteDTO) {
    try {
      await AuthMiddleware.authenticate(route);

      const trafficSourceId = route.request.params?.trafficSourceId;

      if (!trafficSourceId) {
        const httpAdapter = new HttpAdapter();
        const message = "Traffic source ID is required to list corePathnames.";
        throw httpAdapter.notFound(message);
      }

      const trafficsources = await this.listCorePathnamesUseCase.execute(
        trafficSourceId
      );

      return route.response.json(trafficsources);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { ListCorePathnamesController };
