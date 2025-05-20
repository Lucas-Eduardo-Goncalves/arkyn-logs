import { LogChannel } from "../../app/entities/logChannel";

type LogChannelMapperDTO = {
  id: string;
  name: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

class LogChannelMapper {
  static toEntity(logChannel: LogChannelMapperDTO): LogChannel {
    return LogChannel.restore({
      id: logChannel.id,
      name: logChannel.name,
      userId: logChannel.userId,
      createdAt: logChannel.createdAt,
      updatedAt: logChannel.updatedAt,
    });
  }
}
export { LogChannelMapper };
