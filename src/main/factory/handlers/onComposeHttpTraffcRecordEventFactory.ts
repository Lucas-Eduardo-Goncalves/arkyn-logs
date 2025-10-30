import { OnComposeHttpTrafficRecordEvent } from "../../../app/handlers/onComposeHttpTrafficRecordEvent";
import { HttpTrafficNotifier } from "../../../app/services/httpTrafficNotifier";
import { CreateDomainUseCase } from "../../../app/useCases/domain/createDomainUseCase";
import { CreateHttpTrafficUseCase } from "../../../app/useCases/httpTraffic/createHttpTrafficUseCase";
import { CreatePathnameUseCase } from "../../../app/useCases/pathname/createPathnameUseCase";
import { CreateRequestUseCase } from "../../../app/useCases/request/createRequestUseCase";
import { CreateResponseUseCase } from "../../../app/useCases/response/createResponseUseCase";
import { PrismaDomainRepository } from "../../../infra/repositories/domain";
import { PrismaHttpTrafficRepository } from "../../../infra/repositories/httpTraffic";
import { PrismaPathnameRepository } from "../../../infra/repositories/pathname";
import { PrismaRequestRepository } from "../../../infra/repositories/request";
import { PrismaResponseRepository } from "../../../infra/repositories/response";
import { PrismaTrafficSourceRepository } from "../../../infra/repositories/trafficSource";
import { PrismaWebhookRepository } from "../../../infra/repositories/webhook";
import { FileStorageService } from "../../../infra/service/fileStorageService";

const prismaDomainRepository = new PrismaDomainRepository();
const prismaTrafficSourceRepository = new PrismaTrafficSourceRepository();
const prismaPathnameRepository = new PrismaPathnameRepository();
const prismaHttpTrafficRepository = new PrismaHttpTrafficRepository();
const prismaRequestRepository = new PrismaRequestRepository();
const prismaResponseRepository = new PrismaResponseRepository();
const prismaWebhookRepository = new PrismaWebhookRepository();
const fileStorage = new FileStorageService();
const httpTrafficNotifier = new HttpTrafficNotifier(prismaWebhookRepository);

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
  prismaResponseRepository,
  httpTrafficNotifier
);

const createRequestUseCase = new CreateRequestUseCase(
  prismaRequestRepository,
  fileStorage
);

const createResponseUseCase = new CreateResponseUseCase(
  prismaResponseRepository,
  fileStorage
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
