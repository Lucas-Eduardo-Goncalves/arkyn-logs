import { DomainRepository } from "../../../repositories/domain";
import { PathnameRepository } from "../../../repositories/pathname";
import { TrafficSourceRepository } from "../../../repositories/trafficSource";
import { CreatePathnameController } from "./createPathnameController";
import { CreatePathnameUseCase } from "./createPathnameUseCase";

const pathnameRepository = new PathnameRepository();
const domainRepository = new DomainRepository();
const trafficSourceRepository = new TrafficSourceRepository();

const createPathnameUseCase = new CreatePathnameUseCase(
  pathnameRepository,
  domainRepository,
  trafficSourceRepository
);

const createPathnameController = new CreatePathnameController(
  createPathnameUseCase
);

const createPathname = {
  handle: createPathnameController.handle.bind(createPathnameController),
};

export { createPathname };
