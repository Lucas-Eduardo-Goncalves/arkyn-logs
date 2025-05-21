import { LogChannelRepository } from "../../../repositories/logChannel";

class ListLogChannelsUseCase {
  constructor(private logChannelRepository: LogChannelRepository) {}

  async execute() {
    const logChannels = await this.logChannelRepository.findAll();
    return logChannels.map((user) => user.toJson());
  }
}

export { ListLogChannelsUseCase };
