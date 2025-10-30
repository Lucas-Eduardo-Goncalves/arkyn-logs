import { ListDomainsUseCase } from "../../../app/useCases/domain/listDomainsUseCase";
import { ListDomainsController } from "../../../infra/controllers/domain/listDomainsController";
import { PrismaDomainRepository } from "../../../infra/repositories/domain";
import { PrismaTrafficSourceRepository } from "../../../infra/repositories/trafficSource";

const prismaDomainRepository = new PrismaDomainRepository();
const prismaTrafficSourceRepository = new PrismaTrafficSourceRepository();

const listDomainsUseCase = new ListDomainsUseCase(
  prismaDomainRepository,
  prismaTrafficSourceRepository
);
const listDomainsController = new ListDomainsController(listDomainsUseCase);

const listDomains = {
  handle: listDomainsController.handle.bind(listDomainsController),
};

export { listDomains };
