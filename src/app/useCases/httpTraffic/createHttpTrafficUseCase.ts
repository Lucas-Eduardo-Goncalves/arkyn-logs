import { HttpTraffic } from "../../../domain/entities/httpTraffic";
import { DomainRepository } from "../../../domain/repositories/domain";
import { HttpTrafficRepository } from "../../../domain/repositories/httpTraffic";
import { PathnameRepository } from "../../../domain/repositories/pathname";
import { RequestRepository } from "../../../domain/repositories/request";
import { ResponseRepository } from "../../../domain/repositories/response";
import { TrafficSourceRepository } from "../../../domain/repositories/trafficSource";
import { WebhookRepository } from "../../../domain/repositories/webhook";
import { HttpAdapter } from "../../../infra/adapters/httpAdapter";
import { WebhookService } from "../../../infra/service/webhookService";
import { HttpMethod } from "../../../main/types/HttpMethod";

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
    private responseRepository: ResponseRepository,
    private webhookRepository: WebhookRepository
  ) {}

  async execute(input: InputProps, userId: string) {
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

    const [trafficSource, domain, pathname, request, response, webhook] =
      await Promise.all([
        this.trafficSourceRepository.findById(trafficSourceId),
        this.domainRepository.findById(domainId),
        this.pathnameRepository.findById(pathnameId),
        this.requestRepository.findById(requestId),
        this.responseRepository.findById(responseId),
        this.webhookRepository.findByTrafficSourceId(trafficSourceId),
      ]);

    if (!trafficSource) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.notFound("Traffic source not found");
    }

    if (trafficSource.userId !== userId) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.forbidden("You do not own this traffic source.");
    }

    if (!domain) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.notFound("Domain not found");
    }

    if (!pathname) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.notFound("Pathname not found");
    }

    if (!request) {
      const httpAdapter = new HttpAdapter();
      throw httpAdapter.notFound("Request not found");
    }

    if (!response) {
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

    if (webhook?.discordChannelId && httpTraffic.level === "FATAL") {
      const webhookService = new WebhookService(webhook);
      await webhookService.send({
        title: `A fatal error occurred in the HTTP traffic\nID: ${httpTraffic.id}`,
        description: `Traffic Source: ${trafficSource.name}\nDomain: ${domain.value}\nPathname: ${pathname.value}\nStatus: ${httpTraffic.status}\nMethod: ${httpTraffic.method}\nElapsed Time: ${httpTraffic.elapsedTime}ms`,
        type: "FATAL",
      });
    }

    await this.httpTrafficRepository.createHttpTraffic(httpTraffic);
    return httpTraffic.toJson();
  }
}

export { CreateHttpTrafficUseCase };
