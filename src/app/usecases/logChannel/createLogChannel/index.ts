import { LogChannelRepository } from "../../../repositories/logChannel";
import { UserRepository } from "../../../repositories/user";
import { CreateLogChannelController } from "./createLogChannelController";
import { CreateLogChannelUseCase } from "./createLogChannelUseCase";

const logChannelRepository = new LogChannelRepository();
const userRepository = new UserRepository();

const createLogChannelUseCase = new CreateLogChannelUseCase(
  logChannelRepository,
  userRepository
);

const createLogChannelController = new CreateLogChannelController(
  createLogChannelUseCase
);

const createLogChannel = {
  handle: createLogChannelController.handle.bind(createLogChannelController),
};

export { createLogChannel };
