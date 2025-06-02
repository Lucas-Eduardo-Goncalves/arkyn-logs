import { DomainRepository } from "../../../repositories/domain";
import { DeleteDomainController } from "./deleteDomainController";
import { DeleteDomainUseCase } from "./deleteDomainUseCase";

const domainRepository = new DomainRepository();

const deleteDomainUseCase = new DeleteDomainUseCase(domainRepository);

const deleteDomainController = new DeleteDomainController(deleteDomainUseCase);

const deleteDomain = {
  handle: deleteDomainController.handle.bind(deleteDomainController),
};

export { deleteDomain };
