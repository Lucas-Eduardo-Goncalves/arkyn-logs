import { DeleteDomainUseCase } from "../../../app/usecases/domain/deleteDomainUseCase";
import { RouteDTO } from "../../../main/types/RouteDTO";
import { ErrorHandlerAdapter } from "../../adapters/errorHandlerAdapter";
import { HttpAdapter } from "../../adapters/httpAdapter";
import { AuthMiddleware } from "../../../main/middlewares/authMiddleware";

class DeleteDomainController {
  constructor(private deleteDomainUseCase: DeleteDomainUseCase) {}

  async handle(route: RouteDTO) {
    try {
      await AuthMiddleware.authenticate(route);
      const domainId = route.request.params?.domainId;

      if (!domainId) {
        const httpAdapter = new HttpAdapter();
        throw httpAdapter.badRequest("Domain ID is required");
      }

      const trafficsource = await this.deleteDomainUseCase.execute(domainId);
      return route.response.json(trafficsource);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { DeleteDomainController };
