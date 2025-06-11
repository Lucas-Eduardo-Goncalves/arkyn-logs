import { ListCorePathnamesUseCase } from "../../../app/usecases/corePathname/listCorePathnamesUseCase";
import { ListCorePathnamesController } from "../../../infra/controllers/corePathname/listCorePathnamesController";
import { PrismaCorePathnameRepository } from "../../../infra/repositories/corePathname";

const prismaCorePathnameRepository = new PrismaCorePathnameRepository();
const listCorePathnamesUseCase = new ListCorePathnamesUseCase(
  prismaCorePathnameRepository
);
const listCorePathnamesController = new ListCorePathnamesController(
  listCorePathnamesUseCase
);

const listCorePathnames = {
  handle: listCorePathnamesController.handle.bind(listCorePathnamesController),
};

export { listCorePathnames };
