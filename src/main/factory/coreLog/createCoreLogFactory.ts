import { CreateCoreLogUseCase } from "../../../app/usecases/coreLog/createCoreLogUseCase";
import { CreateCoreLogController } from "../../../infra/controllers/coreLog/createCoreLogController";
import { PrismaCoreLogRepository } from "../../../infra/data/repositories/coreLog";
import { PrismaCorePathnameRepository } from "../../../infra/data/repositories/corePathname";
import { PrismaRequestRepository } from "../../../infra/data/repositories/request";
import { PrismaResponseRepository } from "../../../infra/data/repositories/response";
import { PrismaTrafficSourceRepository } from "../../../infra/data/repositories/trafficSource";

const prismaCoreLogRepository = new PrismaCoreLogRepository();
const prismaTrafficSourceRepository = new PrismaTrafficSourceRepository();
const prismaCorePathnameSourceRepository = new PrismaCorePathnameRepository();
const prismaRequestRepository = new PrismaRequestRepository();
const prismaResponseRepository = new PrismaResponseRepository();

const createCoreLogUseCase = new CreateCoreLogUseCase(
  prismaCoreLogRepository,
  prismaTrafficSourceRepository,
  prismaCorePathnameSourceRepository,
  prismaRequestRepository,
  prismaResponseRepository
);

const createCoreLogController = new CreateCoreLogController(
  createCoreLogUseCase
);

const createCoreLog = {
  handle: createCoreLogController.handle.bind(createCoreLogController),
};

export { createCoreLog };
