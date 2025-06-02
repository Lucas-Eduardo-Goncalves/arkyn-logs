import { ErrorHandlerAdapter } from "../../../../infra/adapters/errorHandlerAdapter";
import { AuthMiddleware } from "../../../../infra/middlewares/authMiddleware";
import { RouteDTO } from "../../../../main/types/RouteDTO";
import { DeleteDomainUseCase } from "./deleteDomainUseCase";

class DeleteDomainController {
  constructor(private deleteDomainUseCase: DeleteDomainUseCase) {}

  async handle(route: RouteDTO) {
    try {
      await AuthMiddleware.authenticate(route);
      const domainId = route.request.params?.domainId;

      const trafficsource = await this.deleteDomainUseCase.execute({
        domainId,
      });

      return route.response.json(trafficsource);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { DeleteDomainController };
