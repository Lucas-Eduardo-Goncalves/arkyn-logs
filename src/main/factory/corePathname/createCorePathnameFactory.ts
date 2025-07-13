import { CreateCorePathnameUseCase } from "../../../app/useCases/corePathname/createCorePathnameUseCase";
import { CreateCorePathnameController } from "../../../infra/controllers/corePathname/createCorePathnameController";
import { PrismaCorePathnameRepository } from "../../../infra/data/repositories/corePathname";
import { PrismaTrafficSourceRepository } from "../../../infra/data/repositories/trafficSource";

const prismaCorePathnameRepository = new PrismaCorePathnameRepository();
const prismaTrafficSourceRepository = new PrismaTrafficSourceRepository();

const createCorePathnameUseCase = new CreateCorePathnameUseCase(
  prismaCorePathnameRepository,
  prismaTrafficSourceRepository
);

const createCorePathnameController = new CreateCorePathnameController(
  createCorePathnameUseCase
);

const createCorePathname = {
  handle: createCorePathnameController.handle.bind(
    createCorePathnameController
  ),
};

export { createCorePathname };
