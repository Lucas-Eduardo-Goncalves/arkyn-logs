import { OnComposeHttpTrafficRecordEvent } from "../../../app/handlers/onComposeHttpTrafficRecordEvent";
import { CreateDomainUseCase } from "../../../app/useCases/domain/createDomainUseCase";
import { CreateHttpTrafficUseCase } from "../../../app/useCases/httpTraffic/createHttpTrafficUseCase";
import { CreatePathnameUseCase } from "../../../app/useCases/pathname/createPathnameUseCase";
import { CreateRequestUseCase } from "../../../app/useCases/request/createRequestUseCase";
import { CreateResponseUseCase } from "../../../app/useCases/response/createResponseUseCase";
import { PrismaDomainRepository } from "../../../infra/data/repositories/domain";
import { PrismaHttpTrafficRepository } from "../../../infra/data/repositories/httpTraffic";
import { PrismaPathnameRepository } from "../../../infra/data/repositories/pathname";
import { PrismaRequestRepository } from "../../../infra/data/repositories/request";
import { PrismaResponseRepository } from "../../../infra/data/repositories/response";
import { PrismaTrafficSourceRepository } from "../../../infra/data/repositories/trafficSource";

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
