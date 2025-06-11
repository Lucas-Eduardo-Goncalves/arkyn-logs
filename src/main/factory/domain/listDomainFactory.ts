import { PrismaDomainRepository } from "../../../infra/repositories/domain";
import { ListDomainsUseCase } from "../../../app/usecases/domain/listDomainsUseCase";
import { ListDomainsController } from "../../../infra/controllers/domain/listDomainsController";

const prismaDomainRepository = new PrismaDomainRepository();
const listDomainsUseCase = new ListDomainsUseCase(prismaDomainRepository);
const listDomainsController = new ListDomainsController(listDomainsUseCase);

const listDomains = {
  handle: listDomainsController.handle.bind(listDomainsController),
};

export { listDomains };
