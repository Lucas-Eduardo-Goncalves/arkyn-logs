import { ErrorHandlerAdapter } from "../../../../infra/adapters/errorHandlerAdapter";
import { AuthMiddleware } from "../../../../infra/middlewares/authMiddleware";
import { RouteDTO } from "../../../../main/types/RouteDTO";
import { CreatePathnameUseCase } from "./createPathnameUseCase";

class CreatePathnameController {
  constructor(private createPathnameUseCase: CreatePathnameUseCase) {}

  async handle(route: RouteDTO) {
    try {
      await AuthMiddleware.authenticate(route);

      const trafficSourceId = route.request.params?.trafficSourceId;
      const domainId = route.request.params?.domainId;
      const body = route.request.body;

      const trafficsource = await this.createPathnameUseCase.execute({
        ...body,
        trafficSourceId,
        domainId,
      });

      return route.response.json(trafficsource, 201);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { CreatePathnameController };
