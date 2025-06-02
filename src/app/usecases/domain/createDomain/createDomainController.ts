import { ErrorHandlerAdapter } from "../../../../infra/adapters/errorHandlerAdapter";
import { AuthMiddleware } from "../../../../infra/middlewares/authMiddleware";
import { RouteDTO } from "../../../../main/types/RouteDTO";
import { CreateDomainUseCase } from "./createDomainUseCase";

class CreateDomainController {
  constructor(private createDomainUseCase: CreateDomainUseCase) {}

  async handle(route: RouteDTO) {
    try {
      await AuthMiddleware.authenticate(route);
      const trafficSourceId = route.request.params?.trafficSourceId;
      const body = { ...route.request.body, trafficSourceId };
      const trafficsource = await this.createDomainUseCase.execute(body);
      return route.response.json(trafficsource, 201);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { CreateDomainController };
