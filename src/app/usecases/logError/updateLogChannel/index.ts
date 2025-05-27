import { LogErrorRepository } from "../../../repositories/logError";
import { UpdateLogErrorController } from "./updateLogErrorController";
import { UpdateLogErrorUseCase } from "./updateLogErrorUseCase";

const logErrorRepository = new LogErrorRepository();

const updateLogErrorUseCase = new UpdateLogErrorUseCase(logErrorRepository);

const updateLogErrorController = new UpdateLogErrorController(
  updateLogErrorUseCase
);

const updateLogError = {
  handle: updateLogErrorController.handle.bind(updateLogErrorController),
};

export { updateLogError };
