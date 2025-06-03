import { PrismaPathnameRepository } from "../../../app/repositories/pathname";
import { ListPathnamesUseCase } from "../../../app/usecases/pathname/listPathnamesUseCase";
import { ListPathnamesController } from "../../controllers/pathname/listPathnamesController";

const prismaPathnameRepository = new PrismaPathnameRepository();
const listPathnamesUseCase = new ListPathnamesUseCase(prismaPathnameRepository);
const listPathnamesController = new ListPathnamesController(
  listPathnamesUseCase
);

const listPathnames = {
  handle: listPathnamesController.handle.bind(listPathnamesController),
};

export { listPathnames };
