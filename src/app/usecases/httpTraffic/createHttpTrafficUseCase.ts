import { HttpAdapter } from "../../../infra/adapters/httpAdapter";
import { HttpTraffic } from "../../entities/httpTraffic";
import { DomainRepository } from "../../repositories/domain/repository";
import { HttpTrafficRepository } from "../../repositories/httpTraffic/repository";
import { PathnameRepository } from "../../repositories/pathname/repository";
import { RequestRepository } from "../../repositories/request/repository";
import { ResponseRepository } from "../../repositories/response/repository";
import { TrafficSourceRepository } from "../../repositories/trafficSource/repository";

type InputProps = {
  trafficSourceId: string;
  status: number;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
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
