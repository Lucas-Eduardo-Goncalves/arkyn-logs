import { HttpAdapter } from "../../../infra/adapters/httpAdapter";
import { LogChannelMapper } from "../../../infra/mappers/logChannel";
import { LogChannel } from "../../entities/logChannel";
import { LogChannelRepositoryDTO } from "./repositoryDTO";

class LogChannelRepository implements LogChannelRepositoryDTO {
  static logChannels: LogChannel[] = [];

  async findAll(userId: string): Promise<LogChannel[]> {
    return LogChannelRepository.logChannels
      .filter((logChannel) => logChannel.userId === userId)
      .map((logChannel) => LogChannelMapper.toEntity(logChannel));
  }

  async findById(logChannelId: string): Promise<LogChannel | null> {
    const logChannel = LogChannelRepository.logChannels.find(
      (logChannel) => logChannel.id === logChannelId
    );
    if (!logChannel) return null;
    return LogChannelMapper.toEntity(logChannel);
  }

  async createLogChannel(logChannel: LogChannel): Promise<LogChannel> {
    LogChannelRepository.logChannels.push(logChannel);
    return logChannel;
  }

  async updateLogChannel(logChannel: LogChannel): Promise<LogChannel> {
    const index = LogChannelRepository.logChannels.findIndex(
      (u) => u.id === logChannel.id
    );
    const httpAdpter = new HttpAdapter();
    if (index === -1) httpAdpter.serverError("LogChannel not found");
    LogChannelRepository.logChannels[index] = logChannel;
    return logChannel;
  }

  async deleteLogChannel(logChannelId: string): Promise<void> {
    const index = LogChannelRepository.logChannels.findIndex(
      (logChannel) => logChannel.id === logChannelId
    );
    const httpAdpter = new HttpAdapter();
    if (index === -1) httpAdpter.serverError("LogChannel not found");
    LogChannelRepository.logChannels.splice(index, 1);
  }
}

export { LogChannelRepository };
