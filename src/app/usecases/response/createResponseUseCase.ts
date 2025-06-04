import { HttpAdapter } from "../../../infra/adapters/httpAdapter";
import { Response } from "../../entities/response";
import { HttpTrafficRepository } from "../../repositories/httpTraffic/repository";
import { ResponseRepository } from "../../repositories/response/repository";

type InputProps = {
  headers: Record<string, string>;
  body: Record<string, string>;
  httpTrafficId: string;
};

class CreateResponseUseCase {
  constructor(
    private responseRepository: ResponseRepository,
    private httpTrafficRepository: HttpTrafficRepository
  ) {}

  async execute(input: InputProps) {
    const { body, headers, httpTrafficId } = input;

    const existsHttpTraffic = await this.httpTrafficRepository.findById(
      httpTrafficId
    );

    if (!existsHttpTraffic) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.notFound("Http traffic not found");
    }

    const response = Response.create({
      headers,
      body,
      httpTrafficId,
    });

    await this.responseRepository.createResponse(response);

    return response.toJson();
  }
}

export { CreateResponseUseCase };
