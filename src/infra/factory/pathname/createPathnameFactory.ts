import { PrismaDomainRepository } from "../../../app/repositories/domain";
import { PrismaPathnameRepository } from "../../../app/repositories/pathname";
import { PrismaTrafficSourceRepository } from "../../../app/repositories/trafficSource";
import { CreatePathnameUseCase } from "../../../app/usecases/pathname/createPathnameUseCase";
import { CreatePathnameController } from "../../controllers/pathname/createPathnameController";

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
