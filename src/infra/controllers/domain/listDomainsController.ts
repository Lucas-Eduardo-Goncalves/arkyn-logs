import { ListDomainsUseCase } from "../../../app/usecases/domain/listDomainsUseCase";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { HttpAdapter } from "../../adapters/httpAdapter";

class ListDomainsController {
  constructor(private listDomainsUseCase: ListDomainsUseCase) {}

  async handle(route: RouteDTO) {
    try {
      const { userId } = await AuthMiddleware.authenticate(route);
      const trafficSourceId = route.request.params?.trafficSourceId;

      if (!trafficSourceId) {
        const httpAdapter = new HttpAdapter();
        const message = "Traffic source ID is required to list domains.";
        throw httpAdapter.badRequest(message);
      }

      const domains = await this.listDomainsUseCase.execute(
        trafficSourceId,
        userId
      );

      return route.response.json(domains);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { ListDomainsController };
