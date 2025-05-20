import { LogChannel } from "../../entities/logChannel";

type LogChannelRepositoryDTO = {
  findAll: () => Promise<LogChannel[]>;
  findById: (logChannelId: string) => Promise<LogChannel | null>;
  createLogChannel: (LogChannel: LogChannel) => Promise<LogChannel>;
  updateLogChannel: (LogChannel: LogChannel) => Promise<LogChannel>;
  deleteLogChannel: (logChannelId: string) => Promise<void>;
};

export type { LogChannelRepositoryDTO };
