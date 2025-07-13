import { ListDomainsUseCase } from "../../../app/usecases/domain/listDomainsUseCase";
import { ListDomainsController } from "../../../infra/controllers/domain/listDomainsController";
import { PrismaDomainRepository } from "../../../infra/data/repositories/domain";
import { PrismaTrafficSourceRepository } from "../../../infra/data/repositories/trafficSource";

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
