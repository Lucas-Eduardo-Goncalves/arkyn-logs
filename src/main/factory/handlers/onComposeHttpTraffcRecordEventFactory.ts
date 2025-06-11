import { OnComposeHttpTrafficRecordEvent } from "../../../app/handlers/onComposeHttpTrafficRecordEvent";
import { PrismaDomainRepository } from "../../../infra/repositories/domain";
import { PrismaHttpTrafficRepository } from "../../../infra/repositories/httpTraffic";
import { PrismaPathnameRepository } from "../../../infra/repositories/pathname";
import { PrismaRequestRepository } from "../../../infra/repositories/request";
import { PrismaResponseRepository } from "../../../infra/repositories/response";
import { PrismaTrafficSourceRepository } from "../../../infra/repositories/trafficSource";
import { CreateDomainUseCase } from "../../../app/usecases/domain/createDomainUseCase";
import { CreateHttpTrafficUseCase } from "../../../app/usecases/httpTraffic/createHttpTrafficUseCase";
import { CreatePathnameUseCase } from "../../../app/usecases/pathname/createPathnameUseCase";
import { CreateRequestUseCase } from "../../../app/usecases/request/createRequestUseCase";
import { CreateResponseUseCase } from "../../../app/usecases/response/createResponseUseCase";

const prismaDomainRepository = new PrismaDomainRepository();
const prismaTrafficSourceRepository = new PrismaTrafficSourceRepository();
const prismaPathnameRepository = new PrismaPathnameRepository();
const prismaHttpTrafficRepository = new PrismaHttpTrafficRepository();
const prismaRequestRepository = new PrismaRequestRepository();
const prismaResponseRepository = new PrismaResponseRepository();

const createDomainUseCase = new CreateDomainUseCase(
  prismaDomainRepository,
  prismaTrafficSourceRepository
);

const createPathnameUseCase = new CreatePathnameUseCase(
  prismaPathnameRepository,
  prismaDomainRepository,
  prismaTrafficSourceRepository
);

const createHttpTrafficRepository = new CreateHttpTrafficUseCase(
  prismaHttpTrafficRepository,
  prismaTrafficSourceRepository,
  prismaDomainRepository,
  prismaPathnameRepository,
  prismaRequestRepository,
  prismaResponseRepository
);

const createRequestUseCase = new CreateRequestUseCase(prismaRequestRepository);

const createResponseUseCase = new CreateResponseUseCase(
  prismaResponseRepository
);

const onComposeHttpTrafficRecord = new OnComposeHttpTrafficRecordEvent(
  createDomainUseCase,
  createPathnameUseCase,
  createHttpTrafficRepository,
  createRequestUseCase,
  createResponseUseCase
);

const onComposeHttpTrafficRecordHandler = {
  handle: onComposeHttpTrafficRecord.handle.bind(onComposeHttpTrafficRecord),
};

export { onComposeHttpTrafficRecordHandler };
