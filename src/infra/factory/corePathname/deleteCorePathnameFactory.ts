import { PrismaCorePathnameRepository } from "../../../app/repositories/corePathname";
import { DeleteCorePathnameUseCase } from "../../../app/usecases/corePathname/deleteCorePathnameUseCase";
import { DeleteCorePathnameController } from "../../controllers/corePathname/deleteCorePathnameController";

const prismaCorePathnameRepository = new PrismaCorePathnameRepository();

const deleteCorePathnameUseCase = new DeleteCorePathnameUseCase(
  prismaCorePathnameRepository
);

const deleteCorePathnameController = new DeleteCorePathnameController(
  deleteCorePathnameUseCase
);

const deleteCorePathname = {
  handle: deleteCorePathnameController.handle.bind(
    deleteCorePathnameController
  ),
};

export { deleteCorePathname };
