import { ErrorHandlerAdapter } from "../../../../infra/adapters/errorHandlerAdapter";
import { AuthMiddleware } from "../../../../infra/middlewares/authMiddleware";
import { RouteDTO } from "../../../../main/types/RouteDTO";
import { DeleteDomainUseCase } from "./deleteDomainUseCase";

class DeleteDomainController {
  constructor(private deleteDomainUseCase: DeleteDomainUseCase) {}

  async handle(route: RouteDTO) {
    try {
      await AuthMiddleware.authenticate(route);
      const body = route.request.body;
      const trafficsource = await this.deleteDomainUseCase.execute(body);
      return route.response.json(trafficsource);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { DeleteDomainController };
