import { HttpAdapter } from "../../../infra/adapters/httpAdapter";
import { HttpMethod } from "../../../main/types/HttpMethod";
import { HttpTraffic } from "../../../domain/entities/httpTraffic";
import { DomainRepository } from "../../../domain/repositories/domain";
import { HttpTrafficRepository } from "../../../domain/repositories/httpTraffic";
import { PathnameRepository } from "../../../domain/repositories/pathname";
import { RequestRepository } from "../../../domain/repositories/request";
import { ResponseRepository } from "../../../domain/repositories/response";
import { TrafficSourceRepository } from "../../../domain/repositories/trafficSource";

type InputProps = {
  trafficSourceId: string;
  status: number;
  method: HttpMethod;
  trafficUserId: string | null;
  domainId: string;
  pathnameId: string;
  elapsedTime: number;
  requestId: string;
  responseId: string;
};

class CreateHttpTrafficUseCase {
  constructor(
    private httpTrafficRepository: HttpTrafficRepository,
    private trafficSourceRepository: TrafficSourceRepository,
    private domainRepository: DomainRepository,
    private pathnameRepository: PathnameRepository,
    private requestRepository: RequestRepository,
    private responseRepository: ResponseRepository
  ) {}

  async execute(input: InputProps) {
    const {
      trafficSourceId,
      status,
      method,
      trafficUserId,
      domainId,
      pathnameId,
      elapsedTime,
      requestId,
      responseId,
    } = input;

    const [
      existsTrafficSource,
      existsDomain,
      existsPathname,
      existsRequest,
      existsResponse,
    ] = await Promise.all([
      this.trafficSourceRepository.findById(trafficSourceId),
      this.domainRepository.findById(domainId),
      this.pathnameRepository.findById(pathnameId),
      this.requestRepository.findById(requestId),
      this.responseRepository.findById(responseId),
    ]);

    if (!existsTrafficSource) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.notFound("Traffic source not found");
    }

    if (!existsDomain) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.notFound("Domain not found");
    }

    if (!existsPathname) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.notFound("Pathname not found");
    }

    if (!existsRequest) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.notFound("Request not found");
    }

    if (!existsResponse) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.notFound("Response not found");
    }

    const httpTraffic = HttpTraffic.create({
      trafficSourceId,
      domainId,
      method,
      pathnameId,
      status,
      trafficUserId,
      elapsedTime,
      requestId,
      responseId,
    });

    await this.httpTrafficRepository.createHttpTraffic(httpTraffic);
    return httpTraffic.toJson();
  }
}

export { CreateHttpTrafficUseCase };
