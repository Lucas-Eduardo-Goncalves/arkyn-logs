import { ErrorHandlerAdapter } from "../../../../infra/adapters/errorHandlerAdapter";
import { AuthMiddleware } from "../../../../infra/middlewares/authMiddleware";
import { RouteDTO } from "../../../../main/types/RouteDTO";
import { DeleteLogErrorUseCase } from "./deleteLogErrorUseCase";

class DeleteLogErrorController {
  constructor(private deleteLogErrorUseCase: DeleteLogErrorUseCase) {}

  async handle(route: RouteDTO) {
    try {
      await AuthMiddleware.authenticate(route);
      const body = route.request.body;
      const logerror = await this.deleteLogErrorUseCase.execute(body);
      return route.response.json(logerror);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { DeleteLogErrorController };
