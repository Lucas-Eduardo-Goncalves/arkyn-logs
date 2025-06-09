import { HttpAdapter } from "../../../infra/adapters/httpAdapter";
import { HttpTraffic } from "../../entities/httpTraffic";
import { DomainRepository } from "../../repositories/domain/repository";
import { HttpTrafficRepository } from "../../repositories/httpTraffic/repository";
import { PathnameRepository } from "../../repositories/pathname/repository";
import { TrafficSourceRepository } from "../../repositories/trafficSource/repository";

type InputProps = {
  trafficSourceId: string;
  status: number;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  trafficUserId: string | null;
  domainId: string;
  pathnameId: string;
  elapsedTime: number;
};

class CreateHttpTrafficUseCase {
  constructor(
    private httpTrafficRepository: HttpTrafficRepository,
    private trafficSourceRepository: TrafficSourceRepository,
    private domainRepository: DomainRepository,
    private pathnameRepository: PathnameRepository
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
    } = input;

    const [existsTrafficSource, existsDomain, existsPathname] =
      await Promise.all([
        this.trafficSourceRepository.findById(trafficSourceId),
        this.domainRepository.findById(domainId),
        this.pathnameRepository.findById(pathnameId),
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

    const httpTraffic = HttpTraffic.create({
      trafficSourceId,
      domainId,
      method,
      pathnameId,
      status,
      trafficUserId,
      elapsedTime,
    });

    await this.httpTrafficRepository.createHttpTraffic(httpTraffic);

    return httpTraffic.toJson();
  }
}

export { CreateHttpTrafficUseCase };
