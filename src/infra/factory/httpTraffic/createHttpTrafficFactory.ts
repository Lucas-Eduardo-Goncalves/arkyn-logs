import { PrismaDomainRepository } from "../../../app/repositories/domain";
import { PrismaHttpTrafficRepository } from "../../../app/repositories/httpTraffic";
import { PrismaPathnameRepository } from "../../../app/repositories/pathname";
import { PrismaRequestRepository } from "../../../app/repositories/request";
import { PrismaResponseRepository } from "../../../app/repositories/response";
import { PrismaTrafficSourceRepository } from "../../../app/repositories/trafficSource";
import { CreateHttpTrafficUseCase } from "../../../app/usecases/httpTraffic/createHttpTrafficUseCase";
import { CreateHttpTrafficController } from "../../controllers/httpTraffic/createHttpTrafficController";

const prismaHttpTrafficRepository = new PrismaHttpTrafficRepository();
const prismaTrafficSourceRepository = new PrismaTrafficSourceRepository();
const prismaDomainRepository = new PrismaDomainRepository();
const prismaPathnameSourceRepository = new PrismaPathnameRepository();
const prismaRequestRepository = new PrismaRequestRepository();
const prismaResponseRepository = new PrismaResponseRepository();

const createHttpTrafficUseCase = new CreateHttpTrafficUseCase(
  prismaHttpTrafficRepository,
  prismaTrafficSourceRepository,
  prismaDomainRepository,
  prismaPathnameSourceRepository,
  prismaRequestRepository,
  prismaResponseRepository
);

const createHttpTrafficController = new CreateHttpTrafficController(
  createHttpTrafficUseCase
);

const createHttpTraffic = {
  handle: createHttpTrafficController.handle.bind(createHttpTrafficController),
};

export { createHttpTraffic };
