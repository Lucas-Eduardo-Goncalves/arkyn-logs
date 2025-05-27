import { ErrorHandlerAdapter } from "../../../../infra/adapters/errorHandlerAdapter";
import { AuthMiddleware } from "../../../../infra/middlewares/authMiddleware";
import { RouteDTO } from "../../../../main/types/RouteDTO";
import { CreateLogChannelUseCase } from "./createLogChannelUseCase";

class CreateLogChannelController {
  constructor(private createLogChannelUseCase: CreateLogChannelUseCase) {}

  async handle(route: RouteDTO) {
    try {
      const { userId } = await AuthMiddleware.authenticate(route);
      const body = { ...route.request.body, userId };
      const logchannel = await this.createLogChannelUseCase.execute(body);
      return route.response.json(logchannel, 201);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { CreateLogChannelController };
