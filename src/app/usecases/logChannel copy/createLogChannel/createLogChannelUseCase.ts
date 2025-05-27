import { HttpAdapter } from "../../../../infra/adapters/httpAdapter";
import { SchemaValidatorAdapter } from "../../../../infra/adapters/schemaValidatorAdapter";
import { createLogChannelSchema } from "../../../../infra/schemas/internal/logChannel";
import { LogChannel } from "../../../entities/logChannel";
import { LogChannelRepository } from "../../../repositories/logChannel";
import { UserRepository } from "../../../repositories/user";

class CreateLogChannelUseCase {
  constructor(
    private logChannelRepository: LogChannelRepository,
    private userRepository: UserRepository
  ) {}

  async execute(body: any) {
    const schemaValidator = new SchemaValidatorAdapter(createLogChannelSchema);
    const { name, userId } = schemaValidator.validate(body);

    const existsUser = await this.userRepository.findById(userId);

    if (!existsUser) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.notFound("User not found");
    }

    const logChannel = LogChannel.create({ name, userId });
    await this.logChannelRepository.createLogChannel(logChannel);

    return logChannel.toJson();
  }
}

export { CreateLogChannelUseCase };
