import { Request } from "../../entities/request";
import { RequestRepository } from "../../repositories/request/repository";

type InputProps = {
  headers: Record<string, string>;
  body: Record<string, string>;
  queryParams: Record<string, string>;
};

class CreateRequestUseCase {
  constructor(private requestRepository: RequestRepository) {}

  async execute(input: InputProps) {
    const { body, headers, queryParams } = input;
    const request = Request.create({ headers, body, queryParams });
    await this.requestRepository.createRequest(request);
    return request.toJson();
  }
}

export { CreateRequestUseCase };
