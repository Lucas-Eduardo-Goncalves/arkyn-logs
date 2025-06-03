import { ListPathnamesUseCase } from "../../../app/usecases/pathname/listPathnamesUseCase";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { HttpAdapter } from "../../adapters/httpAdapter";
import { AuthMiddleware } from "../../middlewares/authMiddleware";

class ListPathnamesController {
  constructor(private listPathnamesUseCase: ListPathnamesUseCase) {}

  async handle(route: RouteDTO) {
    try {
      await AuthMiddleware.authenticate(route);

      const trafficSourceId = route.request.params?.trafficSourceId;
      const domainId = route.request.params?.domainId;

      if (!trafficSourceId) {
        const httpAdapter = new HttpAdapter();
        const message = "Traffic source ID is required to list pathnames.";
        throw httpAdapter.notFound(message);
      }

      if (!domainId) {
        const httpAdapter = new HttpAdapter();
        const message = "Domain ID is required to list pathnames.";
        throw httpAdapter.notFound(message);
      }

      const trafficsources = await this.listPathnamesUseCase.execute(
        trafficSourceId,
        domainId
      );

      return route.response.json(trafficsources);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { ListPathnamesController };
