import { PrismaDomainRepository } from "../../../infra/data/repositories/domain";
import { PrismaPathnameRepository } from "../../../infra/data/repositories/pathname";
import { PrismaTrafficSourceRepository } from "../../../infra/data/repositories/trafficSource";
import { CreatePathnameUseCase } from "../../../app/useCases/pathname/createPathnameUseCase";
import { CreatePathnameController } from "../../../infra/controllers/pathname/createPathnameController";

const prismaPathnameRepository = new PrismaPathnameRepository();
const prismaDomainRepository = new PrismaDomainRepository();
const prismaTrafficSourceRepository = new PrismaTrafficSourceRepository();

const createPathnameUseCase = new CreatePathnameUseCase(
  prismaPathnameRepository,
  prismaDomainRepository,
  prismaTrafficSourceRepository
);

const createPathnameController = new CreatePathnameController(
  createPathnameUseCase
);

const createPathname = {
  handle: createPathnameController.handle.bind(createPathnameController),
};

export { createPathname };
