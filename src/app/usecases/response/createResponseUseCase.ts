import { Response } from "../../entities/response";
import { ResponseRepository } from "../../repositories/response/repository";

type InputProps = {
  headers: Record<string, string>;
  body: Record<string, string>;
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
