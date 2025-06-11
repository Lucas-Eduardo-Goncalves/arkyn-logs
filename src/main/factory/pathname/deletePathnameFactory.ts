import { PrismaPathnameRepository } from "../../../infra/data/repositories/pathname";
import { DeletePathnameUseCase } from "../../../app/usecases/pathname/deletePathnameUseCase";
import { DeletePathnameController } from "../../../infra/controllers/pathname/deletePathnameController";

const prismaPathnameRepository = new PrismaPathnameRepository();

const deletePathnameUseCase = new DeletePathnameUseCase(
  prismaPathnameRepository
);

const deletePathnameController = new DeletePathnameController(
  deletePathnameUseCase
);

const deletePathname = {
  handle: deletePathnameController.handle.bind(deletePathnameController),
};

export { deletePathname };
