import { ErrorHandlerAdapter } from "../../../../infra/adapters/errorHandlerAdapter";
import { CreateLogErrorUseCase } from "./createLogErrorUseCase";

class CreateLogErrorController {
  constructor(private createLogErrorUseCase: CreateLogErrorUseCase) {}

  async handle(logChannelId: string, message: string, metadata: any) {
    try {
      await this.createLogErrorUseCase.execute(logChannelId, message, metadata);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { CreateLogErrorController };
