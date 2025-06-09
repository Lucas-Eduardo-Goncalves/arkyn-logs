import { PrismaCorePathnameRepository } from "../../../app/repositories/corePathname";
import { ListCorePathnamesUseCase } from "../../../app/usecases/corePathname/listCorePathnamesUseCase";
import { ListCorePathnamesController } from "../../controllers/corePathname/listCorePathnamesController";

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
