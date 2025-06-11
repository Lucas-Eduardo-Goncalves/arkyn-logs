import { ListDomainsUseCase } from "../../../app/usecases/domain/listDomainsUseCase";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { HttpAdapter } from "../../adapters/httpAdapter";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";

class ListDomainsController {
  constructor(private listDomainsUseCase: ListDomainsUseCase) {}

  async handle(route: RouteDTO) {
    try {
      await AuthMiddleware.authenticate(route);
      const trafficSourceId = route.request.params?.trafficSourceId;

      if (!trafficSourceId) {
        const httpAdapter = new HttpAdapter();
        const message = "Traffic source ID is required to list domains.";
        throw httpAdapter.notFound(message);
      }

      const trafficsources = await this.listDomainsUseCase.execute(
        trafficSourceId
      );

      return route.response.json(trafficsources);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { ListDomainsController };
