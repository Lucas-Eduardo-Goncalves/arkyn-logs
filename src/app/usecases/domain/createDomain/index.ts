import { DomainRepository } from "../../../repositories/domain";
import { TrafficSourceRepository } from "../../../repositories/trafficSource";
import { CreateDomainController } from "./createDomainController";
import { CreateDomainUseCase } from "./createDomainUseCase";

const domainRepository = new DomainRepository();
const trafficSourceRepository = new TrafficSourceRepository();

const createDomainUseCase = new CreateDomainUseCase(
  domainRepository,
  trafficSourceRepository
);

const createDomainController = new CreateDomainController(createDomainUseCase);

const createDomain = {
  handle: createDomainController.handle.bind(createDomainController),
};

export { createDomain };
