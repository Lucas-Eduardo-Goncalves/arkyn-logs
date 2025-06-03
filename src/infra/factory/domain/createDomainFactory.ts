import { PrismaDomainRepository } from "../../../app/repositories/domain";
import { TrafficSourceRepository } from "../../../app/repositories/trafficSource";
import { CreateDomainUseCase } from "../../../app/usecases/domain/createDomainUseCase";
import { CreateDomainController } from "../../controllers/domain/createDomainController";

const domainRepository = new PrismaDomainRepository();
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
