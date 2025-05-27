import { ErrorHandlerAdapter } from "../../../../infra/adapters/errorHandlerAdapter";
import { HttpAdapter } from "../../../../infra/adapters/httpAdapter";
import { AuthMiddleware } from "../../../../infra/middlewares/authMiddleware";
import { RouteDTO } from "../../../../main/types/RouteDTO";
import { CreateLogErrorUseCase } from "./createLogErrorUseCase";

class CreateLogErrorController {
  constructor(private createLogErrorUseCase: CreateLogErrorUseCase) {}

  async handle(route: RouteDTO) {
    try {
      await AuthMiddleware.authenticate(route);
      const logChannelId = route.request?.params?.logChannelId;

      if (!logChannelId) {
        const httpAdapter = new HttpAdapter();
        throw httpAdapter.badRequest("Log channel ID is required");
      }

      const body = { ...route.request.body, logChannelId };
      const logError = await this.createLogErrorUseCase.execute(body);
      return route.response.json(logError, 201);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { CreateLogErrorController };
