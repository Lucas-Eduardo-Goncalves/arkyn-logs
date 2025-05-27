import { LogErrorRepository } from "../../../repositories/logError";
import { DeleteLogErrorController } from "./deleteLogErrorController";
import { DeleteLogErrorUseCase } from "./deleteLogErrorUseCase";

const logErrorRepository = new LogErrorRepository();

const deleteLogErrorUseCase = new DeleteLogErrorUseCase(logErrorRepository);

const deleteLogErrorController = new DeleteLogErrorController(
  deleteLogErrorUseCase
);

const deleteLogError = {
  handle: deleteLogErrorController.handle.bind(deleteLogErrorController),
};

export { deleteLogError };
