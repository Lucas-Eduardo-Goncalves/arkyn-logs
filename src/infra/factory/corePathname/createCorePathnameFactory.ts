import { PrismaCorePathnameRepository } from "../../../app/repositories/corePathname";
import { PrismaTrafficSourceRepository } from "../../../app/repositories/trafficSource";
import { CreateCorePathnameUseCase } from "../../../app/usecases/corePathname/createCorePathnameUseCase";
import { CreateCorePathnameController } from "../../controllers/corePathname/createCorePathnameController";

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
