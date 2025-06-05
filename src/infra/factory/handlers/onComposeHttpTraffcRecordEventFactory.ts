import { OnComposeHttpTrafficRecordEvent } from "../../../app/handlers/onComposeHttpTrafficRecordEvent";
import { PrismaDomainRepository } from "../../../app/repositories/domain";
import { PrismaHttpTrafficRepository } from "../../../app/repositories/httpTraffic";
import { PrismaPathnameRepository } from "../../../app/repositories/pathname";
import { PrismaRequestRepository } from "../../../app/repositories/request";
import { PrismaResponseRepository } from "../../../app/repositories/response";
import { PrismaTrafficSourceRepository } from "../../../app/repositories/trafficSource";
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
  prismaPathnameRepository
);

const createRequestUseCase = new CreateRequestUseCase(
  prismaRequestRepository,
  prismaHttpTrafficRepository
);

const createResponseUseCase = new CreateResponseUseCase(
  prismaResponseRepository,
  prismaHttpTrafficRepository
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
