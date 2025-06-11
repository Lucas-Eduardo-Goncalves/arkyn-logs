import { CreateCorePathnameUseCase } from "../../../app/usecases/corePathname/createCorePathnameUseCase";
import { CreateCorePathnameController } from "../../../infra/controllers/corePathname/createCorePathnameController";
import { PrismaCorePathnameRepository } from "../../../infra/repositories/corePathname";
import { PrismaTrafficSourceRepository } from "../../../infra/repositories/trafficSource";

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
