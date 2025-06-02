import { ErrorHandlerAdapter } from "../../../../infra/adapters/errorHandlerAdapter";
import { AuthMiddleware } from "../../../../infra/middlewares/authMiddleware";
import { RouteDTO } from "../../../../main/types/RouteDTO";
import { ListDomainsUseCase } from "./listDomainsUseCase";

class ListDomainsController {
  constructor(private listDomainsUseCase: ListDomainsUseCase) {}

  async handle(route: RouteDTO) {
    try {
      await AuthMiddleware.authenticate(route);
      const trafficSourceId = route.request.params?.trafficSourceId;
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
