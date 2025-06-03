import { ErrorHandlerAdapter } from "../../../../infra/adapters/errorHandlerAdapter";
import { AuthMiddleware } from "../../../../infra/middlewares/authMiddleware";
import { RouteDTO } from "../../../../main/types/RouteDTO";
import { ListPathnamesUseCase } from "./listPathnamesUseCase";

class ListPathnamesController {
  constructor(private listPathnamesUseCase: ListPathnamesUseCase) {}

  async handle(route: RouteDTO) {
    try {
      await AuthMiddleware.authenticate(route);

      const trafficSourceId = route.request.params?.trafficSourceId;
      const domainId = route.request.params?.domainId;

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
