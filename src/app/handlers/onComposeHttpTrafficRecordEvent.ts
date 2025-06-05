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
      method,
      trafficUserId,
      requestHeaders,
      requestBody,
      queryParams,
      responseHeaders,
      responseBody,
    } = input;

    const domain = await this.createDomainUseCase.execute({
      trafficSourceId,
      value: domainUrl,
    });

    const pathname = await this.createPathnameUseCase.execute({
      trafficSourceId,
      domainId: domain.id,
      value: pathnameUrl,
    });

    const httpTraffic = await this.createHttpTrafficUseCase.execute({
      trafficSourceId,
      domainId: domain.id,
      pathnameId: pathname.id,
      status,
      method,
      trafficUserId,
    });

    await Promise.all([
      await this.createRequestUseCase.execute({
        body: requestBody,
        headers: requestHeaders,
        httpTrafficId: httpTraffic.id,
        queryParams,
      }),

      await this.createResponseUseCase.execute({
        body: responseBody,
        headers: responseHeaders,
        httpTrafficId: httpTraffic.id,
      }),
    ]);
  }
}

export { OnComposeHttpTrafficRecordEvent };
