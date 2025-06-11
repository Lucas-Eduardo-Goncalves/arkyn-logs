import { Response } from "../../../domain/entities/response";
import { ResponseRepository } from "../../../domain/repositories/response";

type InputProps = {
  headers: Record<string, string>;
  body: Record<string, string> | null;
};

class CreateResponseUseCase {
  constructor(private responseRepository: ResponseRepository) {}

  async execute(input: InputProps) {
    const { body, headers } = input;
    const response = Response.create({ headers, body });
    await this.responseRepository.createResponse(response);
    return response.toJson();
  }
}

export { CreateResponseUseCase };
