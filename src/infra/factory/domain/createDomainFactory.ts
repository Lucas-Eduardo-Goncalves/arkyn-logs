import { PrismaDomainRepository } from "../../../app/repositories/domain";
import { PrismaTrafficSourceRepository } from "../../../app/repositories/trafficSource";
import { CreateDomainUseCase } from "../../../app/usecases/domain/createDomainUseCase";
import { CreateDomainController } from "../../controllers/domain/createDomainController";

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
