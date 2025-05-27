import { ErrorHandlerAdapter } from "../../../../infra/adapters/errorHandlerAdapter";
import { HttpAdapter } from "../../../../infra/adapters/httpAdapter";
import { AuthMiddleware } from "../../../../infra/middlewares/authMiddleware";
import { RouteDTO } from "../../../../main/types/RouteDTO";
import { ListLogErrorsUseCase } from "./listLogErrorsUseCase";

class ListLogErrorsController {
  constructor(private listLogErrorsUseCase: ListLogErrorsUseCase) {}

  async handle(route: RouteDTO) {
    try {
      await AuthMiddleware.authenticate(route);
      const logChannelId = route.request?.params?.logChannelId;

      if (!logChannelId) {
        const httpAdapter = new HttpAdapter();
        throw httpAdapter.badRequest("Log channel ID is required");
      }

      const logErrors = await this.listLogErrorsUseCase.execute(logChannelId);
      return route.response.json(logErrors);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { ListLogErrorsController };
