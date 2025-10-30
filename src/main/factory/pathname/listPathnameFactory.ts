import { PrismaPathnameRepository } from "../../../infra/repositories/pathname";
import { ListPathnamesUseCase } from "../../../app/useCases/pathname/listPathnamesUseCase";
import { ListPathnamesController } from "../../../infra/controllers/pathname/listPathnamesController";
import { PrismaTrafficSourceRepository } from "../../../infra/repositories/trafficSource";
import { PrismaDomainRepository } from "../../../infra/repositories/domain";

const prismaPathnameRepository = new PrismaPathnameRepository();
const prismaTrafficSourceRepository = new PrismaTrafficSourceRepository();
const prismaDomainRepository = new PrismaDomainRepository();

const listPathnamesUseCase = new ListPathnamesUseCase(
  prismaPathnameRepository,
  prismaTrafficSourceRepository,
  prismaDomainRepository
);

const listPathnamesController = new ListPathnamesController(
  listPathnamesUseCase
);

const listPathnames = {
  handle: listPathnamesController.handle.bind(listPathnamesController),
};

export { listPathnames };
