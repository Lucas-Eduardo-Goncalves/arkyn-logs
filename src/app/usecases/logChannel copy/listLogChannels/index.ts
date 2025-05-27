import { LogChannelRepository } from "../../../repositories/logChannel";
import { ListLogChannelsController } from "./listLogChannelsController";
import { ListLogChannelsUseCase } from "./listLogChannelsUseCase";

const logChannelRepository = new LogChannelRepository();
const listLogChannelsUseCase = new ListLogChannelsUseCase(logChannelRepository);
const listLogChannelsController = new ListLogChannelsController(
  listLogChannelsUseCase
);

const listLogChannels = {
  handle: listLogChannelsController.handle.bind(listLogChannelsController),
};

export { listLogChannels };
