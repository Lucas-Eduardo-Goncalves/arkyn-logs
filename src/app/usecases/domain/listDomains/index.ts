import { DomainRepository } from "../../../repositories/domain";
import { ListDomainsController } from "./listDomainsController";
import { ListDomainsUseCase } from "./listDomainsUseCase";

const domainRepository = new DomainRepository();
const listDomainsUseCase = new ListDomainsUseCase(domainRepository);
const listDomainsController = new ListDomainsController(listDomainsUseCase);

const listDomains = {
  handle: listDomainsController.handle.bind(listDomainsController),
};

export { listDomains };
