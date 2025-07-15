import { CreateHttpTrafficUseCase } from "../../../app/useCases/httpTraffic/createHttpTrafficUseCase";
import { CreateHttpTrafficController } from "../../../infra/controllers/httpTraffic/createHttpTrafficController";
import { PrismaDomainRepository } from "../../../infra/data/repositories/domain";
import { PrismaHttpTrafficRepository } from "../../../infra/data/repositories/httpTraffic";
import { PrismaPathnameRepository } from "../../../infra/data/repositories/pathname";
import { PrismaRequestRepository } from "../../../infra/data/repositories/request";
import { PrismaResponseRepository } from "../../../infra/data/repositories/response";
import { PrismaTrafficSourceRepository } from "../../../infra/data/repositories/trafficSource";

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
