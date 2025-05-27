import { ErrorHandlerAdapter } from "../../../../infra/adapters/errorHandlerAdapter";
import { AuthMiddleware } from "../../../../infra/middlewares/authMiddleware";
import { RouteDTO } from "../../../../main/types/RouteDTO";
import { DeleteLogChannelUseCase } from "./deleteLogChannelUseCase";

class DeleteLogChannelController {
  constructor(private deleteLogChannelUseCase: DeleteLogChannelUseCase) {}

  async handle(route: RouteDTO) {
    try {
      await AuthMiddleware.authenticate(route);
      const body = route.request.body;
      const logchannel = await this.deleteLogChannelUseCase.execute(body);
      return route.response.json(logchannel);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { DeleteLogChannelController };
