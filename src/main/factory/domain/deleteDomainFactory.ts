import { DeleteDomainUseCase } from "../../../app/useCases/domain/deleteDomainUseCase";
import { DeleteDomainController } from "../../../infra/controllers/domain/deleteDomainController";
import { PrismaDomainRepository } from "../../../infra/repositories/domain";
import { PrismaTrafficSourceRepository } from "../../../infra/repositories/trafficSource";

const prismaDomainRepository = new PrismaDomainRepository();
const prismaTrafficSourceRepository = new PrismaTrafficSourceRepository();

const deleteDomainUseCase = new DeleteDomainUseCase(
  prismaDomainRepository,
  prismaTrafficSourceRepository
);

const deleteDomainController = new DeleteDomainController(deleteDomainUseCase);

const deleteDomain = {
  handle: deleteDomainController.handle.bind(deleteDomainController),
};

export { deleteDomain };
