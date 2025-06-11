import { PrismaDomainRepository } from "../../../infra/repositories/domain";
import { PrismaTrafficSourceRepository } from "../../../infra/repositories/trafficSource";
import { CreateDomainUseCase } from "../../../app/usecases/domain/createDomainUseCase";
import { CreateDomainController } from "../../../infra/controllers/domain/createDomainController";

const prismaDomainRepository = new PrismaDomainRepository();
const trafficSourceRepository = new PrismaTrafficSourceRepository();

const createDomainUseCase = new CreateDomainUseCase(
  prismaDomainRepository,
  trafficSourceRepository
);

const createDomainController = new CreateDomainController(createDomainUseCase);

const createDomain = {
  handle: createDomainController.handle.bind(createDomainController),
};

export { createDomain };
