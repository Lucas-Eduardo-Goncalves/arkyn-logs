import { PrismaPathnameRepository } from "../../../infra/repositories/pathname";
import { DeletePathnameUseCase } from "../../../app/useCases/pathname/deletePathnameUseCase";
import { DeletePathnameController } from "../../../infra/controllers/pathname/deletePathnameController";
import { PrismaTrafficSourceRepository } from "../../../infra/repositories/trafficSource";

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
