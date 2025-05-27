import { LogChannelRepository } from "../../../repositories/logChannel";
import { LogErrorRepository } from "../../../repositories/logError";
import { ListLogErrorsController } from "./listLogErrorsController";
import { ListLogErrorsUseCase } from "./listLogErrorsUseCase";

const logErrorRepository = new LogErrorRepository();
const logChannelRepository = new LogChannelRepository();
const listLogErrorsUseCase = new ListLogErrorsUseCase(
  logErrorRepository,
  logChannelRepository
);

const listLogErrorsController = new ListLogErrorsController(
  listLogErrorsUseCase
);

const listLogErrors = {
  handle: listLogErrorsController.handle.bind(listLogErrorsController),
};

export { listLogErrors };
