import { PrismaDomainRepository } from "../../../app/repositories/domain";
import { DeleteDomainUseCase } from "../../../app/usecases/domain/deleteDomainUseCase";
import { DeleteDomainController } from "../../controllers/domain/deleteDomainController";

const prismaDomainRepository = new PrismaDomainRepository();

const deleteDomainUseCase = new DeleteDomainUseCase(prismaDomainRepository);

const deleteDomainController = new DeleteDomainController(deleteDomainUseCase);

const deleteDomain = {
  handle: deleteDomainController.handle.bind(deleteDomainController),
};

export { deleteDomain };
