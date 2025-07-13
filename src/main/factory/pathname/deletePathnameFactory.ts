import { PrismaPathnameRepository } from "../../../infra/data/repositories/pathname";
import { DeletePathnameUseCase } from "../../../app/usecases/pathname/deletePathnameUseCase";
import { DeletePathnameController } from "../../../infra/controllers/pathname/deletePathnameController";
import { PrismaTrafficSourceRepository } from "../../../infra/data/repositories/trafficSource";

const prismaPathnameRepository = new PrismaPathnameRepository();
const prismaTrafficSourceRepository = new PrismaTrafficSourceRepository();

const deletePathnameUseCase = new DeletePathnameUseCase(
  prismaPathnameRepository,
  prismaTrafficSourceRepository
);

const deletePathnameController = new DeletePathnameController(
  deletePathnameUseCase
);

const deletePathname = {
  handle: deletePathnameController.handle.bind(deletePathnameController),
};

export { deletePathname };
