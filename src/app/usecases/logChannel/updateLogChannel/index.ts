import { LogChannelRepository } from "../../../repositories/logChannel";
import { UpdateLogChannelController } from "./updateLogChannelController";
import { UpdateLogChannelUseCase } from "./updateLogChannelUseCase";

const logChannelRepository = new LogChannelRepository();

const updateLogChannelUseCase = new UpdateLogChannelUseCase(
  logChannelRepository
);

const updateLogChannelController = new UpdateLogChannelController(
  updateLogChannelUseCase
);

const updateLogChannel = {
  handle: updateLogChannelController.handle.bind(updateLogChannelController),
};

export { updateLogChannel };
