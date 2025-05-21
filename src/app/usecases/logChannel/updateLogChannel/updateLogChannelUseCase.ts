import { HttpAdapter } from "../../../../infra/adapters/httpAdapter";
import { SchemaValidatorAdapter } from "../../../../infra/adapters/schemaValidatorAdapter";
import { updateLogChannelSchema } from "../../../../infra/schemas/internal/logChannel";
import { LogChannelRepository } from "../../../repositories/logChannel";

class UpdateLogChannelUseCase {
  constructor(private logChannelRepository: LogChannelRepository) {}

  async execute(body: any) {
    const schemaValidator = new SchemaValidatorAdapter(updateLogChannelSchema);
    const { name, id } = schemaValidator.validate(body);

    const logChannel = await this.logChannelRepository.findById(id);

    if (!logChannel) {
      const httpAdapter = new HttpAdapter();
      return httpAdapter.notFound("Log channel not found");
    }

    logChannel.update({ name });
    await this.logChannelRepository.updateLogChannel(logChannel);

    return logChannel.toJson();
  }
}

export { UpdateLogChannelUseCase };
