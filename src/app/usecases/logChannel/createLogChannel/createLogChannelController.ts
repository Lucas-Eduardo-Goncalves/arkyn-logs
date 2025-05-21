import { ErrorHandlerAdapter } from "../../../../infra/adapters/errorHandlerAdapter";
import { RouteDTO } from "../../../../shared/types/RouteDTO";
import { CreateLogChannelUseCase } from "./createLogChannelUseCase";

class CreateLogChannelController {
  constructor(private createLogChannelUseCase: CreateLogChannelUseCase) {}

  async handle(route: RouteDTO) {
    try {
      const body = route.request.body;
      const logchannel = await this.createLogChannelUseCase.execute(body);
      return route.response.json(logchannel, 201);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { CreateLogChannelController };
