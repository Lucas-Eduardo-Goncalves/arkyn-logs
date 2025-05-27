import { LogChannelRepository } from "../../../repositories/logChannel";
import { DeleteLogChannelController } from "./deleteLogChannelController";
import { DeleteLogChannelUseCase } from "./deleteLogChannelUseCase";

const logChannelRepository = new LogChannelRepository();

const deleteLogChannelUseCase = new DeleteLogChannelUseCase(
  logChannelRepository
);

const deleteLogChannelController = new DeleteLogChannelController(
  deleteLogChannelUseCase
);

const deleteLogChannel = {
  handle: deleteLogChannelController.handle.bind(deleteLogChannelController),
};

export { deleteLogChannel };
