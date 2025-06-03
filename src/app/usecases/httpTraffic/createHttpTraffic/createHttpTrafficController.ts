import { ErrorHandlerAdapter } from "../../../../infra/adapters/errorHandlerAdapter";
import { AuthMiddleware } from "../../../../infra/middlewares/authMiddleware";
import { RouteDTO } from "../../../../main/types/RouteDTO";
import { CreateHttpTrafficUseCase } from "./createHttpTrafficUseCase";

class CreateHttpTrafficController {
  constructor(private createHttpTrafficUseCase: CreateHttpTrafficUseCase) {}

  async handle(route: RouteDTO) {
    try {
      await AuthMiddleware.authenticate(route);
      const trafficSourceId = route.request.params?.trafficSourceId;
      const body = { ...route.request.body, trafficSourceId };
      const trafficsource = await this.createHttpTrafficUseCase.execute(body);
      return route.response.json(trafficsource, 201);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { CreateHttpTrafficController };
