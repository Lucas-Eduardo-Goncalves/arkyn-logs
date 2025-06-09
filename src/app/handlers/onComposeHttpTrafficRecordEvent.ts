import { ComposeHttpTrafficRecordEvent } from "../events/composeHttpTrafficRecordEvent";
import { CreateDomainUseCase } from "../usecases/domain/createDomainUseCase";
import { CreateHttpTrafficUseCase } from "../usecases/httpTraffic/createHttpTrafficUseCase";
import { CreatePathnameUseCase } from "../usecases/pathname/createPathnameUseCase";
import { CreateRequestUseCase } from "../usecases/request/createRequestUseCase";
import { CreateResponseUseCase } from "../usecases/response/createResponseUseCase";

class OnComposeHttpTrafficRecordEvent {
  constructor(
    private createDomainUseCase: CreateDomainUseCase,
    private createPathnameUseCase: CreatePathnameUseCase,
    private createHttpTrafficUseCase: CreateHttpTrafficUseCase,
    private createRequestUseCase: CreateRequestUseCase,
    private createResponseUseCase: CreateResponseUseCase
  ) {}

  async handle(input: ComposeHttpTrafficRecordEvent) {
    const {
      domainUrl,
      pathnameUrl,
      trafficSourceId,
      status,
      protocol,
      method,
      trafficUserId,
      requestHeaders,
      requestBody,
      queryParams,
      responseHeaders,
      responseBody,
      elapsedTime,
    } = input;

    const domain = await this.createDomainUseCase.execute({
      trafficSourceId,
      value: domainUrl,
      protocol,
    });

    const pathname = await this.createPathnameUseCase.execute({
      trafficSourceId,
      domainId: domain.id,
      value: pathnameUrl,
    });

    const [request, response] = await Promise.all([
      this.createRequestUseCase.execute({
        body: requestBody,
        headers: requestHeaders,
        queryParams,
      }),
      this.createResponseUseCase.execute({
        body: responseBody,
        headers: responseHeaders,
      }),
    ]);

    await this.createHttpTrafficUseCase.execute({
      trafficSourceId,
      domainId: domain.id,
      pathnameId: pathname.id,
      status,
      method,
      trafficUserId,
      elapsedTime,
      requestId: request.id,
      responseId: response.id,
    });
  }
}

export { OnComposeHttpTrafficRecordEvent };
