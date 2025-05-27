import { HttpAdapter } from "../../../../infra/adapters/httpAdapter";
import { SchemaValidatorAdapter } from "../../../../infra/adapters/schemaValidatorAdapter";
import { deleteLogChannelSchema } from "../../../../infra/schemas/internal/logChannel";
import { LogChannelRepository } from "../../../repositories/logChannel";

class DeleteLogChannelUseCase {
  constructor(private logChannelRepository: LogChannelRepository) {}

  async execute(body: any) {
    const schemaValidator = new SchemaValidatorAdapter(deleteLogChannelSchema);
    const validatedBody = schemaValidator.validate(body);

    const logChannel = await this.logChannelRepository.findById(
      validatedBody.id
    );

    if (!logChannel) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.notFound("Log channel not found");
    }

    await this.logChannelRepository.deleteLogChannel(logChannel.id);
  }
}

export { DeleteLogChannelUseCase };
