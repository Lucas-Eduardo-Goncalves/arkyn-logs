import { PrismaPathnameRepository } from "../../../infra/data/repositories/pathname";
import { ListPathnamesUseCase } from "../../../app/usecases/pathname/listPathnamesUseCase";
import { ListPathnamesController } from "../../../infra/controllers/pathname/listPathnamesController";
import { PrismaTrafficSourceRepository } from "../../../infra/data/repositories/trafficSource";
import { PrismaDomainRepository } from "../../../infra/data/repositories/domain";

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
