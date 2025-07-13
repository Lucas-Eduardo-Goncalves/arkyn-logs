import { ListCoreLogsUseCase } from "../../../app/useCases/coreLog/listCoreLogsUseCase";
import { ListCoreLogsController } from "../../../infra/controllers/coreLog/listCoreLogsController";
import { PrismaCoreLogRepository } from "../../../infra/data/repositories/coreLog";
import { PrismaTrafficSourceRepository } from "../../../infra/data/repositories/trafficSource";

const prismaCoreLogRepository = new PrismaCoreLogRepository();
const prismaTrafficSourceRepository = new PrismaTrafficSourceRepository();

const listCoreLogsUseCase = new ListCoreLogsUseCase(
  prismaCoreLogRepository,
  prismaTrafficSourceRepository
);

const listCoreLogsController = new ListCoreLogsController(listCoreLogsUseCase);

const listCoreLogs = {
  handle: listCoreLogsController.handle.bind(listCoreLogsController),
};

export { listCoreLogs };
