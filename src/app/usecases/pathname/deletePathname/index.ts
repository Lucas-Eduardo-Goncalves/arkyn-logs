import { PathnameRepository } from "../../../repositories/pathname";
import { DeletePathnameController } from "./deletePathnameController";
import { DeletePathnameUseCase } from "./deletePathnameUseCase";

const pathnameRepository = new PathnameRepository();

const deletePathnameUseCase = new DeletePathnameUseCase(pathnameRepository);

const deletePathnameController = new DeletePathnameController(
  deletePathnameUseCase
);

const deletePathname = {
  handle: deletePathnameController.handle.bind(deletePathnameController),
};

export { deletePathname };
