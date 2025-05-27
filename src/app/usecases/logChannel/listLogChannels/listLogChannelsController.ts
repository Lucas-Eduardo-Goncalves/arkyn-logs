import { ErrorHandlerAdapter } from "../../../../infra/adapters/errorHandlerAdapter";
import { RouteDTO } from "../../../../main/types/RouteDTO";
import { ListLogChannelsUseCase } from "./listLogChannelsUseCase";

class ListLogChannelsController {
  constructor(private listLogChannelsUseCase: ListLogChannelsUseCase) {}

  async handle(route: RouteDTO) {
    try {
      const logChannels = await this.listLogChannelsUseCase.execute();
      return route.response.json(logChannels);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { ListLogChannelsController };
