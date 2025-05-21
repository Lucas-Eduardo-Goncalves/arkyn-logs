import { ErrorHandlerAdapter } from "../../../../infra/adapters/errorHandlerAdapter";
import { RouteDTO } from "../../../../shared/types/RouteDTO";
import { DeleteLogChannelUseCase } from "./deleteLogChannelUseCase";

class DeleteLogChannelController {
  constructor(private deleteLogChannelUseCase: DeleteLogChannelUseCase) {}

  async handle(route: RouteDTO) {
    try {
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
