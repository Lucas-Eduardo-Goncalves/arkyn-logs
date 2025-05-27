import { LogChannelRepository } from "../../../repositories/logChannel";
import { LogErrorRepository } from "../../../repositories/logError";
import { CreateLogErrorController } from "./createLogErrorController";
import { CreateLogErrorUseCase } from "./createLogErrorUseCase";

const logErrorRepository = new LogErrorRepository();
const logChannelRepository = new LogChannelRepository();

const createLogErrorUseCase = new CreateLogErrorUseCase(
  logErrorRepository,
  logChannelRepository
);

const createLogErrorController = new CreateLogErrorController(
  createLogErrorUseCase
);

const createLogError = {
  handle: createLogErrorController.handle.bind(createLogErrorController),
};

export { createLogError };
