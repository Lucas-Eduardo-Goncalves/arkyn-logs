import { HttpAdapter } from "../../../infra/adapters/httpAdapter";
import { Request } from "../../entities/request";
import { HttpTrafficRepository } from "../../repositories/httpTraffic/repository";
import { RequestRepository } from "../../repositories/request/repository";

type InputProps = {
  headers: Record<string, string>;
  body: Record<string, string>;
  queryParams: Record<string, string>;
  httpTrafficId: string;
};

class CreateRequestUseCase {
  constructor(
    private requestRepository: RequestRepository,
    private httpTrafficRepository: HttpTrafficRepository
  ) {}

  async execute(input: InputProps) {
    const { body, headers, httpTrafficId, queryParams } = input;

    const existsHttpTraffic = await this.httpTrafficRepository.findById(
      httpTrafficId
    );

    if (!existsHttpTraffic) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.notFound("Http traffic not found");
    }

    const request = Request.create({
      headers,
      body,
      queryParams,
      httpTrafficId,
    });

    await this.requestRepository.createRequest(request);

    return request.toJson();
  }
}

export { CreateRequestUseCase };
