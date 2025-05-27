import { ErrorHandlerAdapter } from "../../../../infra/adapters/errorHandlerAdapter";
import { AuthMiddleware } from "../../../../infra/middlewares/authMiddleware";
import { RouteDTO } from "../../../../main/types/RouteDTO";
import { UpdateLogChannelUseCase } from "./updateLogChannelUseCase";

class UpdateLogChannelController {
  constructor(private updateLogChannelUseCase: UpdateLogChannelUseCase) {}

  async handle(route: RouteDTO) {
    try {
      await AuthMiddleware.authenticate(route);
      const body = route.request.body;
      const logchannel = await this.updateLogChannelUseCase.execute(body);
      return route.response.json(logchannel, 201);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { UpdateLogChannelController };
