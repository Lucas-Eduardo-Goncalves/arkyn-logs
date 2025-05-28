import { ErrorHandlerAdapter } from "../../../../infra/adapters/errorHandlerAdapter";
import { AuthMiddleware } from "../../../../infra/middlewares/authMiddleware";
import { RouteDTO } from "../../../../main/types/RouteDTO";
import { UpdateLogErrorUseCase } from "./updateLogErrorUseCase";

class UpdateLogErrorController {
  constructor(private updateLogErrorUseCase: UpdateLogErrorUseCase) {}

  async handle(route: RouteDTO, logErrorId: string) {
    try {
      await AuthMiddleware.authenticate(route);
      const logerror = await this.updateLogErrorUseCase.execute(logErrorId);
      return route.response.json(logerror, 201);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { UpdateLogErrorController };
