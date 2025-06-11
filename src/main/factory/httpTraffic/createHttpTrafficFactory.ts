import { PrismaDomainRepository } from "../../../infra/repositories/domain";
import { PrismaHttpTrafficRepository } from "../../../infra/repositories/httpTraffic";
import { PrismaPathnameRepository } from "../../../infra/repositories/pathname";
import { PrismaRequestRepository } from "../../../infra/repositories/request";
import { PrismaResponseRepository } from "../../../infra/repositories/response";
import { PrismaTrafficSourceRepository } from "../../../infra/repositories/trafficSource";
import { CreateHttpTrafficUseCase } from "../../../app/usecases/httpTraffic/createHttpTrafficUseCase";
import { CreateHttpTrafficController } from "../../../infra/controllers/httpTraffic/createHttpTrafficController";

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
