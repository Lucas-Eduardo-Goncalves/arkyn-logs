import { ErrorHandlerAdapter } from "../../../../infra/adapters/errorHandlerAdapter";
import { AuthMiddleware } from "../../../../infra/middlewares/authMiddleware";
import { RouteDTO } from "../../../../main/types/RouteDTO";
import { ListLogChannelsUseCase } from "./listLogChannelsUseCase";

class ListLogChannelsController {
  constructor(private listLogChannelsUseCase: ListLogChannelsUseCase) {}

  async handle(route: RouteDTO) {
    try {
      const { userId } = await AuthMiddleware.authenticate(route);
      const logChannels = await this.listLogChannelsUseCase.execute(userId);
      return route.response.json(logChannels);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { ListLogChannelsController };
