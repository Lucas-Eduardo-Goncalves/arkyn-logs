import { DeleteCorePathnameUseCase } from "../../../app/usecases/corePathname/deleteCorePathnameUseCase";
import { DeleteCorePathnameController } from "../../../infra/controllers/corePathname/deleteCorePathnameController";
import { PrismaCorePathnameRepository } from "../../../infra/repositories/corePathname";

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
