import { PathnameRepository } from "../../../repositories/pathname";
import { ListPathnamesController } from "./listPathnamesController";
import { ListPathnamesUseCase } from "./listPathnamesUseCase";

const pathnameRepository = new PathnameRepository();
const listPathnamesUseCase = new ListPathnamesUseCase(pathnameRepository);
const listPathnamesController = new ListPathnamesController(
  listPathnamesUseCase
);

const listPathnames = {
  handle: listPathnamesController.handle.bind(listPathnamesController),
};

export { listPathnames };
