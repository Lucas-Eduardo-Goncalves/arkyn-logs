import { PrismaPathnameRepository } from "../../../app/repositories/pathname";
import { DeletePathnameUseCase } from "../../../app/usecases/pathname/deletePathnameUseCase";
import { DeletePathnameController } from "../../controllers/pathname/deletePathnameController";

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
