import { DomainRepository } from "../../../repositories/domain";
import { HttpTrafficRepository } from "../../../repositories/httpTraffic";
import { PathnameRepository } from "../../../repositories/pathname";
import { TrafficSourceRepository } from "../../../repositories/trafficSource";
import { CreateHttpTrafficController } from "./createHttpTrafficController";
import { CreateHttpTrafficUseCase } from "./createHttpTrafficUseCase";

const httpTrafficRepository = new HttpTrafficRepository();
const trafficSourceRepository = new TrafficSourceRepository();
const domainRepository = new DomainRepository();
const pathnameSourceRepository = new PathnameRepository();

const createHttpTrafficUseCase = new CreateHttpTrafficUseCase(
  httpTrafficRepository,
  trafficSourceRepository,
  domainRepository,
  pathnameSourceRepository
);

const createHttpTrafficController = new CreateHttpTrafficController(
  createHttpTrafficUseCase
);

const createHttpTraffic = {
  handle: createHttpTrafficController.handle.bind(createHttpTrafficController),
};

export { createHttpTraffic };
