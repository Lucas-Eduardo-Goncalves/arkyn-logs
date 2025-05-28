import { ErrorHandlerAdapter } from "../../../../infra/adapters/errorHandlerAdapter";
import { UpdateLogErrorUseCase } from "./updateLogErrorUseCase";

class UpdateLogErrorController {
  constructor(private updateLogErrorUseCase: UpdateLogErrorUseCase) {}

  async handle(logErrorId: string) {
    try {
      await this.updateLogErrorUseCase.execute(logErrorId);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { UpdateLogErrorController };
