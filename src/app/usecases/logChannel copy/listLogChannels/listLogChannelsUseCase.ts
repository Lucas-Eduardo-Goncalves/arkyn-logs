import { LogChannelRepository } from "../../../repositories/logChannel";

class ListLogChannelsUseCase {
  constructor(private logChannelRepository: LogChannelRepository) {}

  async execute(userId: string) {
    const logChannels = await this.logChannelRepository.findAll(userId);
    return logChannels.map((user) => user.toJson());
  }
}

export { ListLogChannelsUseCase };
